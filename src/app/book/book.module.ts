import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookService} from './services/book.service';
import {SharedModule} from '../shared/shared.module';
import {BookResolver} from './components/book-details/book.resolver';

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookOverviewComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
  ],
  exports: [
    BookOverviewComponent
  ],
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService, BookResolver]
    }
  }
}
