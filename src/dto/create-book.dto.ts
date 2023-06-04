import { IsString } from 'class-validator';
import { Language } from "src/books/entities/books.entity";

export class CreateBookDto {
  @IsString()
  title: string;
  
  author: string;
  publicationDate: string;
  numberOfPages: number;
  language: Language;
}