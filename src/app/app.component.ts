import { Component } from '@angular/core';
import {BookService} from './book/services/book.service';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly bookService: BookService) {
  }
}
