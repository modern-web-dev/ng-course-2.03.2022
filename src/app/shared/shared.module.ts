import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './app-frame/header/header.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    CommonModule, RouterModule, HeaderComponent
  ]
})
export class SharedModule {
}
