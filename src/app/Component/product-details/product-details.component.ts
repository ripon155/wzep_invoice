import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  tableData: any[] = [];

  ngOnInit() {
    // Initialization
    const initialRow = {
      id: 1,
      quantity: 1,
      description: '',
      unitPrice: 0,
      total: 0,
      taxRate: null,
      showDeleteButton: false,
    };

    this.tableData.push(initialRow);
  }

  addRow = function (this: { tableData: any[] }, event: any) {
    let last = this.tableData.slice(-1)[0].id;

    var selectElement = <HTMLSelectElement>(
      document.getElementsByName('tax-rate-' + last)[0]
    );

    const currentRow = Number.parseInt(event.target.name.split('-')[2]);
    // const lastRow = this.tableData.length;

    const lastChildSelected =
      selectElement.options[selectElement.selectedIndex].value;

    // add delete button previous row
    if (this.tableData.length >= 1) {
      const prevRowIndex = this.tableData.length - 1;
      const prevRow = this.tableData[prevRowIndex];
      prevRow.showDeleteButton = true;
    }

    if (
      lastChildSelected === '9' ||
      lastChildSelected === '0' ||
      lastChildSelected === '21' ||
      lastChildSelected === 'Vat shifted'
    ) {
      if (currentRow === last) {
        // Create a new row object with default values
        var newRow = {
          id: this.tableData.length + 1,
          quantity: 1,
          description: '',
          unitPrice: 0,
          total: 0,
          taxRate: null,
          showDeleteButton: false,
        };

        // Add the new row to the tableData array
        this.tableData.push(newRow);
        console.log(this.tableData);
      }
    }
  };

  // delete row
  deleteRow(rowId: number) {
    this.tableData = this.tableData.filter((row) => row.id !== rowId);
  }

  calculateTotal(id: number) {}
}
