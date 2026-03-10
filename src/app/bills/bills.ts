import { Component } from '@angular/core';

@Component({
  selector: 'app-bills',
  standalone: true,
  templateUrl: './bills.html',
  styleUrl: './bills.css'   
})
export class BillsComponent {

  downloadBill(id: string) {
    console.log('Downloading bill:', id);
  }

}