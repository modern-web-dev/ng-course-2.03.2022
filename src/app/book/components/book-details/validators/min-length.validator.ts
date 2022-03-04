import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const minLength5: ValidatorFn = (control: AbstractControl): ValidationErrors | null => control.value?.trim()?.length > 5 ? null : {minLength5: 'To short!'};

export const minLength = (minLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value?.trim()?.length > minLength ? null : {minLength: 'To short!'}
  };
};


export const maxLength5: ValidatorFn = (control: AbstractControl): ValidationErrors | null => control.value?.trim()?.length <= 5 ? null : {maxLength5: 'To long!'};
