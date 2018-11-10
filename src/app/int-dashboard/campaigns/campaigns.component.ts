import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  @Input() user: object;
  allData: object;

  async reviewCampaign(cpId) {
    this.allData = await this.uds.getSatistics(cpId);
    console.log(this.allData);
  }

  constructor(private uds: UserDataService) { }

  ngOnInit() {
  }

}
