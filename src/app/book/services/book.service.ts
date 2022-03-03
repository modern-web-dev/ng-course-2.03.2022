import {Book, BookProperties} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private idSeq = 0;
  private readonly booksSubject$ = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'John Example',
      title: 'Angular for nerds'
    },
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: this.idSeq++,
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

  save(newBookProps: BookProperties): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const newBook = {...newBookProps, id: this.idSeq++};
      const currentBooks = this.booksSubject$.getValue();
      this.booksSubject$.next([...currentBooks, newBook]);
      subscriber.next(newBook);
      subscriber.complete();
    })
  }

  find(id: number): Observable<Book> {
    return new Observable(subscriber => {
      const currentBooks = this.booksSubject$.getValue();
      const foundBook = currentBooks.find(currentBook => currentBook.id === id);
      if(foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Book with ID ${id} could not be found!`);
      }
    });
  }
}
