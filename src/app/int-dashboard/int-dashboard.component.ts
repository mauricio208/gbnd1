import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-int-dashboard',
  templateUrl: './int-dashboard.component.html',
  styleUrls: ['./int-dashboard.component.css']
})
export class IntDashboardComponent implements OnInit {

  private users: Array<object>;
  selectedUser: object;

  async getUsers() {
    this.users = await this.uds.getUsers(5);
  }

  async selectUser(user) {
    this.selectedUser = user;
  }

  constructor(private uds: UserDataService, private auth: AuthService) { }

  ngOnInit() {
    this.getUsers().then(() => console.log('theSession: ', this.users[0])

    );
  }

}
