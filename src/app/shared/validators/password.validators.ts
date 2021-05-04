import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidators {
    static cannotBeDifferent(group: AbstractControl): ValidationErrors {
        const password = group.get('password').value;
        const confirmPassord = group.get('confirmPassword').value;
        if(password !== confirmPassord)
        return { notSame: true};
        return null
    }
}