import { Component, OnInit } from '@angular/core';
import{ApiService}from '../../services/api/api.service';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {
  user;
  id;
  order;
  filtered: { id: string; }[];
  filterProduct: { id: string; }[];
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getOrder();
  }
  getuser(){
    //console.log(localStorage.getItem('uid'))
    this.id= localStorage.getItem('uid');
    // console.log(this.id);
    this.api.getCustomer(this.id).subscribe(res=>{
      this.user=res;
      // console.log(this.user);
    })
  
    
  }
  getOrder(){

    this.id=localStorage.getItem('uid');

console.log(this.id);
    this.api.readOrd(this.id).subscribe(res=>{
      this.order=res;
      console.log(this.order)
    })
  //   // let n = val.toString();
  //     return this.api.readOrd(this.id)
  //     .pipe(map(actions => actions.map(a => {
  //       let data = a.payload.doc.data();
  //       let id = a.payload.doc.id;
  //       return {id, ...data};
  //     })))
  //       .subscribe(res =>{
  //         this.filtered = res;
  //       //  this.filterProduct=this.filtered;
  // console.log(this.filtered)
  //       });
  }
}
