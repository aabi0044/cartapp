import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { map } from 'rxjs/operators';
import {Router}from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {


  orders;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.showOrders();
  }
  showOrders() {
    this.api.readOrders().pipe(map(list => list.map(item => {
      let data = item.payload.doc.data();
      let id = item.payload.doc.id;
      return { id, ...data };
    }))).subscribe(res => {
      this.orders = res;
      console.log(res);
      
    })

  }
}
