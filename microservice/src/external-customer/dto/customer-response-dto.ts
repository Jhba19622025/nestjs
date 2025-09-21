import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty({ example: 'a3f6b4fe-1234-4a1b-9f00-abc123def456', format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'Alice' }) name!: string;
  @ApiProperty({ example: 'Doe' }) lastName!: string;
  @ApiProperty({ example: 'Marie' }) middleName!: string;
  @ApiProperty({ example: 'alice@example.com' }) email!: string;
  @ApiProperty({ example: '2010-10-10', format: 'date' }) birthDate!: string;
  @ApiProperty({ example: true }) isActive!: boolean;

  @ApiPropertyOptional({ example: '2025-09-20T10:00:00.000Z' }) createdAt?: string;
  @ApiPropertyOptional({ example: '2025-09-20T11:00:00.000Z' }) updatedAt?: string;
}