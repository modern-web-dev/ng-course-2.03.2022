import {Component} from '@angular/core';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book: Book = {
    author: 'John Example',
    title: 'Angular for nerds'
  }
}
