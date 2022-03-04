import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from './app-frame/header/header.component';
import { ValidationFeedbackComponent } from './validation-feedback/validation-feedback.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ValidationFeedbackComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    CommonModule, RouterModule, HeaderComponent, ValidationFeedbackComponent
  ]
})
export class SharedModule {
}
