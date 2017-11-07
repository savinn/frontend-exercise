import * as console from 'console';
import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Item } from "./item.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  items: Item[] = [];
  dataUrl = "../assets/items.json";
  selectedItems: string[] = [];

  constructor(private http: Http) { }


  ngOnInit() {
    this.http.get(this.dataUrl).subscribe(data => {
      const dataObject = JSON.parse(data["_body"]);
      dataObject.data.forEach(item => {
        const newItem = new Item(false, item);
        this.items.push(newItem);
      });
    });
  }

  updateCheckedOptions(item: Item) {
    this.selectedItems.push(item.item);
    localStorage.setItem("selectedItems", JSON.stringify(this.selectedItems));
  }
}
