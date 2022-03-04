import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {minLength} from "./validators/min-length.validator";


@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {

  bookForm;

  book: Book | undefined

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              activatedRoute: ActivatedRoute) {
    this.book = activatedRoute.snapshot.data['book'];
    this.bookForm = this.prepareForm(this.book || {id: undefined, author: '', title: ''});

  }

  get authorControl(): FormControl {
    return this.bookForm.get('author') as FormControl;
  }

  get titleControl(): FormControl {
    return this.bookForm.get('title') as FormControl;
  }

  prepareForm(book: Book) {
    const form = this.fb.group({
      id: [{value: book.id, disabled: true}],
      author: [book.author, [Validators.required, minLength(5)]],
      title: [book?.title, [Validators.required, minLength(5)]],
    });

    return form;
  }

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

  private goToBookOverview(): Promise<boolean> {
    return this.router.navigateByUrl('/books');
  }
}
