import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Item } from './item.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  items: Item[] = [];
  selectedItems: string[] = [];

  constructor(public appService: AppService) { }


  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.appService.getItems().subscribe(data => {
      data['data'].forEach(item => {
        let newItem: Item;
        let storedItem: string;
        const storedItems = JSON.parse(localStorage.getItem('selectedItems'));
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
    if (localStorage.getItem('selectedItems')) {
      this.selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    }
    if (item.isChecked) {
      this.selectedItems.push(item.item);
    } else {
      const index = this.selectedItems.indexOf(item.item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
    localStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
  }

  submitSelection() {
    this.items.forEach(item => item.isChecked = false);
    this.selectedItems = [];
    localStorage.clear();
  }
}
