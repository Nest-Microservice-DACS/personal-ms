import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { ChangeStatusPersonalDto, PersonalPaginationDto } from './dto';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { last } from 'rxjs';

@Injectable()
export class PersonalService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private pool: Pool;
  private adapter: PrismaPg;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;
    this.adapter = adapter;
  }

  private readonly logger = new Logger(PersonalService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma conectado a la base de datos');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma desconectado de la base de datos');
  }

  async create(createPersonalDto: CreatePersonalDto) {
    const existing = await this.personal.findFirst({
      where: { email: createPersonalDto.email },
    });
    if (existing) {
      throw new RpcException({
        message: 'Personal with this email already exists',
        status: HttpStatus.CONFLICT,
      });
    }
    return this.personal.create({
      data: createPersonalDto,
    });
  }

  async findAll(personalPaginationDto: PersonalPaginationDto) {
    const totalPages = await this.personal.count({
      where: { status: personalPaginationDto.status },
    });
    const { page, size } = personalPaginationDto;
    const skip = (page - 1) * size;
    const take = size;
    return {
      data: await this.personal.findMany({
        skip,
        take, where: { status: personalPaginationDto.status },
      }),
      meta: { total: totalPages, page, lastPage: Math.ceil(totalPages / size) },
    };
  }

  async findOne(id: number) {
    try {
      const personal = await this.personal.findUnique({
        where: { id },
      });
      if (!personal) {
        throw new RpcException({
          message: 'Personal not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      return personal;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        message: 'Error fetching personal',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(id: number, updatePersonalDto: UpdatePersonalDto) {
    try {
      const updated = await this.personal.update({
        where: { id },
        data: updatePersonalDto,
      });
      return updated;
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new RpcException({
          message: 'Personal not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      throw new RpcException({
        message: 'Error updating personal',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async changeStatus(changeStatusPersonalDto: ChangeStatusPersonalDto) {
    const { id, status } = changeStatusPersonalDto;
    try {
      const updated = await this.personal.update({
        where: { id },
        data: { status },
      });
      return updated;
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new RpcException({
          message: 'Personal not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      throw new RpcException({
        message: 'Error updating status',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
