import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { CreateBookDto } from 'src/dto/create-book.dto';
import generateId from 'src/helper/generateId';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { GetBookFilterDto } from 'src/dto/get-book-filter.dto';

@Injectable()
export class BooksService {
  private books: Book[] = []

  findBooks(filterDto: GetBookFilterDto){
    return this.books
  }

  createBook(data: CreateBookDto) {
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

  updateBook(bookId: number, updatedBook: UpdateBookDto){
    const book = this.findBookById(bookId)
    Object.assign(book, updatedBook);
    return book;
  }

  deleteBook(bookId: number) {
    const index = this.books.findIndex(book => book.id === bookId);
    console.log(index)
    if (index !== -1) {
      this.books.splice(index, 1);
      return { message: `Book with id ${bookId} deleted successfully` };
    }
    throw new NotFoundException(`Book with id ${bookId} not found`);
  }
}
