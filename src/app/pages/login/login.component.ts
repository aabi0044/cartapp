import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''

  }
  err
  data;
  constructor(private auth: AuthService, private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.user.email, this.user.password).then(res => {
      //get data from database
      this.api.getCustomer(res.user.uid).subscribe(resp => {
        //   if(resp){
          this.data = resp;
        
        /* if response available */
        localStorage.setItem('uid', res.user.uid);
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('type',this.data.type);
        localStorage.setItem('name',this.data.name);
        console.log('user Loged in')
        
        if(this.data.type === 'Seller'){ 
        this.router.navigate(['/seller']);
        }
         else{
           this.router.navigate(['/customer']);
         }
        //     }
        //     else  {
        //       localStorage.setItem('uid',res.user.uid);
        // localStorage.setItem('email',this.user.email);
        // this.router.navigate(['/customer']);
        // console.log('Customer Loged in')

        // }
      }


//     // else{
//       err=>{
//         this.err=err;
//         setTimeout(()=>this.err ='',3000);
//       }
//     }
// })
// })
      )
})}

}