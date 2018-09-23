import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FacebookLoginService } from '../facebook-login.service'
import { AuthService } from '../auth.service'
declare var window: any;

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit {

  facebookLogin(): void {
    this.fbs.login().then(resp=>{
      this.router.navigate(['fbadaccounts']);
    })
  }

  facebookLogout(): void{
    this.fbs.logout();
  }

  showAuthData(): void{
    console.log(this.auth.getSession())
  }

  constructor(private router: Router, private fbs: FacebookLoginService, private auth: AuthService) { 
    fbs.init()
  }
  ngOnInit() {
  }

}
