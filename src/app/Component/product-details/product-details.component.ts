import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InvoiceLine, Invoice, CustomerDetails } from '../../uti';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  tableData: any[] = [];
  // @Input() invoiceText: string = '';

  @Input() invoice: Invoice[] = [];
  @Input() customerDetailsInfo: CustomerDetails[] = [];

  totalSub: number = undefined!;
  totalAmount: number = undefined!;

  public invoiceTotalTax: number = 0;
  public invoiceAmount: number = 0;
  public subTotal: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initialization
    const initialRow = {
      id: 1,
      quantity: 1,
      description: '',
      unitPrice: null,
      total: null,
      tax_rate: 9,
      showDeleteButton: false,
    };

    this.tableData.push(initialRow);
  }

  //Add Row
  addRow = function (this: { tableData: any[] }, event: any) {
    let last = this.tableData.slice(-1)[0].id;
    console.log(this.tableData.slice(-1));

    let selectElement = <HTMLSelectElement>(
      document.getElementsByName('tax-rate-' + last)[0]
    );

    const currentRow = Number.parseInt(event.target.name.split('-')[2]);
    // const lastRow = this.tableData.length;

    const lastChildSelected =
      selectElement.options[selectElement.selectedIndex].value;

    // add delete button previous row
    if (this.tableData.length >= 1 && currentRow === last) {
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
          tax_rate: 9,
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
    this.calculateTotal();
  }

  // Handle the change event
  handleChangePrice(event: any, rowId: string) {
    console.log(rowId);
    console.log(this.tableData);

    const id = Number.parseInt(rowId);
    const newValue = event.target.value;

    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].id == id) {
        console.log(this.tableData[i].id);
        this.tableData[i].unitPrice = newValue;

        let newTotal =
          Number.parseInt(newValue) *
          Number.parseInt(this.tableData[i].quantity);
        this.tableData[i].total = newTotal;

        this.calculateTotal();
      }
    }

    this.calculateTotal();
  }

  handleChangeDesc(event: any, rowId: string) {
    const id = Number.parseInt(rowId);
    const newDescription = event.target.value;

    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].id == id) {
        console.log(this.tableData[i].id);

        this.tableData[i].description = newDescription;
        this.calculateTotal();
      }
    }

    this.calculateTotal();
  }

  handleChangeQuantity(event: any, rowId: string) {
    const id = Number.parseInt(rowId);
    const newQuantity = event.target.value;

    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].id == id) {
        console.log(this.tableData[i].id);

        this.tableData[i].quantity = newQuantity;

        let newTotal =
          Number.parseInt(newQuantity) *
          Number.parseInt(this.tableData[i].unitPrice);
        this.tableData[i].total = newTotal;

        this.calculateTotal();
      }
    }

    this.calculateTotal();
  }

  clickVatChange(event: any, rowId: string) {
    const id = Number.parseInt(rowId);
    const newTaxRate = event.target.value;

    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].id == id) {
        console.log(this.tableData[i].id);
        this.tableData[i].tax_rate = newTaxRate;
        this.calculateTotal();
      }
    }

    this.calculateTotal();
  }

  calculateTotal() {
    let tax: number = 0;
    let amount: number = 0;
    const total = this.tableData.forEach((items) => {
      if (items?.quantity && items?.unitPrice) {
        //SubTotal
        amount +=
          Number.parseInt(items.quantity) * Number.parseInt(items.unitPrice);

        if (items.tax_rate != 0 && items.tax_rate != 'Vat shifted') {
          tax +=
            (Number.parseInt(items.quantity) *
              Number.parseInt(items.unitPrice) *
              Number.parseInt(items.tax_rate)) /
            100;
        }
      }
    });
    this.invoiceTotalTax = tax;
    this.invoiceAmount = amount;
    this.subTotal = this.invoiceAmount - this.invoiceTotalTax;
  }

  // create invoice
  createInvoice() {
    let existingArray = this.tableData;
    if (this.tableData.length > 1) {
      existingArray = this.tableData.slice(0, -1);
    }
    console.log(existingArray);

    const newArray = existingArray.map((obj) => {
      const { total, showDeleteButton, ...rest } = obj;
      return rest;
    });

    console.log(newArray);

    const data = {
      customerDetails: this.customerDetailsInfo[0],
      invoice: this.invoice[0],
      invoiceLines: newArray,
    };

    const url = 'https://symfony.wezp/ripon/invoiceapi/createinvoice';
    console.log(data);

    this.http.post(url, data).subscribe(
      (response) => {
        console.log('POST request successful', response);
        // Handle the response data
      },
      (error) => {
        // console.error('Error occurred', error);
        // console.error('An error occurred:', error.error);
        // console.log('Status code:', error.status);
        // console.log('Status text:', error.statusText);
      }
    );
  }

  redirectToURL() {
    window.location.href = 'https://symfony.wezp/invoices/?message=false';
  }
}
