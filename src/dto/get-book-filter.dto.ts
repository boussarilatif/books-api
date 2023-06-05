import { IsDateString, IsEnum, IsString } from "class-validator";
import { Language } from "src/books/entities/books.entity";

export class GetBookFilterDto {
  @IsString()
  search?: string;
  
  @IsString()
  author?: string;

  @IsDateString()
  publication_date?: string;

  @IsEnum(Language)
  language?: Language;
}