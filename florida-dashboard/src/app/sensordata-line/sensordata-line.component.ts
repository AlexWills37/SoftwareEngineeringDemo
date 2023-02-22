import { Component, Input, OnInit, Output } from '@angular/core';
/**
 * Displays information from the sensor data in a user-friendly manner.
 * This component is used by sensordata to present multiple entries of sensor data.
 * To make this data easily readable, in the CSS file, the background color of each entry changes
 * based on the value of title, which is set to equal the level of abundance (how many cells per liter of red tide
 * algae there are).
 *
 * @author Ferris Whitney, Alex Wills
 */
@Component({
  selector: 'app-sensordata-line',
  template: `
  <!-- Set the title of the main div to equal the level of red tide, so that the css can make the color
    match the level. -->
    <div class='line'
    title={{level}}>
    {{location}}
    <br>
      <div class="indent">Algae count: {{level}} </div>
      <div class="indent">Date updated: {{date}}</div>
    </div>
  `,
  styleUrls: ['./sensordata-line.component.css']
})
export class SensordataLineComponent implements OnInit {
	@Input() date = "";
	@Input() location = "";
	@Input() level = "";
	@Input() source = "";
  constructor() { }

  ngOnInit(): void {
  }

}
