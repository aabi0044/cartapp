import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Http } from '@angular/http';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  total: number = 0;
  prdview: any[] = [];
  resGet: any[] = [];
  update;
  // N: any[] = [];
  error: string;
  product;

  res;
  select;
  toknid;






  constructor(private route: ActivatedRoute, private api: ApiService, private http: Http) { }


  ngOnInit() {

    this.totalPrice();


  }

  remove(id) {
    let index = this.api.cart.findIndex(element => element.id === id);
    this.api.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
  }
  totalPrice() {


    let x = JSON.parse(localStorage.getItem('cart'));

    let len = x.length;


    for (var i = 0; i < len; i++) {
      let y = parseInt(x[i].price);
      this.total = (y + this.total);




    }

  }
  checkout() {


    //move the cart to an order... 
    this.res = JSON.parse(localStorage.getItem('cart'));
    if (this.res != '') {
      this.api.order.customerId = localStorage.getItem('uid');
      this.api.order.email = localStorage.getItem('email');
      this.api.order.address = '';
      this.api.order.amount = this.total;


      this.api.order.cart = this.api.cart;

      console.log(this.api.order.amount);
      console.log(this.toknid);
      //paymemt 
      /*  
      stripe-checkout     
      */
      this.openCheckout();
      //send order to db 

  



    }
    else {
      console.log('Nothing in the Cart')
    }

  }
  clearCart() {
    this.api.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    this.total = 0;
  }

  openCheckout() {
    
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_cJmghymBoEPLI11Kvd1lxk5q',
      locale: 'auto',
      token: token => {
        this.toknid = token.id;
        console.log(this.toknid);
        let uid = localStorage.getItem('uid');
        this.api.processPayment(this.toknid, this.total, uid)
        .then(
          () => {
            this.createorder();
          }
        );
      }

    });

    handler.open({
      name: 'Enter Card Details',
      description: 'Payment handler',
      amount: this.total

    });

  }
  createorder() {
    this.api.addOrder(this.api.order).then(res => {
      console.log(this.api.order.amount);
      console.log('order created')
      this.clearCart();
    }, err => console.log(err.message));

  }

}
