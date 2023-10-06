import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldValidateService {

  constructor() {
  }

  hasError(form: FormGroup, error: string, ...params: any[]): boolean {
    return (form.get(params)?.hasError(error))? true: false;
  }
  focus(form: FormGroup, ...params: any[]): boolean {
    return ((form.get(params)?.invalid && form.get(params)?.dirty) ||
      (form.get(params)?.invalid && form.get(params)?.touched))? true: false;
  }
  validRequired(form: FormGroup , ...params: any[]): boolean {
    return Boolean(form.get(params)?.hasError('required'));
  }
  
}
