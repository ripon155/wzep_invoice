import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoceFormComponent } from './Component/invoce-form/invoce-form.component';
import { FormsModule } from '@angular/forms';
import { InvoiceDetailsComponent } from './Component/invoice-details/invoice-details.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { CustomerDetailsComponent } from './Component/customer-details/customer-details.component';
import { GlobalBooleanService } from './shared.service';

@NgModule({
  declarations: [
    AppComponent,
    InvoceFormComponent,
    InvoiceDetailsComponent,
    ProductDetailsComponent,
    CustomerDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],

  providers: [GlobalBooleanService],
  bootstrap: [AppComponent],
})
export class AppModule {}

// 164e5bba8a724fa6b0be7c538e93c3fc
