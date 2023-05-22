import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent {
  onSubmit(form: NgForm) {
    console.log(form.form.value);
  }
}
