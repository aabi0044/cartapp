import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { map } from 'rxjs/operators';
import {Router}from '@angular/router';
import{NgForm} from '@angular/forms';
import{Product}from '../../product.model';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // product = {
  //   id:'',
  //   name: '',
  //   price: '',
  //   description: '',
  //   status: ''

  // }
  
  val;
  filtered;
  filterProduct;
  newprd;
  newProduct;
  oldprd;
  oldProduct;
//--------------Prices Filter Values declaration-------------------------
zero:number=0;
nineNine:number=99;
hundred:number=100;
nineNineNine:number=999;
thousand:number=1000;
thousandNineNine:number=1099;
menu;

slected:string='';

//---------------------------
  user;
  id;
  counter;
  myDocData;
  products;
  checkDetails;
  select ='id';
  min:Number;
  max:Number;
 date= new Date();
  
  dataLoading: boolean = false;
  constructor(private api:ApiService,private router:Router ,private product:Product) { }

  ngOnInit() {
    this.showProducts();
    this.getuser();
 
  
   
  }



  
  showProducts() {
    this.api.getProducts().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.products = res;
      // console.log(res);
      
    })
    
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
  // showDetails(product) {
  //   this.id= localStorage.getItem('uid');
  //   console.log(this.id);
  //   return this.id;

  
  // }
  onItemClick(prd){

    this.select=prd; 
    // console.log(this.select);
    // this.product.id=this.select; 
    this.router.navigate(['/productview',{
      product: JSON.stringify(this.select)
    }])
  }
 
showFilterProducts(short,long){
  console.log(short,long);
  
  // let n = val.toString();
    return this.api.priceFilter(short,long)
    .pipe(map(actions => actions.map(a => {
      let data = a.payload.doc.data();
      let id = a.payload.doc.id;
      return {id, ...data};
    })))
      .subscribe(res =>{
        this.filtered = res;
       this.filterProduct=this.filtered;

      });
      
}
show(){

  this.showFilterProducts(this.min, this.max);
   }
   

selectChangeHandler(event:any){
  this.slected=event.target.value;
  if (this.slected == '100') {
    this.showFilterProducts(0, 99);
}
else if (this.slected == '1000') {
    this.showFilterProducts(100, 999);
}
else if (this.slected == '2000') {
    this.showFilterProducts(1000, 1999);
}
else if (this.slected == '5000') {
  this.showFilterProducts(2000, 4999);
}
else if (this.slected == '10000') {
  this.showFilterProducts(5000, 9999);
}
else if (this.slected == '100000') {
  this.showFilterProducts(10000, 99999999);
}
}

newArrival(dat){
  
    console.log(dat);
    
   console.log(dat);
      return this.api.newArrival(dat)
      .pipe(map(actions => actions.map(a => {
        let data = a.payload.doc.data();
        let id = a.payload.doc.id;
        return {id, ...data};
      })))
        .subscribe(res =>{
          this.newprd = res;
          this.newProduct=this.newprd;
     
  
        });
  
}

  arrival(){
    this.newArrival(this.date);
  }
  oldProducts(dat){
  
    console.log(dat);
    
   console.log(dat);
      return this.api.oldProducts(dat)
      .pipe(map(actions => actions.map(a => {
        let data = a.payload.doc.data();
        let id = a.payload.doc.id;
        return {id, ...data};
      })))
        .subscribe(res =>{
          this.oldprd = res;
         this.oldProduct=this.oldprd;
  
        });
  
}

  old(){
    this.oldProducts(this.date);
  }
}

  

