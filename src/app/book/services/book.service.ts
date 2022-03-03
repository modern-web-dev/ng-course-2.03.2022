import {Book} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export class BookService {
  private readonly booksSubject$ = new BehaviorSubject<Book[]>([
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
  ]);
  readonly values$ = this.booksSubject$.asObservable();

  findAll(): Observable<Book[]> {
    return this.values$;
  }

  update(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy = {...bookToUpdate};
      const currentBooks = this.booksSubject$.getValue();
      const newBooks = currentBooks.map(
        currentBook => currentBook.id === bookCopy.id ? bookCopy : currentBook);
      this.booksSubject$.next(newBooks);
      subscriber.next(bookCopy);
      subscriber.complete();
    });
  }

  search(query: string): Observable<string[]> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next([`${query} 1`, `${query} 2`, `${query} 3`]);
        subscriber.complete();
      }, 3000);
    })
  }
}
