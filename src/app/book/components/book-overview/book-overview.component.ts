import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  OperatorFunction,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnDestroy, AfterViewInit {
  @ViewChild('typeahead')
  typeahead: ElementRef<HTMLInputElement> | undefined;
  books$: Observable<Book[]>
  selectedBook: Book | null = null;
  private readonly unsubscribe = new Subject<void>();

  private handle: number | null = null;

  constructor(private readonly books: BookService) {
    this.books$ = this.books.values$;
  }

  ngAfterViewInit(): void {
    if (!this.typeahead) {
      throw new Error('Could not find typeahead!');
    }
    // this.typeahead?.nativeElement.addEventListener('input', event => {
    //   if (this.handle != null) {
    //     clearTimeout(this.handle);
    //   }
    //   const input = event.target as HTMLInputElement
    //   this.handle = setTimeout(() => {
    //     console.log(input.value);
    //     this.handle = null;
    //   }, 500);
    // });


    fromEvent(this.typeahead?.nativeElement, 'input')
      .pipe(
        mapFromInputEventToItsTargetValue(),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(text => this.books.search(text)),
        takeUntil(this.unsubscribe)
      )
      .subscribe(results => {
        console.log(results);
      })
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

function mapFromInputEventToItsTargetValue(): OperatorFunction<Event, string> {
  return map(event => {
    const input = event.target as HTMLInputElement
    return input.value;
  })
}

