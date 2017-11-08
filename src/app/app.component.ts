import { Component, OnInit } from '@angular/core';
import { Item } from './item.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  items: Item[] = [];
  selectedItems: Item[] = [];
  searchTerm = '';

  constructor(public appService: AppService) { }


  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.getDataFromStorage();
    this.appService.getItems().subscribe(data => {
      data['data'].forEach(item => {
        let newItem: Item;
        if (this.selectedItems.length) {
          const itemCheck = this.selectedItems.find(itemFromStorage => item === itemFromStorage.item);
          newItem = itemCheck ? new Item(true, item) : new Item(false, item);
        } else {
          newItem = new Item(false, item);
        }
        this.items.push(newItem);
      });
    });
  }

  getDataFromStorage() {
    if (localStorage.getItem('selectedItems')) {
      this.selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    }
  }

  updateCheckedOptions(item: Item, i: number) {
    this.getDataFromStorage();
    this.searchTerm = '';
    if (item.isChecked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(i, 1);
      const itemUncheck = this.items.find(currentItem => currentItem.item === item.item);
      if (itemUncheck) {
        itemUncheck.isChecked = false;
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
