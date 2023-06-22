import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  InvoiceLine,
  Invoice,
  CustomerDetails,
  InvoiceHandle1,
} from '../../uti';
import { GlobalBooleanService } from './../../shared.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent {
  @Input() invoice: Invoice[] = [];

  // @Input() handleInvoiceComponent: EventEmitter<any> = new EventEmitter();
  // @Input() handleInvoiceComponent!: () => void;

  constructor(public globalBooleanService: GlobalBooleanService) {}

  onSubmit(form: NgForm) {
    console.log(this.invoice);
  }
}
