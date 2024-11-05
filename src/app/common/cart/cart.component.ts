import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { NgFor, NgIf } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationserviceService } from '../../navigationservice.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private cartsService: CartService, private navigationService: NavigationserviceService) { }

  cart: any[] = [];
  orderDetailArray: any[] = []

  emptyCartImg: boolean = true;

  totalValue: number = 0.00;

  ngOnInit(): void {
    this.cart = this.cartsService.getCartItems();
    console.log(this.cart);
    this.loadCartItems();
    this.setTotalValue();
  }

  loadCartItems() {
    if (this.cart.length !== 0) {
      this.emptyCartImg = false;
    }
  }

  setTotalValue() {
    if (this.cart.length !== 0) {
      this.cart.forEach(cartItem => {
        this.totalValue += cartItem.itemQuantity * cartItem.itemPrice;
      });
    }
  }

  orderDetails: any = {
    itemCode: '',
    itemQty: ''
  }

  order: any = {
    customerId: '',
    orderDetailsList: this.orderDetailArray
  }

  addOrderDteais() {
    this.cart.forEach(cartItem => {
      const newOrder = {
        itemCode: cartItem.itemCode,
        itemQty: cartItem.itemQuantity
      }
      this.orderDetailArray.push(newOrder);
    });
    this.order.customerId=this.navigationService.customerId;
  }

  async saveOrder(){
    try {
      let response=await fetch("http://localhost:8080/order/api/v1/save",{
        method: "Post",
        body: JSON.stringify(this.order),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let data=await response.json();
      alert('ok')
    } catch (error) {
      console.log(error);
    }finally{

    }
  }

  btnCheckOut() {
    if (this.navigationService.avatarImg) {
      alert('valid');
      this.addOrderDteais();
      console.log(this.order);
      this.saveOrder();
    } else {
      alert('not valid');
    }
  }


}
