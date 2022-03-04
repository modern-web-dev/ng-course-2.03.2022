import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from './app-frame/header/header.component';

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
