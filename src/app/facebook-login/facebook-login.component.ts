import { Component, OnInit } from '@angular/core';
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
    console.log('calling login')
    this.fbs.login() 
  }

  facebookLogout(): void{
    this.fbs.logout();
  }

  showAuthData(): void{
    console.log(this.auth.getSession())
  }

  constructor(private fbs: FacebookLoginService, private auth: AuthService) { 
    fbs.init()
  }
  ngOnInit() {
  }

}
