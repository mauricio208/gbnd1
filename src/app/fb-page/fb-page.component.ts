import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { FacebookLoginService } from '../facebook-login.service';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-fb-page',
  templateUrl: './fb-page.component.html',
  styleUrls: ['./fb-page.component.css']
})
export class FbPageComponent implements OnInit {
  fbPages: object;
  pageSelected: object;

  getFbPages(): void {
    this.fbs.getFbPages().then(data => {this.fbPages = data; });
  }

  dataToSession(): void {
    this.auth.addToSession({fbpageSelected: this.pageSelected});
  }
  
  continue(): void {
    this.router.navigate(['fbadaccounts']);
    this.dataToSession();
  }

  constructor(private router: Router, private fbs: FacebookLoginService, private auth: AuthService) { }

  ngOnInit() {
    this.getFbPages();
  }
}
