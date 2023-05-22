import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from 'src/dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  findAll(){
     return this.bookService.findBooks()
  }

  @Post()
  create(@Body() data: CreateBookDto) {
    return this.bookService.createBook(data);
  }
}
