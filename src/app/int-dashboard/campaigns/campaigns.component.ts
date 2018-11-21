import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  @Input() user: object;
  reviewing = false;
  allData: object;

  async reviewCampaign(cpId) {
    this.allData = await this.uds.getSatistics(cpId);
    this.reviewing = true;
  }

  constructor(private uds: UserDataService) { }

  ngOnInit() {
  }

}
