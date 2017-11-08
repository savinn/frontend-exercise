import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    dataUrl = '../assets/items.json';

    constructor(private http: Http) { }

    getItems(): Observable<string[]> {
        return this.http.get(this.dataUrl)
            .map(res => {
                return res.json();
            }
            )
    }
}