import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { Item } from "./item.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
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
        let newItem: Item;
        let storedItem: string;
        const storedItems = JSON.parse(localStorage.getItem("selectedItems"));
        if (storedItems) {
          storedItem = storedItems.find(itemFromStorage => item === itemFromStorage);
        }
        if (!storedItem) {
          newItem = new Item(false, item);
        } else {
          newItem = new Item(true, item);
        }
        this.items.push(newItem);
      });
    });
  }

  updateCheckedOptions(item: Item) {
    if (localStorage.getItem("selectedItems")) {
      this.selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    }
    if (item.isChecked) {
      this.selectedItems.push(item.item)
    } else {
      let index = this.selectedItems.indexOf(item.item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
    localStorage.setItem("selectedItems", JSON.stringify(this.selectedItems));
  }
}
