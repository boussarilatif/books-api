import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { CreateBookDto } from 'src/dto/create-book.dto';
import generateId from 'src/helper/generateId';

@Injectable()
export class BooksService {
  private books: Book[] = []

  findBooks(){
    return this.books
  }

  createBook(data: CreateBookDto): Book {
    const book = {
      id: generateId(),
      ...data,
    };

    this.books.push(book);
    return book;
  }

  findBookById(bookId: number) {
    const book = this.books.find((book) => book.id === bookId);
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
    return book;
  }
}
