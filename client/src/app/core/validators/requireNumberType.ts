import { FormControl } from "@angular/forms";

export function requiredNumberType() {
    return function (control: FormControl) {
        const number = control.value;
        console.log('requireNumber', number)
        if (number) {
            if (isNaN(number)) {
                return {
                    requiredNumberType: true
                };
            }

            return null;
        }

        return null;
    };
}