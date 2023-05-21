import { Component } from '@angular/core';

@Component({
  selector: 'app-invoce-form',
  templateUrl: './invoce-form.component.html',
  styleUrls: ['./invoce-form.component.css'],
})
export class InvoceFormComponent {
  phoneNumber: number = 1759638848;
  chamberOfCommerce: number = 11234456;
  vatNumber: number = 22345567;
  bank: string = ' IBAN12234456';

  handleCustomerCompo: boolean = false;
  handleInvoice: boolean = false;

  handleCustomerComponent() {
    this.handleCustomerCompo = true;
  }

  handleInvoiceComponent() {
    this.handleInvoice = true;
  }
}
