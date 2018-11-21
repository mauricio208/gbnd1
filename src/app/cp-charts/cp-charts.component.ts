import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cp-charts',
  templateUrl: './cp-charts.component.html',
  styleUrls: ['./cp-charts.component.css']
})
export class CpChartsComponent implements OnInit {

  @Input() statData: object;
  alternateStat = true;
  fbAdBasicChartConfig: object;
  fbPageViewChartConfig: object;
  fbPageFansChartConfig: object;
  fbAdActionChartConfig: object;
  fbAdCostActionChartConfig: object;

  constructor() { }

  setAlternateStat(state) {
    this.alternateStat = state;
  }

  ngOnInit() {

    const adData = this.statData[0].gbndFbCampaigns[0].adAccountData;

    this.fbAdBasicChartConfig = {
      view: undefined,
      colorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C']
      },
      stats: [
        {
          'name': 'frequency',
          'value': adData.frequency
        },
        {
          'name': 'impressions',
          'value': adData.impressions
        },
        {
          'name': 'reach',
          'value': adData.reach
        }
      ]
    };

    console.log('HERE->',this.fbAdBasicChartConfig);

    this.fbPageFansChartConfig = {
      timeline: true,
      showXAxis: true,
      showYAxis: true,
      gradient: true,
      showLegend: true,
      showXAxisLabel: false,
      xAxisLabel: 'Date',
      showYAxisLabel: true,
      yAxisLabel: 'Page Likes',
      colorScheme: {
        domain: ['#A10A28', '#C7B42C', '#AAAAAA']
      },
      autoScale: false,
      stats: [{name: 'Page Likes', series: this.statData[0].gbndFbCampaigns[0].fbPageData.pageFans.values}]
    };

    this.fbPageViewChartConfig = {
      timeline: true,
      showXAxis: true,
      showYAxis: true,
      gradient: true,
      showLegend: true,
      showXAxisLabel: false,
      xAxisLabel: 'Date',
      showYAxisLabel: true,
      yAxisLabel: 'Views',
      colorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      },
      autoScale: false,
      stats: [{name: 'Page Views', series: this.statData[0].gbndFbCampaigns[0].fbPageData.pageViews.values}]
    };

    this.fbAdActionChartConfig = {
      showXAxis : true,
      showYAxis : true,
      gradient : false,
      showLegend : true,
      showXAxisLabel : true,
      xAxisLabel : 'Action Type',
      showYAxisLabel : true,
      yAxisLabel : 'Quantity',
      colorScheme : {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      },
      stats: adData.actions
    };

    this.fbAdCostActionChartConfig = {
      showXAxis : true,
      showYAxis : true,
      gradient : false,
      showLegend : true,
      showXAxisLabel : true,
      xAxisLabel : 'Action Type',
      showYAxisLabel : true,
      yAxisLabel : 'Cost',
      colorScheme : {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      },
      stats: adData.cost_per_action_type
    };

  }

}
