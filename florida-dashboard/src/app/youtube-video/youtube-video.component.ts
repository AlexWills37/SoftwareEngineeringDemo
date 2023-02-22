import { Component, Input, OnInit } from '@angular/core';
/**
 * Displays a single youtube video in an iframe, along with text above the video to give it context.
 *
 * Mostly just uses Angular Property Binding to allow for youtube-panel to pass in the relevant information about
 * the video.
 * See youtube-panel
 *
 * @author Alex Wills
 */

@Component({
  selector: 'app-youtube-video',
  template: `
  <!-- This div is a flexbox made to display items vertically, and centered horizontally -->
  <div class="youtube">

    <!-- The context and the iframe both have the 'item' class for the flexbox -->

    <!-- Description of video to provide context -->
    <div class='item'> {{videoDescription}}</div>

    <!-- iframe with the youtube video -->
    <iframe class='item'
    width="300" height="168"
      [src]='this.videoSrc | safe'
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
	</div>
  `,
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {

  @Input() videoSrc = "";
  @Input() videoDescription = "";

  constructor() { }

  ngOnInit(): void {
  }

}
