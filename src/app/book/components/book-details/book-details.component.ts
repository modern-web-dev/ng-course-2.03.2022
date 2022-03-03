import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  book: Book | undefined

  constructor(private readonly books: BookService,
              private readonly router: Router,
              activatedRoute: ActivatedRoute) {
    this.book = activatedRoute.snapshot.data['book'];
  }

  save(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorInput = formElement.querySelector<HTMLInputElement>('#author');
    const titleInput = formElement.querySelector<HTMLInputElement>('#title');

    if (this.book) {
      const savedBook: Book = {
        id: this.book.id,
        author: authorInput?.value ?? '',
        title: titleInput?.value ?? ''
      }
      this.books.update(savedBook)
        .subscribe(() => this.goToBookOverview())
    } else {
      this.books.save(
        {
          author: authorInput?.value ?? '',
          title: titleInput?.value ?? ''
        }).subscribe(() => this.goToBookOverview())
    }
  }

  private goToBookOverview(): Promise<boolean> {
    return this.router.navigateByUrl('/books');
  }
}
