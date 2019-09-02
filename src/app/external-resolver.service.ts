import {Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({providedIn:'root'})
export class ExternalResolveService implements Resolve<any> {
    constructor(private http:HttpClient){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let joke = this.http.get('/api/external/getjoke');
        let quote = this.http.get('/api/external/getquote');
        let data = {joke : joke, quote : quote};
        return of(data);
    }
}
