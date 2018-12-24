import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {
  prdview: any[] = [];
  resGet: any[] = [];
  update;
  error: string;
  product;
  total: number = 0;
  res;
  select;
cart: any[];
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    this.route.params.subscribe(par => {
      this.product = JSON.parse(par.product)


    })
  }

  ngOnInit() {
    
  }

  add() {
    //simple save item to cart 
    this.api.cart.push(this.product);

    localStorage.setItem('cart', JSON.stringify(this.api.cart));

    console.log(this.api.cart);
  }

  remove(id) {
    let index = this.api.cart.findIndex(element => element.id === id);
    this.api.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
  }

  clearCart() {
    this.api.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    this.total = 0;
  }

  paymentMethod() {

    this.select = this.api.getSavedCart();
console.log(this.select);
    this.router.navigate(['makepayment', {
      cart: JSON.stringify(this.select)
    }])
  }

  showcart() {

    console.log(this.api.getSavedCart());
  }
  //   checkout(){
  //     //move the cart to an order... 
  //  this.res= JSON.parse(localStorage.getItem('cart'));
  //     if(this.res!=''){
  //     this.api.order.customerId = localStorage.getItem('uid');
  //     this.api.order.email = localStorage.getItem('email');
  //     this.api.order.customerName=localStorage.getItem('name');
  //     this.api.order.address = '';
  //     this.api.order.amount=this.total;
  //     console.log(this.api.order.amount);

  //     this.api.order.cart = this.api.cart;



  //     //paymemt 
  //     /*  
  //     stripe-checkout 

  //     */

  //     //send order to db 
  //     this.api.addOrder(this.api.order).then(res=>{
  //       console.log('order created')
  //       this.clearCart();
  //     },err=> console.log(err.message));
  //   }
  //   else{
  //     console.log('Nothing in the Cart')
  //   }

  //   }

  // totalPrice(){


  //   let x=JSON.parse( localStorage.getItem('cart'));

  // let len=x.length;


  //   for(var i=0;i<len;i++){
  //     let y= parseInt(x[i].price);
  //      this.total=(y+this.total);
  //   }

  // }





  //   add(){
  //     // console.log(this.product)

  //     // console.log(this.prdview)
  //  this.api.getCartData(localStorage.getItem('uid')).subscribe(res=>{
  //   console.log(res)
  //    this.resGet.push(res);

  //    this.api.addToCart(localStorage.getItem('uid'), this.prdview)
  //       .then(res => {

  //        this.update=res;
  //           console.log('coming')
  //       }, err => {

  //       })
  //  })


  //   }
  // showProducts() {
  //   this.api.getProducts().pipe(map(actions => actions.map(a => {
  //     let data = a.payload.doc.data();
  //     let id = a.payload.doc.id;
  //     return { id, ...data };
  //   }))).subscribe(res => {
  //     this.products = res;
  //     // console.log(res);
  //   })

  // }


}
