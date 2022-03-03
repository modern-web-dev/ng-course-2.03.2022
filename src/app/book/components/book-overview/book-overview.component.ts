import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {Observable, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnDestroy {
  books$: Observable<Book[]>
  selectedBook: Book | null = null;
  private readonly unsubscribe = new Subject<void>();

  constructor(private readonly books: BookService) {
    this.books$ = this.books.values$;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBookOf(bookToUpdate: Book): void {
    this.books.update(bookToUpdate)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(
        updatedBook => this.selectedBook = updatedBook);
  }
}
