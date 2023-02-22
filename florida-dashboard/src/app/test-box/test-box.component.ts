import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CellcountData } from '../interfaces/cellcount-data';
import { Tweet } from '../interfaces/tweet';
import { DatabaseApiService } from '../services/database-api.service';
/**
 * This component should not show up anywhere on the deployed website. It exists
 * for testing, as a way to display information on the website (for quick feedback and debugging)
 * without interfering with any other components.
 *
 * @author Everyone
 */
@Component({
  selector: 'app-test-box',
  template: `
    <p>
      test-box works!
    </p>
    <button
    (click)='this.filterSarasota()'> CLICK FOR SARASOTA?? </button>


    <!-- select.value (really input.value) contains the selected option -->
    <!-- When the value changes, filter the list by county based on the selected option -->
    <select
    (change)='filterCounty( getSelectValue($event) )' >

    <!-- Option for all counties -->
    <option value = 'All'>All Counties</option>

    <!-- Option for every county in this.counties list -->
    <option *ngFor='let county of counties'
    value = {{county}}>
      {{county}}
    </option>


    </select>

    <p>
      Test data:
      {{body}}
      {{link}}
    </p>
    <p *ngFor='let cell of cellsToShow'>
      {{cell.county}} what the beach: {{cell.location}}
    </p>


    <p> Tweets </p>
    {{tweetData}}
    <div *ngFor='let tweet of tweets'>
      <app-tweet
      [tweet]='tweet'></app-tweet>
    </div>

    <p> end of test </p>

  `,
  styleUrls: ['./test-box.component.css']
})
export class TestBoxComponent implements OnInit {

  data: string = '';
  headers: string[] = [];
  body: any;
  link: any;

  tweetData: string = " data not loaded";
  tweets: Tweet[] = [];

  cells: CellcountData[] = [];

  cellsToShow: CellcountData[] = [];

  counties = ["Sarasota", "Bay", "Brevard", "Broward", "Charlotte", "Citrus",
    "Collier", "Escambia", "Flagler", "Franklin", "Hillsborough", "Lee",
    "Levy", "Manatee", "Monroe", "Okaloosa", "Palm Beach", "Pasco",
    "Pinellas"];

  constructor(private database: DatabaseApiService) { }

  ngOnInit(): void {

    this.database.getTweets().then((response) => (response.json()))
    .then((json) => {
      this.tweetData = json.length + " total tweets";
      this.tweets[0] = json[0];
      this.tweets[1] = json[1];

      for(let i = 0; i < json.length && i < 10; i++){
        this.tweets[i] = json[i];
      }
    })
    .catch((reason) => {
      this.tweetData = "Fetching tweets failed :(\n" + reason;
    });
  }

  getData(resp: HttpResponse<any>){
    this.data = resp.body.body;
  }

  testShowDataFetch(){

    this.database.testNewApi()

    this.database.getMessages()
      .then(
      // Promise fulfilled, data delivered
        (value: any) => {
        this.body = value;
      },
      // Promise unfulfilled, something went wrong
      (reason: any) =>{
        this.body = "Oh no! Here's the error: " + reason;
      });
  }

  filterSarasota(){
    let newEntries = []
    let newIndex = 0;
    console.log("bruh");
    for(let i = 0; i < this.cells.length; i++){
      if(this.cells[i].county == "Sarasota"){
        newEntries[newIndex] = this.cells[i];
        newIndex++;
      }
    }
    this.cellsToShow = newEntries;
  }


  filterCounty(countyFilter: string){

    let newEntries = []
    let newIndex = 0;
    for(let i = 0; i < this.cells.length; i++){
      if(this.cells[i].county == countyFilter || countyFilter == "All"){
        newEntries[newIndex] = this.cells[i];
        newIndex++;
      }
    }
    this.cellsToShow = newEntries;
  }

  // https://angular.io/guide/event-binding-concepts
  // Getting value out of component
  getSelectValue(event: Event){
    return (event.target as HTMLInputElement).value;
  }
}
