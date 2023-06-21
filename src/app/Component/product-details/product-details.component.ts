import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  tableData: any[] = [];
  @Input() invoiceText: string = '';

  totalSub: number = undefined!;
  totalAmount: number = undefined!;

  ngOnInit() {
    // Initialization
    const initialRow = {
      id: 1,
      quantity: 1,
      description: '',
      unitPrice: null,
      total: null,
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
          unitPrice: null,
          total: null,
          taxRate: null,
          showDeleteButton: false,
        };

        // Add the new row to the tableData array
        this.tableData.push(newRow);
      }
    }
  };

  // delete row
  deleteRow(rowId: number) {
    this.tableData = this.tableData.filter((row) => row.id !== rowId);
  }

  // Handle the change event
  handleChangePrice(event: any, rowId: string) {
    const id = Number.parseInt(rowId);
    const newValue = event.target.value;
    this.tableData[id - 1].unitPrice = newValue;

    let newTotal =
      Number.parseInt(newValue) *
      Number.parseInt(this.tableData[id - 1].quantity);
    this.tableData[id - 1].total = newTotal;
    // console.log(this.tableData);
  }

  handleChangeDesc(event: any, rowId: string) {
    const id = Number.parseInt(rowId);
    const newDescription = event.target.value;
    this.tableData[id - 1].description = newDescription;
    console.log(this.tableData);
  }

  handleChangeQuantity(event: any, rowId: string) {
    const id = Number.parseInt(rowId);
    const newQuantity = event.target.value;
    this.tableData[id - 1].quantity = newQuantity;

    let newTotal =
      Number.parseInt(newQuantity) *
      Number.parseInt(this.tableData[id - 1].total);
    this.tableData[id - 1].total = newTotal;
  }

  clickVatChange(event: any, rowId: string) {
    const id = Number.parseInt(rowId);
    const newTaxRate = event.target.value;
    this.tableData[id - 1].taxRate = newTaxRate;
  }

  calculateTotal() {
    const total = this.tableData.reduce((accumulator, element) => {
      let total =
        Number.parseInt(element.total) * Number.parseInt(element.total);
      return accumulator + total;
    }, 0);
  }

  //current data
}
