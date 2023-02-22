// Service to connect to mongo db to communicate with the database
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Tweet } from '../interfaces/tweet';
/**
 * Injectable angular service to manage all of the requests to our backend.
 *
 * This service has a private backendApiEndpoint field to allow for quick modification of our backend endpoint,
 * in case we change servers or for any reason the domain of our backend server changes.
 *
 * Backend requests use javascript's fetch method, which makes an http request to a website and returns a promise.
 * All methods from this class will return a Promise object, which must be properly handled to do anything.
 *
 * To use this service, first inject it into the constructor of the Angular component you are using this with.
 * You can do that like this:
 *  constructor(private database: DatabaseApiService) {}
 * "database" can be any name. It is how you will access the methods in this service.
 * You must make sure that DatabaseService is imported at the top of the file:
 *  import { DatabaseApiService } from '../services/database-api.service';
 *
 * Then in the ngOnInit method, or in any method, you can call any of the methods in this service with:
 *  this.database.[methodName]()
 *  .then( (response) => (response.json()) )
 *  .then( (json) => {
 *    <how you want to use the information>
 *  })
 *  .catch( (error) => { console.log("Error: " + error); } );
 *
 * If you are unfamiliar with javascript and Promise objects, I will unpack them here:
 *  (all of my knowledge of this comes from https://www.javascripttutorial.net/javascript-fetch-api/)
 *  the fetch method, and by extension the methods in this service, return an object of type Promise.
 *  This is because it takes time to retrieve the information from the backend and cannot immediately return the response.
 *  To handle a promise, you can use the .then method, which will happen once the Promise actually receives the data from our
 *  backend.
 *  .then takes one parameter: a callback function with one parameter of its own.
 *  A callback function is just a function that you pass as a parameter into another function.
 *  In my examples, I use special notation to define the function in the parameter, instead of writing a function
 *  somewhere else in the code and passing it in by name.
 *  In the first .then:
 *    (response) is where I name the parameters. In this case, there is just one parameter. You can name it anything,
 *      but I choose to name it response.
 *    => separates the paramters from the function itself and is part of the special notation.
 *    (response.json()) uses some more shorthand. It is short for:
 *      { return response.json(); }. This shorthand can be used when you are making a function that simply returns
 *      a value in one line.
 *      response.json() gets the response from the fetch method in json form. Unfortunately, this returns another Promise
 *      object, so we must use another .then
 *  In the second .then:
 *    (json): this time, because we receive a json object from the previous .then, I named this parameter json
 *    => { <function logic> } is where we can finally take the json information from our backend and do stuff with it.
 *      As an example:
 *      {
 *        this.tweet0 = json[0];
 *        this.tweet1 = json[1];
 *      }
 *      Could be used to obtain tweets from the json, if the json has a list of tweets.
 *  If something goes wrong, and the program does not receive information from the Promise, it will move to the
 *  .catch at the end, if there is one. .catch is like .then, except the parameter for the callback funciton
 *   is an error of some kind.
 *
 * NOTE: I have found in my experience that code after a .then() statement does not actually execute.
 *  To deal with this, I try to only use one method from this service in any given component.
 *
 * @author Alex Wills
 */

@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService {

  private backendApiEndpoint = 'https://votesrq.com'
  // private backendApiEndpoint = 'http://172.16.8.119:3000';


  constructor(private http: HttpClient) { }


  /**
   * Retrieves frequency data for tweets/month about red tide from the database
   * @returns the historical twitter data, formatted for Google Chart
   */
  getHistoricalTwitterData(): Promise<any>{
    return fetch(this.backendApiEndpoint + '/api/v1/redtide/tweets/history/frequency', {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
      }
    })
  }

  /**
   * Test function to see if the javascript fetch method works
   * @returns all tweets from our database
   */
  testNewApi(){

    return fetch(this.backendApiEndpoint + '/api/v1/redtide/tweets/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*'
      }
    });
  }

  /**
   * Retrieves the most recent video in our database matching the specified category
   * (the video most recently chosen by our backend)
   * @param category the category of video (symptoms, awareness, prevention)
   * @return Promise with a JSON that has a 'videoId' key with the youtube video's ID.
   */
  getRecentYoutubeVideo(category: string) {
    return fetch(this.backendApiEndpoint + '/api/v1/redtide/youtube?category=' + category, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*'
      }
    });
  }
  
  /*
  Retrieves all messages from the flask backend.
  @return All messages from backend sorted by time.
  */
  getMessages(): Promise<any>{
    return fetch(this.backendApiEndpoint + '/messages/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
      }
    })
  }

  /**
   * Retrives the current cell count information in our database.
   * To get the data, use .then() to get the json from the response,
   * then use another .then() to index into the json and access ['cellCountList']
   * @returns Javascript promise containing a json dictionary with a key 'cellCountList'
   * that has a list of entries from our database.
   */
  getCellCountByLocation() {
    return fetch(this.backendApiEndpoint + '/api/v1/redtide/cellcounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*'
      }
    });
  }

  /**
   * Fetches all of the Tweets stored in our database.
   * @returns A promise with a JSON object that has a list of every tweet in the database, sorted by date and time.
   */
  getTweets(){
    return fetch(this.backendApiEndpoint + '/api/v1/redtide/tweets/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*'
      }
    });
  }
}
