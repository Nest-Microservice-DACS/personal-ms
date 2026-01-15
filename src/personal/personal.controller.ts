import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { ChangeStatusPersonalDto, PersonalPaginationDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PersonalStatus } from 'generated/prisma/enums';

@Controller()
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @MessagePattern({cmd: 'create_personal'})
  create(@Payload() createPersonalDto: CreatePersonalDto) {
    return this.personalService.create(createPersonalDto);
  }

  @MessagePattern({cmd: 'get_personal'})
  findAll(@Payload() personalPaginationDto: PersonalPaginationDto) {
    return this.personalService.findAll(personalPaginationDto);
  }

  @MessagePattern({cmd: 'get_personal_by_id'})
  findOne(@Payload() id: number) {
    return this.personalService.findOne(id);
  }

  @MessagePattern({cmd: 'get_personal_by_ids'})
  findByIds(@Payload() ids: number[]) {
    return this.personalService.findByIds(ids);
  }

  @MessagePattern({cmd: 'update_personal'})
  update(@Payload() updatePersonalDto: UpdatePersonalDto) {
    return this.personalService.update(updatePersonalDto.id, updatePersonalDto);
  }

  @MessagePattern({cmd: 'change_status_personal'})
  changeStatus(@Payload() changeStatusPersonalDto: ChangeStatusPersonalDto) {
    return this.personalService.changeStatus(changeStatusPersonalDto);
  }
}
