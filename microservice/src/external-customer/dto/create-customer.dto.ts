import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty()
    @IsString() name!: string;
    @ApiProperty()
    @IsString() lastName!: string;
    @ApiProperty()
    @IsString() middleName!: string;
    @ApiProperty()
    @IsEmail() email!: string;
    @ApiProperty()
    @IsDateString() birthDate!: string; // 'YYYY-MM-DD'
    @ApiProperty()
    @IsBoolean() isActive!: boolean;
    @ApiProperty()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/)
    password!: string;
}