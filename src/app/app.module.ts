import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoceFormComponent } from './Component/invoce-form/invoce-form.component';
import { FormsModule } from '@angular/forms';
import { InvoiceDetailsComponent } from './Component/invoice-details/invoice-details.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { CustomerDetailsComponent } from './Component/customer-details/customer-details.component';

@NgModule({
  declarations: [AppComponent, InvoceFormComponent, InvoiceDetailsComponent, ProductDetailsComponent, CustomerDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
