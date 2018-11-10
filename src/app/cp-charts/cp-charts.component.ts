import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cp-charts',
  templateUrl: './cp-charts.component.html',
  styleUrls: ['./cp-charts.component.css']
})
export class CpChartsComponent implements OnInit {

  @Input() statData: object;

  constructor() { }

  ngOnInit() {
  }

}
