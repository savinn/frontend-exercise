import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { AppService } from './app.service';
import { Item } from './item.model';
import { Observable } from "rxjs/Rx";

import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

let appMock = {
  getItems(url): Observable<{}> {
    return Observable.of({});
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent,
        SearchPipe
      ],
      providers: [
        { provide: AppService, useValue: appMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.items = [new Item(false, "boo")];
  });

  it('Should create the app', () => {
    expect(component).toBeDefined();
  });

  it('After clicking on item expects to set item.isChecked to true,to push the item into selectedItems array,to store the item in localStorage and to add class \'selection__checkbox-title--checked\'', () => {
   
    component.updateCheckedOptions(component.items[0]);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.items[0].isChecked).toBe(true);
      expect(localStorage).not.toBeUndefined();
      expect(component.selectedItems.length).not.toEqual(0);
      expect(fixture.nativeElement.querySelector(".selection__checkbox-title--checked")).not.toBeNull();
    });
  });

  it('boo', () => {
    component.submitSelection();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    expect(component.items[0].isChecked).not.toBe(true);
    expect(localStorage).toBeUndefined();
    expect(component.selectedItems.length).toEqual(0);
    expect(fixture.nativeElement.querySelector(".selection__checkbox-title--checked")).toBeNull();
  });
  });

});
