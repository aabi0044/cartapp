import { Component } from '@angular/core';
import{AuthService}from './services/auth/auth.service';
import{Router}from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cartapp';
constructor(private auth:AuthService,private route:Router){}

  logOut(){
   this.auth.logout();
   localStorage.clear();
  return  this.route.navigate(['/login']);
    
  }
}
