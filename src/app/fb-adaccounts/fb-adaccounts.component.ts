import { Component, OnInit } from '@angular/core';
import { FacebookLoginService } from '../facebook-login.service'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-fb-adaccounts',
  templateUrl: './fb-adaccounts.component.html',
  styleUrls: ['./fb-adaccounts.component.css']
})
export class FbAdaccountsComponent implements OnInit {

  adaccounts: Array<object>;
  selectedAdaccount:  String;

  getAdAccountsIds(): void {
    this.fbs.getAdAccounts().then(data=>{
      this.adaccounts=data;
      console.log(data)
    });
  }

  selectAdaccount(selectedId): void{
    console.log('Account Selected :', selectedId);
  }

  constructor(private fbs: FacebookLoginService, private auth: AuthService) { }

  ngOnInit() {
    this.getAdAccountsIds()
  }


}
