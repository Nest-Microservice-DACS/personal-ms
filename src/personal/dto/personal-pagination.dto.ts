import { IsEnum, IsOptional } from "class-validator";
import { PersonalStatusList } from "../enum/personal.enum";
import { PersonalStatus } from "generated/prisma/client";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export class PersonalPaginationDto extends PaginationDto {
        @IsOptional()
        @IsEnum(PersonalStatusList, {
            message: `Possible status values are ${PersonalStatusList.join(", ")}`,
        })
        status: PersonalStatus;
}