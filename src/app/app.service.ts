import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    dataUrl = '../assets/items.json';

    constructor(private http: HttpClient) { }

    getItems(): Observable<{}> {
        return this.http.get(this.dataUrl);
    }
}
