import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input()
  book: Book | undefined

  @Output()
  bookChange: EventEmitter<Book> = new EventEmitter<Book>();

  save(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorInput = formElement.querySelector<HTMLInputElement>('#author');
    const titleInput = formElement.querySelector<HTMLInputElement>('#title');

    const savedBook: Book = {
      id: this.book!.id,
      author: authorInput?.value ?? '',
      title: titleInput?.value ?? ''
    }
    this.bookChange.emit(savedBook);
  }
}
