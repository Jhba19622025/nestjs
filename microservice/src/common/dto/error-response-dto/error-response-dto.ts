import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400 }) statusCode!: number;
  @ApiProperty({ example: 'Bad Request' }) error!: string;
  @ApiProperty({ example: 'Invalid payload' }) message!: string | string[];
  @ApiProperty({ example: '2025-09-20T12:34:56.000Z' }) timestamp!: string;
  @ApiProperty({ example: '/proxy' }) path!: string;
}