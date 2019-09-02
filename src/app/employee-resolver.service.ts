import {Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({providedIn:'root'})
export class EmployeeResolverService implements Resolve<any> {
    constructor(private http:HttpClient){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let empId = route.paramMap.get('empId');
        if(empId) {
            return this.http.get('/api/employees/'+empId);
        }
    }
}
