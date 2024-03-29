import { IsOptional } from 'class-validator';

export class updateAthleteDto {
  readonly id: number;
  @IsOptional()
  readonly name: string;
  @IsOptional()
  readonly sirname: string;
  @IsOptional()
  readonly patronymic: string;
  @IsOptional()
  readonly dateOfBirth: Date;
  @IsOptional()
  readonly trainer: number;
  @IsOptional()
  readonly rank: number;
  @IsOptional()
  readonly userId: number;
}
