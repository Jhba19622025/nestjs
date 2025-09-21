import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {


    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsString()
    @ApiProperty()
    middleName: string;

    @IsEmail()
    @ApiProperty({ example: "xxxxxxxxxx@xxxxxx.xxx" })
    email: string;

    @ApiProperty({ example: '2010-10-10', format: 'date' })
    @IsDateString()          // valida ISO 8601
    birthDate!: string;

    @ApiProperty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @ApiProperty({ minLength: 8, example: 'S3cureP@ss!' })
    password: string;


}
