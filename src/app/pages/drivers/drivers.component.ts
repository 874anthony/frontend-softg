import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  public data: any = [{ name: 'Anthony' }];
  public columns = [
    {
      columnDef: 'name',
      header: 'Nombre',
      cell: (row: any) => `${row.name}`,
    },
  ];

  // Angular Material Data
  displayedColumns = this.columns.map((c) => c.columnDef);

  dataSource = this.data;

  constructor() {}

  ngOnInit(): void {}
}
