import { Language } from "src/books/entities/books.entity";

export class GetBookFilterDto {
  search?: string;
  author?: string;
  publication_date?: string; // Expected format: YYYY-MM-DD
  language?: Language;
}