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

  constructor(private cartsService:CartService, private navigationService:NavigationserviceService){}

  cart:any[]=[];

  emptyCartImg:boolean=true;

  totalValue:number=0.00;

  ngOnInit(): void {
    this.cart=this.cartsService.getCartItems();
    console.log(this.cart);
    this.loadCartItems();
    this.setTotalValue();
  }

  loadCartItems(){
    if(this.cart.length!==0){
      this.emptyCartImg=false;
    }
  }

  setTotalValue(){
    if(this.cart.length!==0){
      this.cart.forEach(cartItem=>{
        this.totalValue+=cartItem.itemQuantity*cartItem.itemPrice;
      });
    }
  }

  btnCheckOut(){
    
  }


}
