import { ValidatorFn, AbstractControl } from "@angular/forms";
import { Validator, IsURLOptions } from "class-validator";

const validator = new Validator();

export class CustomValidators {
    static notContains(strings: string[]): ValidatorFn {

        return (control: AbstractControl): ({ [key: string]: any }) | null => {

            const filtered = strings.filter((elem) => (control.value || "").includes(elem));
            const isValid = filtered.length === 0;
            return isValid ? null : { 'notContains': 'value includes forbidden subtrings: ' + filtered.join(", ") };
        };
    }

    static isUrl(options?: IsURLOptions): ValidatorFn {

        return (control: AbstractControl): ({ [key: string]: any }) | null => {

            const isValid = validator.isURL(control.value || "", options);
            return isValid ? null : { 'isUrl': 'value is not a valid URL' };
        };
    }

    static isInt(): ValidatorFn {

        return (control: AbstractControl): ({ [key: string]: any }) | null => {

            const isValid = validator.isInt(+control.value);
            return isValid ? null : { 'isInt': 'value is not an integer' };
        };
    }

    static range(min: number, max: number): ValidatorFn {

        return (control: AbstractControl): ({ [key: string]: any }) | null => {

            const isValid = validator.min(+control.value, min) && validator.max(+control.value, max);
            return isValid ? null : { 'range': 'value is not in range' };
        };
    }
}