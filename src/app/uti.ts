export class InvoiceLine {
  description: string = '';
  id: number = 0;
  quantity: number = 1;
  tax_rate: number = undefined!;
  unitPrice: number = undefined!;
}

export class Invoice {
  InvoiceText: string = 'Dit is een Factuur';
  alreadyPaid: boolean = false;
  id: string = '';
  invoiceDate: string = getCurrentDate();
  invoiceNumber: string = '';
  invoiceStatus: string = 'Send';
  paymentTerm: number = 30;
  reference: string = '';
  vatReversed: boolean = false;
  customerDetailsId: string = '';
}

export class CustomerDetails {
  address: string = '';
  city: string = '';
  companyName: string = '';
  contactName: string = '';
  countryCode: number = undefined!;
  houseNumber: string = '';
  id: number = undefined!;
  postalCode: string = '';
  vatNumber: string = '';
}

export class InvoiceHandle1 {
  handleInvoice1: boolean = false;
  handleCustomerCompo1: boolean = false;
}

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
