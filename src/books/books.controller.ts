import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';

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

  @Patch(':id')
  updateBook(@Param('id') id: number, @Body() body: UpdateBookDto) {
   const book = this.bookService.updateBook(id, body);
   return book;
  }

}

