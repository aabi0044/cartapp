import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router';
import{AuthService }from '../../services/auth/auth.service';
import{ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user={
    name:'',
    email:'',
    password:'',
    type:''

}
err
constructor(private auth: AuthService,private api:ApiService ,private router:Router) { }

ngOnInit() {
}

signup(){
this.auth.signUp(this.user.email, this.user.password).then(res=>{
 //get data from database
this.api.createCustomer(res.user.uid,this.user).then(resp=>{
localStorage.setItem('uid',res.user.uid);
localStorage.setItem('email',this.user.email);
localStorage.setItem('name',this.user.name);
localStorage.setItem('type',this.user.type);
this.router.navigate(['/login']);
          
      })
     });

  }
 }