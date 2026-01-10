import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Controller()
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @MessagePattern('create_personal')
  create(@Payload() createPersonalDto: CreatePersonalDto) {
    return this.personalService.create(createPersonalDto);
  }

  @MessagePattern('find_all_personal')
  findAll() {
    return this.personalService.findAll();
  }

  @MessagePattern('find_one_personal')
  findOne(@Payload() id: number) {
    return this.personalService.findOne(id);
  }

  @MessagePattern('update_personal')
  update(@Payload() updatePersonalDto: UpdatePersonalDto) {
    return this.personalService.update(updatePersonalDto.id, updatePersonalDto);
  }

  @MessagePattern('remove_personal')
  remove(@Payload() id: number) {
    return this.personalService.remove(id);
  }
}
