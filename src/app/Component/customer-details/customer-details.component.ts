import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { SharedService } from './../../shared.service';
import { InvoiceLine, Invoice, CustomerDetails } from '../../uti';
import { GlobalBooleanService } from './../../shared.service';

interface Country {
  id: number;
  name: string;
  iso: string;
  iso3: string;
  numcode: number;
  phonecode?: number; // Optional property, add if necessary
}

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customerDetailsInfo: CustomerDetails[] = [];

  countries: Country[] = [];

  constructor(
    private http: HttpClient,
    public globalBooleanService: GlobalBooleanService
  ) {}

  ngOnInit() {
    this.getCountry();
  }

  // update customer
  onSubmit(form: NgForm) {
    const data = this.customerDetailsInfo[0];
    const url = 'https://symfony.wezp/ripon/invoiceapi/editcustomer';

    this.http.post(url, data).subscribe(
      (response) => {
        console.log('POST request successful', response);
        // Handle the response data
      },
      (error) => {
        console.error('Error occurred', error);
        console.error('An error occurred:', error.error);
        console.log('Status code:', error.status);
        console.log('Status text:', error.statusText);
      }
    );

    console.log(this.customerDetailsInfo);
  }

  public getCountry() {
    this.http
      .get<Country[]>('https://symfony.wezp/ripon/invoiceapi/id')
      .subscribe((data: any) => {
        if (data) {
          this.countries = JSON.parse(data);
          // console.log(this.countries);
        }
      });
  }
}
