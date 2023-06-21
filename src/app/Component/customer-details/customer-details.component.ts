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

  onSubmit(form: NgForm) {
    console.log(this.customerDetailsInfo);
  }

  public getCountry() {
    this.http
      .get<Country[]>('https://symfony.wezp/ripon/invoiceapi/id')
      .subscribe((data: any) => {
        if (data) {
          this.countries = JSON.parse(data);
          console.log(this.countries);
        }
      });
  }
}
