import { Component } from '@angular/core';
/**
 * Root component containing the overall structure of the website
 */
@Component({
  selector: 'app-root',
  template:`
	<!-- This anchor is just a reference to the top of the page -->
    <a id = 'home'></a>



	<div class="containercontainer">
	<app-title-box></app-title-box>
	<div class="navbarorder">
    <!-- Navigation bar to stay at side of screen -->
    <app-navigation-bar></app-navigation-bar>
	</div>

	<div class="container">

	<div class="text">
    <p>
      Red tide, a harmful algae bloom that regularly occurs on the coasts of Florida, creates toxic
      conditions that negatively impact the environment, marine animals, and human health. It can ruin
      beach days and endanger animals that call the Florida coasts their home. This dashboard is a collection
      of updated information to help you stay up-to-date on the current status of red tide in Florida.
    </p>
	</div>
	<div class="leftrightcontainercontainer">
	<a id = 'twitter'></a>
    <!-- Put twitter content right under this anchor -->
	<div class="leftcontainer">
	<app-sensordata></app-sensordata>
	<app-tweet-list></app-tweet-list>
	</div>

    <!-- Put spotify content right under this anchor -->
	<a id = 'spotify'></a>

	<div class="rightcontainer">
	<app-spotify-container></app-spotify-container>
    <app-bar-graph></app-bar-graph>
	</div>
	</div>

	<!-- Put youtube content right under this anchor -->
	<a id = 'youtube'></a>
    <app-youtube-panel></app-youtube-panel>

    <app-chatboard></app-chatboard>
    <a id = 'chatboard'></a>

	</div>

	</div>

  <!-- Secret confetti to promote climbing club -->
  <app-confetti-box></app-confetti-box>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'florida-dashboard';
  getValues(text: string, location:string , item:string ){
	console.log(text)
	}
}
