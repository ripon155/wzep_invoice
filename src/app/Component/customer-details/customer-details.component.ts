import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  name: string = 'Ripon';
  contact: string = '01724446252';
  address: string = 'Tangil, Bangladesh';
  postCode: string = '1900';
  place: string = 'Santosh';
  vatNumber: string = '1234';
  state: string = 'BANGLADESH';

  countries: Country[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCountry();
    this.GetCustomersDetails();
  }

  onSubmit(form: NgForm) {
    console.log(form.form.value);
    console.log(this.name);
  }

  public getCountry() {
    this.http
      .get<Country[]>('https://symfony.wezp/ripon/invoiceapi/id')
      .subscribe((data: any) => {
        if (data) {
          this.countries = JSON.parse(data);
        }
      });
  }

  public GetCustomersDetails() {
    this.http
      .get<Country[]>('https://symfony.wezp/ripon/invoiceapi/new/26')
      .subscribe((data: any) => {
        if (data) {
          const results = JSON.parse(data.meta);
          console.log(data);
        }
      });
  }
}
