import { Component, OnInit } from '@angular/core';
import { FacebookLoginService } from '../facebook-login.service'
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

  constructor(private fbs: FacebookLoginService) { 
    fbs.init()
  }
  ngOnInit() {
  }

}
