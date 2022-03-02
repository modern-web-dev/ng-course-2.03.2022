import {Book} from '../model';
import {Injectable} from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class BookService {
  private books: Book[] = [
    {
      id: 0,
      author: 'John Example',
      title: 'Angular for nerds'
    },
    {
      id: 1,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: 2,
      author: 'Tom Hombergs',
      title: 'Hexagonal Architecture'
    }
  ];

  findAll(): Promise<Book[]> {
    return new Promise<Book[]>(resolve => {
      setTimeout(() => resolve(this.books), 3000);
    })
  }

  save(book: Book): void {
    this.books.push(book);

  }
}
