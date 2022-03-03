import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../../model';
import {catchError, Observable, throwError} from 'rxjs';
import {BookService} from '../../services/book.service';
import {Injectable} from '@angular/core';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(private readonly books: BookService,
              private readonly router: Router ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const idAsString = route.paramMap.get('id');
    if (idAsString) {
      const id = +idAsString;
      if (!isNaN(id)) {
        return this.books.find(id)
          .pipe(
            catchError(error => {
              this.goToNewBookDialogEventually();
              return throwError(() => error);
            })
          );
      }
    }
    this.goToNewBookDialogEventually();
    return throwError(() => `Could not parse ID: ${idAsString}`);
  }

  private goToNewBookDialogEventually(): void {
    setTimeout(() => this.router.navigateByUrl('/books/new'));
  }
}
