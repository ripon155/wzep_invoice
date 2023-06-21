import { Component, OnInit, Input } from '@angular/core';
import { GlobalBooleanService } from './../../shared.service';
import { HttpClient } from '@angular/common/http';

import {
  InvoiceLine,
  Invoice,
  CustomerDetails,
  InvoiceHandle1,
} from '../../uti';

@Component({
  selector: 'app-invoce-form',
  templateUrl: './invoce-form.component.html',
  styleUrls: ['./invoce-form.component.css'],
})
export class InvoceFormComponent implements OnInit {
  invoiceLines: InvoiceLine[] = [];
  customerDetailsInfo: CustomerDetails[] = []; // [new CustomerDetails()]
  invoice: Invoice[] = [];

  accountNumber: string = undefined!;
  btwNumber: string = undefined!;
  address: string = undefined!;
  city: string = undefined!;
  company: string = undefined!;
  kvkNumber: string = undefined!;
  licensePlate: string = undefined!;
  mobile: string = undefined!;
  phone: string = undefined!;
  zipCode: string = undefined!;
  number: number = undefined!;
  invoiceNumber: number = undefined!;

  handleCustomerCompo: boolean = false;

  //invoice text

  invoiceText: string = ''; // @Input()

  constructor(
    private http: HttpClient,

    public globalBooleanService: GlobalBooleanService
  ) {}

  ngOnInit() {
    this.GetCustomersDetails();
  }

  public GetCustomersDetails() {
    this.http
      .get('https://symfony.wezp/ripon/invoiceapi/new/26')
      .subscribe((data: any) => {
        if (data) {
          // this.sharedService.setProfile(data);

          // console.log(data);

          //profile info
          const profileDetails = JSON.parse(data.meta);

          this.accountNumber = profileDetails.accountNumber;
          this.btwNumber = profileDetails.btwNumber;
          this.address = profileDetails.address;
          this.city = profileDetails.city;
          this.company = profileDetails.company;
          this.kvkNumber = profileDetails.kvkNumber;
          this.licensePlate = profileDetails.licensePlate;
          this.mobile = profileDetails.mobile;
          this.phone = profileDetails.phone;
          this.zipCode = profileDetails.zipCode;
          this.number = profileDetails.number;

          //invoice number

          this.invoiceNumber = data.invoice_number;
          //invoice text
          this.invoiceText = data.invoice_text;
          //set customer info
          const customerInfo = JSON.parse(data.previous_data);
          // console.log(customerInfo);

          const {
            address,
            city,
            companyName,
            contactName,
            countryCode,
            id,
            postalCode,
            vatNumber,
          } = customerInfo;

          const customerDetails = new CustomerDetails();
          customerDetails.address = address;
          customerDetails.city = city;
          customerDetails.companyName = companyName;
          customerDetails.contactName = contactName;
          customerDetails.countryCode = countryCode;
          customerDetails.id = id;
          customerDetails.postalCode = postalCode;
          customerDetails.vatNumber = vatNumber;

          this.customerDetailsInfo.push(customerDetails);

          // console.log(this.customerDetailsInfo);

          // invoice information
          const invoiceInfo = new Invoice();
          invoiceInfo.invoiceNumber = data.invoice_number;
          invoiceInfo.InvoiceText = data.invoice_text;
          invoiceInfo.id = customerInfo.user.id;
          invoiceInfo.customerDetailsId = id;

          this.invoice.push(invoiceInfo);
        }
      });
  }
}
