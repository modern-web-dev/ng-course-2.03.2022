import {Component} from '@angular/core';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[] = [
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

  selectedBook: Book | null = null;

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBookOf(bookToUpdate: Book): void {
    this.books = this.books.map(currentBook => currentBook.id === bookToUpdate.id ? bookToUpdate : currentBook);
    this.selectedBook = bookToUpdate;
  }
}
