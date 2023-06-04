import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { GetBookFilterDto } from 'src/dto/get-book-filter.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) { }

  @Get()
  findAll(@Query() filterDto: GetBookFilterDto) {
    return this.bookService.findBooks(filterDto)
  }

  @Post()
  create(@Body(new ValidationPipe()) body: CreateBookDto) {
    return this.bookService.createBook(body);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    console.log(typeof id)
    return this.bookService.findBookById(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateBookDto) {
    const book = this.bookService.updateBook(+id, body);
    return book;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.deleteBook(+id)
  }

}

