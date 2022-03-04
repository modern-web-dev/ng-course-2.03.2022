import {Component, ElementRef, ViewChild} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {debounceTime, distinctUntilChanged, fromEvent, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>
  typeahead = new FormControl('',Validators.required);
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly books: BookService,
    private readonly router: Router) {
    this.books$ = this.books.findAll();
  }

  ngOnInit(): void {
    this.typeahead.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(text => this.books.search(text)),
        takeUntil(this.unsubscribe)
      )
      .subscribe(results => {
        console.log(results);
      })

    this.typeahead.valueChanges.subscribe(results => {
      console.log(results);
    });
    this.typeahead.statusChanges.subscribe(results => {
      console.log(results);
    });

    this.typeahead.setValue("first test")
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  goToDetails(book: Book): void {
    this.router.navigate(['/books', book.id]);
  }
}
