import { Injectable } from "@angular/core";
import { FormControl } from '@angular/forms';
import moment from 'moment';

@Injectable({providedIn: 'root'})
export class HireDateValidator {
    constructor() {}

    validateHireDate(fc : FormControl) {
        if(fc && fc.value) {
            let hireDate = fc.value;
            var hireDt = moment(hireDate, 'YYYY-MM-DD', true);
            var isValidHireDate = (hireDt.isValid() && hireDt.isBefore(moment()));
            if(!isValidHireDate) {
                return {invalidHireDate : false}
            } else {
                return null;
            }
        }
    }
}

