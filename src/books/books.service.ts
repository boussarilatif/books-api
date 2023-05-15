import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  
  findBooks(){
    return 'fetch books'
  }
}
