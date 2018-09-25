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
  adaccountSelected:  Boolean;
  campaignData: Array<object>;
  spinnerOn: Boolean;

  getAdAccountsIds(): void {
    this.spinnerOn=true;
    this.fbs.getAdAccounts().then(data=>{
      this.spinnerOn=false;
      this.adaccounts=data;
      console.log(data)
    });
  }

  selectAdaccount(selectedId): void{
    console.log('Account Selected :', selectedId);
    this.spinnerOn=true;
    this.adaccountSelected=true;
    this.fbs.getCampaignsData(selectedId).then(data=>{
      console.log(data);
      this.campaignData=data
      this.spinnerOn=false;
    });
  }

  selectAdacAgain():void{
    this.adaccountSelected=false;
    this.campaignData=null;
  }

  constructor(private fbs: FacebookLoginService, private auth: AuthService) { }

  ngOnInit() {
    this.getAdAccountsIds()
    this.adaccountSelected = false;
  }


}
