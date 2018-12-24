import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService ) { }

  ngOnInit() {
  }
  checkout(){
    //move the cart to an order... 
    this.api.order.customerId = localStorage.getItem('uid');
    this.api.order.email = localStorage.getItem('email');
    this.api.order.address = '';
    this.api.order.cart = this.api.cart;
   
   

    //paymemt 
    /*  
    stripe-checkout 

    */

    //send order to db 
    this.api.addOrder(this.api.order).then(res=>{
      console.log('order created')
      this.api.clearSavedCart();
    },err=> console.log(err.message));

    
  }
}
