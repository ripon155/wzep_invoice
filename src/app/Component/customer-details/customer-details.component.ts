import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent {
  name: string = 'Ripon';
  contact: string = '01724446252';
  address: string = 'Tangil, Bangladesh';
  postCode: string = '1900';
  place: string = 'Santosh';
  vatNumber: string = '1234';
  inputState: string = 'Bangladesh';

  onSubmit(form: NgForm) {
    console.log(form.form.value);
    console.log(this.name);
  }
}
