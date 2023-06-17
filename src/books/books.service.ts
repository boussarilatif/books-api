import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { GetBookFilterDto } from 'src/dto/get-book-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ) {}

  async findBooks(filterDto: GetBookFilterDto): Promise<Book[]> {
    const { search, author, publication_date, language } = filterDto;

    const query = this.bookRepository.createQueryBuilder('book')

    if (search) {
      query.andWhere('(book.title ILIKE :search OR book.author ILIKE :search)', { search: `%${search}%` });
    }

    if (author) {
      query.andWhere('book.author ILIKE :author', { author });
    }

    if (publication_date) {
      query.andWhere('book.publicationDate = :publication_date', { publication_date });
    }

    if (language) {
      query.andWhere('book.language = :language', { language });
    }

    return query.getMany();
  }

  async createBook(createBookDto: CreateBookDto) {
    const book = await this.bookRepository.create(createBookDto)
    return this.bookRepository.save(book)
  }

  async findBookById(bookId: number) {
    const book = await  this.bookRepository.findOneBy({ id: bookId })
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
    return book;
  }

  async updateBook(bookId: number, updatedBook: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id: bookId,
      ...updatedBook
    })
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
    return this.bookRepository.save(book);
  }

  async deleteBook(bookId: number) {
    const book = await  this.bookRepository.findOneBy({ id: bookId })
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
    return this.bookRepository.remove(book)
  }
}
