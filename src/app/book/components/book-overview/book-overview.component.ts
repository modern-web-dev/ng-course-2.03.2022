import {Component, Injector, OnInit} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  books: Book[] = [];
  private readonly bookService: BookService;

  constructor(injector: Injector) {
    this.bookService = injector.get(BookService);
  }

  ngOnInit(): void {
    this.bookService.findAll().then(
      foundBooks => this.books = foundBooks
    );
  }

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
