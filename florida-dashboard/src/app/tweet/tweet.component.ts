import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../interfaces/tweet';

@Component({
  selector: 'app-tweet',
  template: `
    <!-- Display tweet text -->
    <div class="tweet">
      <div class="tweet-text">
        <a target="_blank" href={{this.tweet.link}}>{{this.tweet.text}}</a>
      </div>
      <br>
      <div class="tweet-stats">
        <br>
      Likes: {{this.tweet.likes}}
      Retweets: {{this.tweet.retweets}}
      <br>
      Posted: {{ this.tweet.created_at}}
      </div>
    </div>


    `,
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet: Tweet;

  constructor() {
    this.tweet = {
      '_id': '0',
      'created_at': '0',
      'link': '',
      'text': 'ERROR: Tweet not found.',
      'replies': '10000',
      'likes': '1',
      'retweets': '999999'
      }
  }

  ngOnInit(): void {
  }

    /**
   * Converts from twitter's created_at date to a readable date
   * @param created_at twitter's created_at value, formated year-month-day
   */
     createdAtToDate(created_at: string): string {
      var components = created_at.split('-');
      var day = components[2].substring(0, 2);

      return components[1] + '/' + day + '/' + components[0];
    }

}
