import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Controller()
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @MessagePattern('createPersonal')
  create(@Payload() createPersonalDto: CreatePersonalDto) {
    return this.personalService.create(createPersonalDto);
  }

  @MessagePattern('findAllPersonal')
  findAll() {
    return this.personalService.findAll();
  }

  @MessagePattern('findOnePersonal')
  findOne(@Payload() id: number) {
    return this.personalService.findOne(id);
  }

  @MessagePattern('updatePersonal')
  update(@Payload() updatePersonalDto: UpdatePersonalDto) {
    return this.personalService.update(updatePersonalDto.id, updatePersonalDto);
  }

  @MessagePattern('removePersonal')
  remove(@Payload() id: number) {
    return this.personalService.remove(id);
  }
}
