import { Language } from "src/books/entities/books.entity";

export class GetBookFilterDto {
  search?: string;
  author?: string;
  publicationDate?: string; // Expected format: YYYY-MM-DD
  language?: Language;
}