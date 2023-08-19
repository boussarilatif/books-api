export enum Language {
  ENGLISH = 'English',
  FRENCH = 'French',
}

export class Book {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  numberOfPages: number;
  language: Language;
}