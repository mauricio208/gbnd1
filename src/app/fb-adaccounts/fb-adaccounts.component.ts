import { Component, OnInit } from '@angular/core';
import { FacebookLoginService } from '../facebook-login.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-fb-adaccounts',
  templateUrl: './fb-adaccounts.component.html',
  styleUrls: ['./fb-adaccounts.component.css']
})
export class FbAdaccountsComponent implements OnInit {
  adaccounts: Array<object>;
  adaccountSelected:  Boolean;
  campaignData: Boolean;
  spinnerOn: Boolean;

  back(): void {
    this.location.back();
  }

  continue(): void {
    this.router.navigate(['payment']);
  }

  getAdAccountsIds(): void {
    this.spinnerOn = true;
    this.fbs.getAdAccounts().then(data => {
      this.spinnerOn = false;
      this.adaccounts = data;
    });
  }

  selectAdaccount(selectedId): void {
    this.spinnerOn = true;
    this.adaccountSelected = true;
    this.fbs.getCampaignsData(selectedId).then(data => {
      if (data.length > 0) {
        this.dataToSession(selectedId);
        this.continue();
      } else {
        this.campaignData = false;
      }
      this.spinnerOn = false;
    });
  }

  dataToSession(adacId): void {
    this.auth.addToSession({adaccountSelected: adacId});
  }


  selectAdacAgain(): void {
    this.adaccountSelected = false;
    this.campaignData = true;
    this.spinnerOn = false;
  }

  constructor(private location: Location, private router: Router, private fbs: FacebookLoginService, private auth: AuthService) { }

  ngOnInit() {
    this.getAdAccountsIds();
    this.adaccountSelected = false;
    this.campaignData = true;
  }

}
