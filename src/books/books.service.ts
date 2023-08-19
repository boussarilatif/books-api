import { Injectable } from '@nestjs/common';
import { Book, Language } from './entities/books.entity';
import { CreateBookDto } from 'src/dto/create-book.dto';
import generateId from 'src/helper/generateId';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      title: 'Mes aventures du codes',
      publicationDate: '2022-02-28',
      numberOfPages: 10,
      author: 'John Doe',
      language: Language.FRENCH
    },
    {
      id: 2,
      title: 'Shadows of Tomorrow',
      author: 'John Smith',
      publicationDate: '2021-01-10',
      numberOfPages: 400,
      language: Language.ENGLISH,
    },
  ]

  findBooks() {
    return this.books
  }

  createBook(data: CreateBookDto): Book {
    console.log(data, 'data')
    const book = {
      id: generateId(),
      ...data,
    };

    this.books.push(book);
    return book;
  }
}
