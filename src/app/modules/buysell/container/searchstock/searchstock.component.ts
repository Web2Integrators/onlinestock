import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SearchstockService, Stock } from './searchstock.service';

@Component({
  selector: 'app-searchstock',
  templateUrl: './searchstock.component.html',
  styleUrls: ['./searchstock.component.scss']
})

export class SearchstockComponent implements OnInit {

  stockItems: Stock[] = [];
  displayedColumns: any ;
  dataSource: any;
  ListStocks:Stock[] = [
    { id: 1, name: 'Apple', price: 2508 },
    { id: 2, name: 'Amazon', price: 1907},
    { id: 3, name: 'Google', price: 3250 },
    {id: 4, name: 'Walt Disney',price: 1234},
    {id: 5, name: 'IBM',price:972},
  ];

  constructor(private StockList: SearchstockService) {}

  ngOnInit() {
    this.StockList.getDisplayStocks().subscribe(response => {
      this.stockItems = response;
      console.log(response);
      this.displayedColumns = ['id', 'name', 'price'];
      this.dataSource = new MatTableDataSource(this.stockItems);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
