import { Component, OnInit } from '@angular/core';
import { Tweet } from '../interfaces/tweet';
import { DatabaseApiService } from '../services/database-api.service';


@Component({
  selector: 'app-tweet-list',
  template: `
  <div class="twitter-box">
  <div class="title">
      <p>
        Recent Tweets:
      </p>
    </div>
  <div class="twitter-container">


      <app-tweet *ngFor='let tweet of tweets'
        [tweet]='tweet'>
      </app-tweet>
	  </div>
    <div class="twitter-bottom">
      Updated daily at midnight EST.
    </div>
  </div>
  `,
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  tweets: Tweet[] = []

  constructor(private database: DatabaseApiService) { }

  private tweetLimit: number = 25;

  ngOnInit(): void {
    // this.loadPlaceholderTweets();


    this.database.getTweets()
    .then( (response) => (response.json()))
    .then( (json) => {

      for(let i = 0; (i < json.length && i < this.tweetLimit); i++){
        this.tweets[i] = json[i];
      }

    })
    .catch( (error) => {
      console.log("ERROR: Could not get tweets.")
      console.error(error);
    });

  }


  /**
   * This method should be deleted before the final release.
   * It only exists so that we can visualize tweets before connecting the database.
   */
  loadPlaceholderTweets(){
    this.tweets = [
      {
      '_id': '1516885210868027392',
      'created_at': '2022-04-20T21:03:11.000Z',
      'link': 'https://www.twitter.com/twitter/status/1516885210868027392',
      'text': 'You know when they cut those branches you can make compost out of them. They have to trim bushes. So that makes plant food right? Like Algae Eaters would clean up Red Tide? Its Algae? God gave you what you needed.',
      'likes': '10',
      'replies': '12',
      'retweets': '14'
        },
        {
          '_id': '111111',
          'created_at': '2022-04-20T21:03:11.000Z',
          'link': 'https://www.twitter.com/twitter/status/1516885210868027392',
          'text': 'testing 123',
          'likes': '10',
          'replies': '12',
          'retweets': '14'
        }
      ]
  }
}
