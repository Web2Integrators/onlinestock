import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchstockComponent } from './searchstock.component';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';
import { SearchstockService, Stock } from './searchstock.service';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('SearchstockComponent', () => {
  let component: SearchstockComponent;
  let fixture: ComponentFixture<SearchstockComponent>;
  const testStockList: Stock[] = [
    { id: 1, name: 'Apple', price: 2508 },
    { id: 2, name: 'Amazon', price: 1907 },
    { id: 3, name: 'Google', price: 3250 },
    { id: 4, name: 'Walt Disney', price: 1234 },
    { id: 5, name: 'IBM', price: 972 }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchstockComponent],
      imports: [AppModule, MatTableModule, MatFormFieldModule, RouterModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // creating test for table
  it('should test the table ', done => {
    expect(component.ListStocks).toEqual(testStockList);

    // fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(6);

      // Header rows
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('Id');
      expect(headerRow.cells[1].innerHTML).toBe('Name');
      expect(headerRow.cells[2].innerHTML).toBe('Price');

      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toBe(1);
      expect(row1.cells[1].innerHTML).toBe('Apple');
      expect(row1.cells[2].innerHTML).toBe(2508);

      let row2 = tableRows[2];
      expect(row2.cells[0].innerHTML).toBe(2);
      expect(row2.cells[1].innerHTML).toBe('Amazon');
      expect(row2.cells[2].innerHTML).toBe(1907);

      let row3 = tableRows[3];
      expect(row3.cells[0].innerHTML).toBe(3);
      expect(row3.cells[1].innerHTML).toBe('Google');
      expect(row3.cells[2].innerHTML).toBe(3250);

      let row4 = tableRows[4];
      expect(row3.cells[0].innerHTML).toBe(4);
      expect(row3.cells[1].innerHTML).toBe('Walt Disney');
      expect(row3.cells[2].innerHTML).toBe(1234);

      let row5 = tableRows[5];
      expect(row3.cells[0].innerHTML).toBe(5);
      expect(row3.cells[1].innerHTML).toBe('IBM');
      expect(row3.cells[2].innerHTML).toBe(972);
      done();
    });
  });
});


