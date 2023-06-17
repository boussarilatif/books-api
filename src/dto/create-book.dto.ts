import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Language } from "src/books/entities/books.entity";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDateString()
  publicationDate: string;

  @IsNumber()
  numberOfPages: number;

  @IsEnum(Language)
  language: Language;
}