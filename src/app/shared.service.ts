import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// export class SharedService {
//   metaData: any = undefined;

//   CustomerInfo = {
//     customerCompanyName: undefined,
//     customerCity: undefined,
//     customerContactName: undefined,
//     customerAddress: undefined,
//     customerPostalCode: undefined,
//     customerVatNumber: undefined,
//     customerCountryCode: undefined,
//   };

//   setProfile(meta: any) {
//     this.metaData = meta;

//     const customerInfo = JSON.parse(meta.previous_data);

//     this.CustomerInfo.customerCompanyName = customerInfo.companyName;
//     this.CustomerInfo.customerCity = customerInfo.city;
//     this.CustomerInfo.customerContactName = customerInfo.contactName;
//     this.CustomerInfo.customerAddress = customerInfo.address;
//     this.CustomerInfo.customerPostalCode = customerInfo.postalCode;
//     this.CustomerInfo.customerVatNumber = customerInfo.vatNumber;
//     this.CustomerInfo.customerCountryCode = customerInfo.countryCode;
//   }

//   getProfile() {
//     return this.metaData;
//   }

//   getCustomer() {
//     return this.CustomerInfo;
//   }
// }
export class GlobalBooleanService {
  public globalInvoiceBoolean: boolean = false;
  public globalCustomerBoolean: boolean = false;

  toggleCustomer() {
    this.globalCustomerBoolean = !this.globalCustomerBoolean;
  }

  public toggleInvoice(): void {
    this.globalInvoiceBoolean = !this.globalInvoiceBoolean;
  }
}
