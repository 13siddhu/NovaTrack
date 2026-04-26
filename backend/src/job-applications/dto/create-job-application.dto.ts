import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobApplicationDto {
  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsString()
  jobRole: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  salary?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  jobLink?: string;

  @ApiProperty({ required: false, default: 'Applied' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  appliedDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  nextFollowUp?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
