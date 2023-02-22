import { Component, OnInit } from '@angular/core';
import { DatabaseApiService } from '../services/database-api.service';
/**
 * Panel to display all of the youtube videos for our Red Tide website
 *
 * Uses youtube-video components to display videos. This component collects multiple youtube-video components
 * and organizes them.
 * See youtube-video
 *
 * For getting data from database: See services/database-api.service.ts (.getRecentYoutubeVideo)
 * For getting videos from youtube: See ../Tools/youtubeScraper.py
 * For putting videos in the database: See ../Tools/RedTideDB.py (.addYoutubeVideo)
 *
 * The videos are stored in our database after being processed by youtubeScraper.py
 *
 * We get three videos: One from all of youtube, described in our site as a "trending" red tide video,
 * one from Sarasota Memorial about health symptoms, and one from Mote Marine lab about red tide in general.
 * This component gets the video IDs for each video from our database, then passes them into the youtube-video component
 * in an embed link for an iframe (through the property videoSrc)
 *
 * The ID is stored in the typescript file as a string, then inserted into the videoSrc as follows:
 *    videoSrc="https://www.youtube.com/embed/{{videoId}}"
 * where videoId is the name of the field in the typescript file that has the video id to display.
 *
 * This component also passes in a videoDescription property, which is a string that will display above the youtube video
 * to give the video context.
 *
 * API Resources used in backend for this component:
 *   Accessing YouTube API to search for videos and retrieve them in json form:
 *   https://developers.google.com/explorer-help/code-samples#python
 *
 *   Specifically modifying YouTube API request for specific searches:
 *   https://developers.google.com/youtube/v3/docs/search/list
 *
 * @author Alex Wills
 */

@Component({
  selector: 'app-youtube-panel',
  template: `

  <div class="youtube">
    <div class="title"><p>Youtube Videos:<p></div>
    <div class='youtube-box'>
      <!-- This component has videoSrc, which should be an embed link to a video,
          and videoDescription, which is the text to display above the video. -->
    <app-youtube-video
        class='item'
        videoSrc="https://www.youtube.com/embed/{{trendingVideoId}}"
        videoDescription="Trending Red Tide Video (unverified source)"> </app-youtube-video>
      <app-youtube-video
        class='item'
        videoSrc="https://www.youtube.com/embed/{{symptomVideoId}}"
        videoDescription="Health Symptom Video (from Sarasota Memorial)"> </app-youtube-video>
      <app-youtube-video
        class='item'
        videoSrc="https://www.youtube.com/embed/{{informationVideoId}}"
        videoDescription="Informational Video (from Mote Marine Lab)"> </app-youtube-video>
    </div>
	</div>
  `,
  styleUrls: ['./youtube-panel.component.css']
})
export class YoutubePanelComponent implements OnInit {

  // Video IDs
  symptomVideoId: string = "";
  trendingVideoId: string = "";
  informationVideoId: string = "";

  constructor(private database: DatabaseApiService) { }

  ngOnInit(): void {

    // Get recent symptom video
    // This database service method takes in a parameter to specify the 'category' (specified by us in our database, not
    // by youtube) and returns a Promise with a JSON that contains a 'videoId' field containing the relevant video ID.
    this.database.getRecentYoutubeVideo("symptoms")
    .then( (response) => response.json())
    .then( (data) => {
      // The JSON returned by the fetch method has a 'videoId': [video ID] with the ID we want to pass into the youtube-video component
      this.symptomVideoId = data['videoId']
    })

    // Get recent trending video
    this.database.getRecentYoutubeVideo("trending")
    .then( (response) => response.json())
    .then( (data) => {
      this.trendingVideoId = data['videoId']
    })

    // Get recent informational video
    this.database.getRecentYoutubeVideo("information")
    .then( (response) => response.json())
    .then( (data) => {
      this.informationVideoId = data['videoId']
    })
  }

}
