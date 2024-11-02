import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']  // Corrected to 'styleUrls'
})
export class AdmindashboardComponent implements OnInit, AfterViewInit {

  userId!: number;

  @ViewChild('addSuppliers') addSuppliersElement!: ElementRef;
  private addSuppliers!: Modal;

  @ViewChild('addItems') addItemsElement!: ElementRef;
  private addItemsModal!: Modal;

  supplier = {
    supplierName: '',
    supplierEmail: '',
    supplierPhone: '',
    supplierCompany: ''
  };

  item={
    itemName:"",
    itemImage:"",
    itemDescription:"",
    itemPrice:1,
    itemQuantity:2,
    itemCategory:"",
    itemCode:"",
    supplierId:""
  };

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.addSuppliers = new Modal(this.addSuppliersElement.nativeElement);
    this.addItemsModal = new Modal(this.addItemsElement.nativeElement);
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
  }

  addSuppliersFunction() {
    this.addSuppliers.show();
  }

  btnAddItems() {
    this.addItemsModal.show();
  }

  async submitSupplierForm() {
    try {
      console.log(this.supplier);
      let response = await fetch('http://localhost:8080/supplier/api/v1/save', {
        method: 'POST',
        body: JSON.stringify(this.supplier),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  async submitItemForm(){
    try {
      console.log(this.item);
      let response = await fetch('http://localhost:8080/item/api/v1/save', {
        method: 'POST',
        body: JSON.stringify(this.item),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
}
