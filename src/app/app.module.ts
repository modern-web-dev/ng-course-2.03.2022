import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JWTInterceptorInterceptor} from "./jwtinterceptor.interceptor";
import { HomePageComponent } from './home-page/home-page.component';
import {BookOverviewComponent} from "./book/components/book-overview/book-overview.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'books',
        loadChildren: () => import('./book/book.module').then(mod => mod.BookModule),
      }
    ]),
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
