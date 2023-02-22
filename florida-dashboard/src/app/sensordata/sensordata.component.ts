import { Component, OnInit } from '@angular/core';
import { CellcountData } from '../interfaces/cellcount-data';
import { DatabaseApiService } from '../services/database-api.service';
/**
 * Collect, filter, and display the sensor data, representing the amount of Red Tide (cells per liter) found
 * at different beaches.
 * On the typescript side, cell count data is stored by each beach using the CellcountData interface
 * (See interfaces/cellcount-data.ts), and it is displayed with the Sensordata-Line component
 * (See sensordata-line/)
 *
 * The data comes from Florida Fish and Wildlife Conservation Commission-Fish and Wildlife Research Institute
 * Link to source's website: https://myfwc.com/research/redtide/monitoring/database/
 * Link to how the source presents their data to the public: https://myfwc.maps.arcgis.com/apps/View/index.html?appid=87162eec3eb846218cec711d16462a72
 *
 * Every beach is stored in an array holding all of the data. The beaches are sorted by the backend server by date
 * and county, so that all beaches in a given county are grouped together, with the most recent data from each county
 * appearing before the older data.
 *
 * When the component gets all of the data, it makes a list of all the counties represented by iterating through the data
 * and recording any new counties in a new list. This list of counties is used to make a dropdown filter that allows
 * the user to sort the data by county. On creation, all of the data is also copied into a separate list to display.
 *
 * There are two lists: a list of all of the data, and a list of the filtered data to display. By keeping a list of all of
 * the data, we can bring back data that was previously filtered out witout needing to make a request to the backend.
 *
 * Any time the user changes the filter, the list of data to show (not the list of all data) is completely rebuilt.
 * This is done by iterating through the list of all data, and copying over only the data that is from the county specified
 * by the filter. If "all counties" is selected, it will copy over all of the data.
 *
 * Because the sensordata-line components change color based on how much red tide they report, this component
 * also contains an image for a color-key to inform the user what different colored entries mean.
 *
 * @author Alex Wills
 */
@Component({
  selector: 'app-sensordata',
  template: `
  <div class="container">
    <div class="title">
      <img src="assets/CellCountKey.png"
      width=206px
      height=166px>
      <!-- Context for sensor data -->
      <p> Sensor Data from Florida Fish and Wildlife Conservation Commission-Fish and Wildlife Research Institute </p>
      <p> This data represents how many cells of red tide (per liter) were found at different beaches </p>

      <!-- Dropdown to choose county -->
      Filter:
      <select
      (change)='filterCounty( getSelectValue($event) )' >
        <option value = "All">All Counties</option>

        <option *ngFor='let county of availableCounties'
        value = {{county}}>
        {{county}}
        </option>

      </select>
    </div>

    <!-- All of the filtered sensor data -->
    <app-sensordata-line *ngFor='let beachData of dataToShow'
      [class]='beachData.abundance'
      [date]='beachData.date'
      [location]='beachData.location'
      [level]='beachData.abundance'
      [source]='beachData.source'  >
    </app-sensordata-line>


	</div>
  `,
  styleUrls: ['./sensordata.component.css']
})
export class SensordataComponent implements OnInit {

  // This is all of the sensor data from our database
  allDataRows: CellcountData[] = [];

  // This is the sensor data to show from our database
  dataToShow: CellcountData[] = [];

  // This is the list of all counties represented in our dataset
  availableCounties: string[] = [];

  constructor(private database: DatabaseApiService) { }

  ngOnInit(): void {

    // Get the sensor data
    this.database.getCellCountByLocation()
    .then( (response) => (response.json()))
    .then( (json) => {

      // Get all of the sensor data, then filter to show all counties
      this.allDataRows = json.cellCountList;
      this.filterCounty("All");

      this.availableCounties = this.getAvailableCounties();
    })
    .catch( (error) => {
      console.log("ERROR: Could not get sensor data.")
      console.error(error);
    });

  }


  /**
   * Rebuild this.dataToShow so that it only has data from the chosen county.
   * Filters data from this.allDataRows into this.dataToShow, so that this method
   * can be called again with a different filter to bring back hidden data.
   *
   * @param countyFilter the name of the county to view, or "All" if the data should be unfiltered.
   */
  filterCounty(countyFilter: string){

    let newEntries = []
    let newIndex = 0;

    // Copy the entry to the new list if the county matches the filter, or if the filter is "All".
    for(let i = 0; i < this.allDataRows.length; i++){
      if(this.allDataRows[i].county == countyFilter || countyFilter == "All"){
        newEntries[newIndex] = this.allDataRows[i];
        newIndex++;
      }
    }
    this.dataToShow = newEntries;
  }

  // https://angular.io/guide/event-binding-concepts
  // Getting value out of component
  /**
   * Returns the value of the input html element this is called from.
   * To use with event binding, inside of the input tag,
   *  you could write:
   * (change)=' getSelectValue( $event ) '
   * which will call this method andn return the value of the input element.
   *
   * You will likely use this in combination with other methods, such as:
   * (change)='filterCounty( getSelectValue($event) )'
   * which will pass the input value into the filterCounty method
   *
   * @param event event from html input element.
   * @returns the value of this html input element
   */
  getSelectValue(event: Event){
    return (event.target as HTMLInputElement).value;
  }

  /**
   * Searches through this.allDataRows to collect all of the unique counties in the array.
   *
   * NOTE: This method is optimized in a way that only works if this.allDataRows are already
   * sorted alphabetically by the element's counties.
   * If two entries from the same county are separated by an entry from a different county, the
   * first county will appear twice in the returned list of this method.
   *
   * @returns List of all unique counties in this.allDataRows (our dataset)
   */
  getAvailableCounties(): string[] {
    let counties: string[] = [];

    // To optimize this method for O(N) time we will iterate through all of the entries,
    // only adding the county to our list if it is different from the previous entry.
    let previousCounty: string = "";

    for (let i = 0; i < this.allDataRows.length; i++){
      if (this.allDataRows[i].county != previousCounty){
        counties.push(this.allDataRows[i].county);
        previousCounty = this.allDataRows[i].county;
      }
    }

    return counties;
  }

}
