import { Component, OnInit } from '@angular/core';
/**
 * Navigation bar to instantly scroll to different parts of the website.
 * Usage: <app-navigation-bar></app-navigation-bar>
 *
 * This component makes use of anchors and HTML href components that can quickly
 * move to an anchor on the page.
 *
 * NOTE: If you are modifying this code, for it to work properly, you must consdier the following:
 *    - To add a navigation button, create a new <app-navigation-button> </app-navigation-button>
 *    - Every <app-navigation-button> should have three properties:
 *        1: hrefId: string that begins with a '#' and matches an anchor on the page
 *        2: imagePath: string wiht the path for an image to display on the button
 *        3: altText: string with text to display if the image fails to load
 *    - The hrefId should begin with '#' and be followed by a unique name.
 *      Then on the main page, where you want the button to take you, you should have an anchor
 *      whose ID matches the hrefId without the '#'
 *        Example: if the button's hrefId = '#home', there should be a component on the main page
 *        <a id = 'home'></a>
 *
 * @author Alex Wills
 */

@Component({
  selector: 'app-navigation-bar',
  template: `
  <div>
    <div class="buttons">
      <!-- Buttons to navigate the page -->
    <!-- Home -->
      <app-navigation-button
      hrefId = '#home'
      imagePath = 'assets/home_icon.png'
      altText = 'Top of Page'>
    </app-navigation-button>

    <!-- Spotify podcasts -->
    <app-navigation-button
      hrefId='#spotify'
      imagePath = 'assets/spotify_icon.png'
      altText = 'Spotify Podcasts'></app-navigation-button>

      <!-- Historical Twitter data and recent tweets -->
    <app-navigation-button
      hrefId = '#twitter'
      imagePath = 'assets/twitter_icon.png'
      altText = 'Twitter Data'></app-navigation-button>

      <!-- Informational youtube videos -->
    <app-navigation-button
      hrefId='#youtube'
      imagePath = 'assets/youtube_icon.png'
      altText = 'Informational Videos'></app-navigation-button>

      <!-- Chatboard -->
    <app-navigation-button
    hrefId='#chatboard'
    imagePath = 'assets/chat_icon.png'
    altText = 'Chatboard'></app-navigation-button>


    </div>

	</div>

  `,
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
