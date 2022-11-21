import { Directive, ElementRef } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[dFormValidation]'
})
export class FormValidationDirective {

  constructor(private control: NgControl, private el: ElementRef) {
    setTimeout(() => {
      control.valueChanges?.subscribe(() => {
        this.validate();
      });
    })
  }
  validate() {
    const myControl = this.control.control;
    const el = this.el.nativeElement;
    let parentNode: any = null;
    if (el.tagName === 'INPUT') {
      parentNode = el.parentElement.parentElement
    }
    if (el.tagName === 'P-CALENDAR') {
      parentNode = el.parentElement.parentElement;
    }
    if (parentNode) {
      parentNode.querySelector('#form-error')?.remove();
      if (myControl?.invalid) {
        el.classList.add('ng-invalid')
        const divError = document.createElement('div');
        divError.setAttribute("id", "form-error");
        divError.classList.add('p-error', 'text-xs', 'mt-1')
        const textnode = document.createTextNode(this.getmessage(myControl.errors));
        divError.appendChild(textnode);
        parentNode.appendChild(divError);
      }
    }
  }

  getmessage(errors: ValidationErrors | null) {
    if ((errors as ValidationErrors)['required']) {
      return 'Ce champ est obligatoire.';
    }
    if ((errors as ValidationErrors)['email']) {
      return 'Ce champ doit être un email.';
    }
    if ((errors as ValidationErrors)['minlength']) {
      return 'Ce champ doit avoir au moins ' + (errors as ValidationErrors)['minlength'].requiredLength + ' caractères.';
    }
    if ((errors as ValidationErrors)['maxlength']) {
      return 'Ce champ doit avoir au plus ' + (errors as ValidationErrors)['maxlength'].requiredLength + ' caractères.';
    }
    if ((errors as ValidationErrors)['pattern']) {
      if ((errors as ValidationErrors)['pattern'].requiredPattern === '^-?(0|[1-9]\\d*)?$') {
        return 'Ce champ doit être un nombre entier.';
      }
      return 'Ce champ est invalide.';
    }
    if ((errors as ValidationErrors)['min']) {
      return 'Ce champ doit être supérieur ou égal à ' + (errors as ValidationErrors)['min'].min + '.';
    }
    if ((errors as ValidationErrors)['max']) {
      return 'Ce champ doit être inférieur ou égal à ' + (errors as ValidationErrors)['max'].max + '.';
    }
    if ((errors as ValidationErrors)['minDate']) {
      return 'Ce champ doit être supérieur ou égal à ' + (errors as ValidationErrors)['minDate'].minDate + '.';
    }
    if ((errors as ValidationErrors)['maxDate']) {
      return 'Ce champ doit être inférieur ou égal à ' + (errors as ValidationErrors)['maxDate'].maxDate + '.';
    }
    return 'Ce champ est invalide.';
  }
}
