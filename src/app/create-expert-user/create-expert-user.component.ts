import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-expert-user',
  templateUrl: './create-expert-user.component.html',
  styleUrls: ['./create-expert-user.component.css']
})
export class CreateExpertUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
