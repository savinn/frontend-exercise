import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  items = [];
  dataUrl = "../assets/items.json";

  constructor(private http: Http) { }


  ngOnInit() {
    this.http.get(this.dataUrl).subscribe(data => {
      const dataObject = JSON.parse(data["_body"]);
      this.items = dataObject.data;
    });
  }
}
