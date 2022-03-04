import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {RouterModule} from '@angular/router';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {BookDetailsComponent} from './book/components/book-details/book-details.component';
import {SharedModule} from './shared/shared.module';
import {BookResolver} from './book/components/book-details/book.resolver';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JWTInterceptorInterceptor} from "./jwtinterceptor.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      {
        path: 'books',
        component: BookOverviewComponent
      },
      {
        path: 'books/new',
        component: BookDetailsComponent
      },
      {
        path: 'books/:id',
        component: BookDetailsComponent,
        resolve: {
          book: BookResolver
        }
      }
    ]),
    BookModule.forRoot(),
    SharedModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
