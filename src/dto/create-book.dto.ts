import { Language } from "src/books/entities/books.entity";

export class CreateBookDto {
  title: string;
  author: string;
  publicationDate: string;
  numberOfPages: number;
  language: Language;
}