import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { PersonalStatusList } from '../enum/personal.enum';
import { PersonalStatus } from 'generated/prisma/enums';

export class ChangeStatusPersonalDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsEnum(PersonalStatusList, {
    message: 'Estados permitidos: ' + PersonalStatusList.join(', '),
  })
  status: PersonalStatus;
}
