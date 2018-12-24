import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  timestamp;
  persons = ["person1", "person"];
  person1 = { firstName: "John", lastName: "Doe", age: 46 };
  person = { firstName: "John", lastName: "Doe", age: 46 };

  cart: any[] = [];
  data = [];
  index = 0;
  order = {
    cart: [],
    customerName: '',
    customerId: '',
    customerPhoto: '',
    payment: false,
    address: '',
    phone: '',
    email: '',
    amount:0
    
  }
  amount:number;
  total: number;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    if (localStorage.getItem('cart') !== null) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  }



  /* ----------- CUStomer-------------------*/

  //  CREATE CUSTOMER
  createCustomer(uid, data) {
    return this.afs.doc('customers/' + uid).set(data);
  }

  //read One 
  getCustomer(uid) {
    return this.afs.doc('customers/' + uid).valueChanges();

  }
  //Read All
  getCustomers() {
    return this.afs.collection('customers').snapshotChanges();
  }
  //UPDATE 
  updateCustomer(uid, data) {
    return this.afs.doc('customers/' + uid).update(data);
  }
  //Delete 
  deleteCustomer(uid) {
    return this.afs.doc('customers/' + uid).delete();
  }



  //----------------Products------------------

  /////////////////////////
  createProduct(data) {
    return this.afs.collection('products').add(data);
  }

  //read One 
  getProduct(uid) {
    return this.afs.doc('products/' + uid).valueChanges();
  }
  //Read All
  getProducts() {
    return this.afs.collection('products').snapshotChanges();
  }
  //UPDATE 
  updateProduct(uid, data) {
    return this.afs.doc('products/' + uid).update(data);
  }
  //Delete 
  deleteProduct(uid) {

    return this.afs.doc('products/' + uid).delete();
    console.log("deleted");
  }

  // fetchApprovedProducts() {
  //   return this.afs.collection('products', ref => ref.where('status', '==', 'approved')).snapshotChanges();
  // }
  

  /** -----------------Cart---------------------------------------------------------------------  */

  saveToCart(cart) {
    let data = JSON.stringify(cart);
    localStorage.setItem('cart', data);
  }

  getSavedCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  clearSavedCart() {
    localStorage.removeItem('cart');
  }


 
  addItemToCart(item) {
    return this.cart.push(item);
  }
  removeItemFromCart(index) {
    this.cart.splice(index, 1);
  }

  //--------------------------------------------------------------------------------------------------------//
  /** Get Data from Cart  */
  getCartData(id) {
    console.log(id)
    return this.afs.doc('cart/' + id).valueChanges();
  }
  /* ---------------ORDER--------------------------------------------------------------------------- */

  //CREATE
  addOrder(data) {
    return this.afs.collection('orders').add(data);
  }

  //READ ONE
  readOrder(id) {
    
    return this.afs.doc('orders/' + id).valueChanges();
  }
  //READ ALL
  readOrders() {
    return this.afs.collection('orders').snapshotChanges();

  }
  // DELETE 
  removeOrder(id) {
    return this.afs.doc('orders/' + id).valueChanges();
  }
  //UPDATE 

  updateOrder(id) {
    return this.afs.doc('orders/' + id).valueChanges();
  }
//-----------------------------------------------------FILTERS--------------------------------------------
readOrd(val) {
  console.log(val)
  console.log(typeof val)
  return this.afs.collection ('orders', ref => ref.where('customerId', '==', val)).valueChanges();
}

priceFilter(min,max) {
  console.log(min)
  console.log(typeof min)
  console.log(max)
  console.log(typeof max)
  return this.afs.collection('products', ref => 
  ref.where('price', '>=', min)
  .where('price','<=',max)).snapshotChanges();
}

newArrival(date){
console.log(date);
  return this.afs.collection('products',ref=> ref.where('date','>=',date)).snapshotChanges();
}
oldProducts(date){
  console.log(date);
    return this.afs.collection('products',ref=> ref.where('date','<',date)).snapshotChanges();
  }

  rangOf(date){
    console.log(date);
      return this.afs.collection('products',ref=> ref
      .where('date','>=',date)
      .where('date','<=',date)).snapshotChanges();
    }

//-----------Payment Process service---------------
processPayment(token: any, amount: number,uid) {
  const payment = { token, amount }
  console.log(payment);
  console.log(uid);
  return this.afs.doc(`/payments/${uid}`).set(payment);
}



// this.afAuth.authState.subscribe((auth) => {
//   if (auth) this.userId = auth.uid
// });

//------------------------------------------------------------------------------------------------------------
  // updateCart(id,data){
  //   return this.afs.doc('cart/'+id).update(
  //     {
  // cart:data
  //     }
  //   )
  // }
  /* 
     api.cart =[ {
       title:'shoes aka1',
       price:23000,
       brandName:'',
       quantity:10
     }];
  
  
   order : database saved 
   on-checkout --> save cart to order 
  
   order :{
     customerName:'Abudllah',
     address:'house no',
     phone:-3333,
     customerId:'02323sdsdsd',
     cart:[=== api.cart ===]
   }
  
  */
  // addToCart(id,data){
  //   console.log(data); 
  //   return this.afs.doc('cart/'+id ).update({
  //     subCart: data
  //   }); 
  // }

  // createSelectedProduct(data) {
  //   return this.afs.collection('products').add(data);
  // }



}