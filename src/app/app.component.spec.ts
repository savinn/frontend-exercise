import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { Http } from '@angular/http';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent,
        SearchPipe
      ],
      providers: [
        { provide: Http }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  }));

});
