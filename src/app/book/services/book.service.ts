import {map, Observable} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {Book, BookProperties} from '../model';

@Injectable()
export class BookService {
  API_URL = '/api/books';

  constructor(private readonly http: HttpClient) {

  }

  findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL);
  }

  update(bookToUpdate: Book): Observable<Book> {
    return this.http.put<Book>(`${this.API_URL}/${bookToUpdate.id}`, bookToUpdate);
  }

  save(newBookProps: BookProperties): Observable<Book> {
    return this.http.post<Book>(this.API_URL, newBookProps);
  }

  find(id: number): Observable<Book> {
    const searchcriteria = {id};
    const params = new HttpParams({fromObject: searchcriteria});

    return this.http.get<Book[]>(`${this.API_URL}`, {params})
      .pipe(map(list => list[0]));
  }

  search(text: string): Observable<Book[]> {
    const searchcriteria = {q:text};
    const params = new HttpParams({fromObject: searchcriteria});

    return this.http.get<Book[]>(`${this.API_URL}`, {params});
  }
}
