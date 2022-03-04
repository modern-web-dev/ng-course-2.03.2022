import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookService} from './services/book.service';
import {SharedModule} from '../shared/shared.module';
import {BookResolver} from './components/book-details/book.resolver';
import {RouterModule} from "@angular/router";
import {NotPersistedDataGuardGuard} from "../shared/not-persisted-data-guard.guard";


@NgModule({
  declarations: [
    BookDetailsComponent,
    BookOverviewComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookOverviewComponent
      },
      {
        path: 'new',
        component: BookDetailsComponent,
        canDeactivate: [NotPersistedDataGuardGuard]
      },
      {
        path: ':id',
        component: BookDetailsComponent,
        canDeactivate: [NotPersistedDataGuardGuard],
        resolve: {
          book: BookResolver
        }
      }
    ]),
  ],
  providers: [BookService, BookResolver]
})
export class BookModule {

}
