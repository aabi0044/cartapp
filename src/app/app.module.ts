import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//---------------------------------------FIREBASE -------------------------------------------
import{AngularFireAuthModule} from '@angular/fire/auth';
import{AngularFirestoreModule}from '@angular/fire/firestore';
import{AngularFireModule} from '@angular/fire';
//-------------------------------------------------------------------------------------------
import{environment} from '../environments/environment';
import {RouterModule}from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { SellerComponent } from './pages/seller/seller.component';
import{FormsModule}from '@angular/forms';
import{Product}from '../app/product.model';
import{HttpModule}from '@angular/http';


import { ProductviewComponent } from './pages/productview/productview.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
// import { MakePaymentComponent } from './pages/payments/make-payment/make-payment.component';
import { CheckoutComponent } from './pages/productview/checkout/checkout.component';
import { CartComponent } from './pages/productview/cart/cart.component';
import { AuthGuardService } from './services/authguard/auth-guard.service';
import{RoleGuardServiceService}from './services/RoleGuardService/role-guard-service.service';
import { CustomerOrderComponent } from './pages/customer-order/customer-order.component';

import { PaymentsComponent } from './pages/payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CustomerComponent,
    SellerComponent,
    ProductviewComponent,
    OrderdetailsComponent,
  
    CheckoutComponent,
    CartComponent,
    CustomerOrderComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule,
  
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot([
      {path:'',redirectTo:'signup',pathMatch:'full'},
      {path:'login',component:LoginComponent},
      {path:'signup',component:SignupComponent},
    {path:'customer',
     canActivate:[RoleGuardServiceService],
     data:{
       expectedRole:'Customer'
     },
    component:CustomerComponent},
        {path:'seller',
        canActivate:[RoleGuardServiceService],
        data:{
          expectedRole:'Seller'

        },
        component:SellerComponent},
        {path:'customerorder',component:CustomerOrderComponent},
        {path:'productview',component:ProductviewComponent},
        {path:'productview/:id',component:ProductviewComponent},
        {path:'orders',component:OrderdetailsComponent},
        
        // {path:'makepayment',component:MakePaymentComponent},
        // {path:'makepayment/:id',component:MakePaymentComponent},
        {path:'cartpage',component:CartComponent},
        {path:'cartpage/:id',component:CartComponent},
        {path:'checkout',component:CheckoutComponent},
        
        // {path:'makepayment',component:MakePaymentComponent},
        // {path:'makepayment/:id',component:MakePaymentComponent},
    ])
  ],
  providers: [ProductviewComponent,AuthGuardService,RoleGuardServiceService, Product],
  bootstrap: [AppComponent]
})
export class AppModule { }
