import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  create(@Body() body: CreateBookDto) {
    return this.bookService.createBook(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findBookById(+id)
  }


}
