import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { DatabaseApiService } from '../services/database-api.service';

/**
 * Bar Graph for displaying frequency of historical Red Tide Tweets over time
 * Usage: <app-bar-graph></app-bar-graph>
 *
 * This component uses pre-formatted data from DatabaseApiService and the Google Chart wrapper.
 * Data is formatted by ../Tools/historicalTweetAnalyzer.py.
 * Data is stored in the database in ../Tools/RedTideDB.py (.addHistoricalData)
 * Data is retrieved by services/database-api.service.ts (.getHistoricalTwitterData)
 *
 * Google Chart accepts data as a list of lists. Each list is a data point, where the first element is the
 * x-value and the second is the y-value.
 * For example:
 *  [
 *    [x1, y1],
 *    [x2, y2],
 *    [x3, y3]
 *  ]
 *
 * From historicalTweetAnalyzer.py, the x values are the different months represented by the data, and the
 * y values are the number of Tweets about Red Tide collected in that month.
 *
 * This google chart is a bar graph, making it easy to compare the number of tweets that were collected in different months.
 *
 * Angular property binding is used to pass in the data and formatting information into the google-chart component.
 *
 * Data comes from https://github.com/tbep-tech/red-tide-twitter,
 * which has a CSV file collected by Professor Skripnikov
 *
 * @author Alex Wills
 */

// For information on how to change properties of the chart,
// see https://github.com/FERNman/angular-google-charts
// (in particular look at the Readme file)

@Component({
  selector: 'app-bar-graph',
  template: `
	<div class="div">
    <!-- Uses google chart wrapper -->
    <google-chart #chart
      title="Total Tweets about red tide over time"
      [type]="this.chartType"
      [data]="this.tweetFrequency"
      [width]="this.myWidth"
      [height]="this.myHeight"
      [dynamicResize]=true

      ></google-chart>
	  </div>
  `,
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit {

  chartType = ChartType.ColumnChart;

  // Width and height of chart
  myWidth = 450;
  myHeight = 500;

  // List of lists containing data for google chart
  tweetFrequency = [];

  constructor(private database: DatabaseApiService) { }

  ngOnInit(): void {
    // Data comes from our database, and is already formatted to work with google charts
    this.database.getHistoricalTwitterData().then((response) => response.json())
    .then((data) => {
      this.tweetFrequency = data;
    });
  }

}
