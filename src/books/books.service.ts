import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, Language } from './entities/books.entity';
import { CreateBookDto } from 'src/dto/create-book.dto';
import generateId from 'src/helper/generateId';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { GetBookFilterDto } from 'src/dto/get-book-filter.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      "id": 1,
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt, David Thomas",
      "publicationDate": "1999-10-20",
      "numberOfPages": 352,
      "language": Language.ENGLISH
    },
    {
      "id": 2,
      "title": "Harry Potter and the Philosopher's Stone",
      "author": "J.K. Rowling",
      "publicationDate": "1997-06-26",
      "numberOfPages": 223,
      "language": Language.ENGLISH
    },
    {
      "id": 3,
      "title": "Nineteen Eighty-Four",
      "author": "George Orwell",
      "publicationDate": "1949-06-08",
      "numberOfPages": 328,
      "language": Language.ENGLISH
    }
  ]

  findBooks(filterDto: GetBookFilterDto) {
    const { search, author, publication_date, language } = filterDto;

    let filteredBooks = this.books;

    if (search) {
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (author) {
      filteredBooks = filteredBooks.filter((book) =>
        book.author.toLowerCase() === author.toLowerCase()
      );
    }

    if (publication_date) {
      filteredBooks = filteredBooks.filter(
        (book) => book.publicationDate === publication_date
      );
    }

    if (language) {
      filteredBooks = filteredBooks.filter(
        (book) => book.language === language
      );
    }

    return filteredBooks;
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

  updateBook(bookId: number, updatedBook: UpdateBookDto) {
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
