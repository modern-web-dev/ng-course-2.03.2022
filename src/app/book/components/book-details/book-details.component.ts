import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {BookDetailsFormService} from "./book-details-form.service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookDetailsFormService]
})
export class BookDetailsComponent {
  bookForm;

  book: Book | undefined

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly bookDetailsFormService: BookDetailsFormService,
              activatedRoute: ActivatedRoute) {
    this.book = activatedRoute.snapshot.data['book'];
    this.bookForm = this.bookDetailsFormService.prepareForm(this.book || {} as any);

  }


  get authorControl(): FormControl {
    return this.bookForm.get('author.firstname') as FormControl;
  }
  //
  // get titleControl(): FormControl {
  //   return this.bookForm.get('title') as FormControl;
  // }


  save() {
    this.bookForm.value
    if (this.book) {
      const savedBook: Book = {
        id: this.book.id,
        ...this.bookForm.value
      }
      this.books.update(savedBook)
        .subscribe(() => this.goToBookOverview())
    } else {
      this.books.save(this.bookForm.value)
        .subscribe(() => this.goToBookOverview())
    }
  }

  get datapersisted(): boolean{
   return this.bookForm.pristine;
  }
  private goToBookOverview(): Promise<boolean> {
    return this.router.navigateByUrl('/books');
  }
}
