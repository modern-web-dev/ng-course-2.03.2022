import {Component} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly books: BookService,
    private readonly router: Router) {
    this.books$ = this.books.values$;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  goToDetails(book: Book): void {
    this.router.navigate(['/books', book.id]);
  }
}
