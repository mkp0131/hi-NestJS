import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  // each 옵션 리스트내 모든 아이템을 검사
  @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];
}
