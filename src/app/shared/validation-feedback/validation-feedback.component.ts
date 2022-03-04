import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

export type ValidationErrorMapping = { [errorId: string]: string };

@Component({
  selector: 'ba-validation-feedback',
  templateUrl: './validation-feedback.component.html',
  styleUrls: ['./validation-feedback.component.scss']
})
export class ValidationFeedbackComponent implements OnInit {
  errorText: ValidationErrorMapping = {
    required: "Required!",
  };

  @Input('of')
  formControl?: FormControl;

  @HostBinding('class.invalid-feedback')
  invalidFeedbackClass = true;

  get formErrors() {
    if (this.formControl) {
      return Object.entries(this.formControl.errors as { [errorId: string]: any });
    } else {
      return [];
    }
  }

  ngOnInit(): void {
  }

  getErrorText(errorId: string) {
    return this.errorText[errorId];
  }

}
