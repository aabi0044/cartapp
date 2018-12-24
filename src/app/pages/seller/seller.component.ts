import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { map } from 'rxjs/operators';
import{NgForm} from '@angular/forms';
import{Product}from '../../product.model';




@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  // product = {
    
     name: string;
     price:number;
    description: string;
    status: string;
    date= Date.now()
    id;


  // }
  prd;
  private product:Product;
  constructor(private api: ApiService) { }

  ngOnInit() {
    //this.resetForm();
    this.showProducts();
    
  }
  addProduct() {

    let p ={
      name:this.name,
      price: this.price,
      description: this.description,
      status: this.status,
      date:this.date
    }

    this.product = p;

    this.api.createProduct(this.product).then(res => {
      console.log('product Added');
  
      this.resetForm();

    })}
  showProducts() {
    this.api.getProducts().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.prd = res;
      console.log(res);
    })
   

  }
  resetForm(form? : NgForm){
    if (form != null){
    form.reset();
    // this.product={
    
    //   name:'',
    //   price:Number,
    //   description:'',
    //   status:'',
    // }
  }
  }
  onItemClick(prd){
    console.log(prd)
    this.name=prd.name; 
    this.price=prd.price;
    this.description=prd.description;
    this.status=prd.status;
    this.id = prd.id;
    // this.product=Object.assign({},prd); 
  }
  updateProduct(){
   
    let d = {
      name: this.name,
      status: this.status,
      price: this.price,
      description: this.description
    }
    this.api.updateProduct(this.id,d).then(res=>{
      console.log('Product updated')
    })
  }
  deleteProduct(){

    if(confirm ("Are you sure to delete ?")==true){
    this.api.deleteProduct(this.id).then(res=>{
      console.log(this.id);
      console.log('product deletes');
    
    })
    this.showProducts();
    this.resetForm();
  }}
  
}
