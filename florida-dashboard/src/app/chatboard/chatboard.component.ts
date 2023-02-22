import { Component, OnInit } from '@angular/core';
import { DatabaseApiService } from '../services/database-api.service';
import { HttpResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Fakemessagedata } from '../interfaces/fakemessagedata';
/*
Chatboard!
Displays messages from MongoDB and prints them nicely.
Takes input from the user to send messages.
The "Like" functionality is in the chatboard-message component.

message-container: Scrollable container of messages. Home to the chatboard-message components.
textboxes: Home to the textboxes. Used for inputs so on button press, the values will send.
app-chatboard-message: Chatboard message component. Handles getting data from flask server using database-api.

@author Ferris Whitney
*/
@Component({
  selector: 'app-chatboard',
  template: `
	<div class="chatboard-container">
	<p>Red Tide Chatboard:</p>
	<p class="subtext"> You can chat with people about red tide below.<p>
	<div class="message-container">
	
	<div *ngFor="let Fakemessagedata of values;">
		<div class="message">
	<p>
      
      {{Fakemessagedata.text}}
    </p>
	<div class="name">
	<p>
	Name: {{Fakemessagedata.name}} 
	</p>
	<p>
	Location: {{Fakemessagedata.location}}
	</p>
	</div>
	</div>
	</div>
	
	<app-chatboard-message index=0>
	</app-chatboard-message>
	<app-chatboard-message index=1>
	</app-chatboard-message>
	<app-chatboard-message index=2>
	</app-chatboard-message>
	<app-chatboard-message index=3>
	</app-chatboard-message>
	<app-chatboard-message index=4>
	</app-chatboard-message>
	<app-chatboard-message index=5>
	</app-chatboard-message>
	<app-chatboard-message index=6>
	</app-chatboard-message>
	<app-chatboard-message index=7>
	</app-chatboard-message>
	<app-chatboard-message index=8>
	</app-chatboard-message>
	<app-chatboard-message index=9>
	</app-chatboard-message>
	
	</div>
	<div class="textboxes">
	<p>
	Text:
	</p>
	<input type="text" id="1" #text class="messageTextBox" id="a">
	<p>
	Location:
	</p>
	<input type="text" id="2" #location id="b">
	<p>
	Name:
	</p>
	<input type="text" id="3" #name id="c">
	
	<button (click)="getValues(text.value, location.value, name.value, this.score)">Send</button>
	</div>
	<div>
	<p></p></div>
	</div>
	`,
  styleUrls: ['./chatboard.component.css']
})
export class ChatboardComponent implements OnInit {
	data: string = '';
	headers: string[] = [];
	body1: any;
	body2: any;
	text: string = '';
	jsonvalues: any;
	score: number = 0;
	values: Fakemessagedata[] = [];
	
	/*
	getValues()
	Executes when the "Send" button is clicked.
	Takes input from the textboxes: text, location, and string and sends them over to the flask server.
	Each textbox has a value after a # ex: #name. This declares the name of the value in the textbox.
	Takes the default score value of '0' and sends that as well.
	On button click, before refreshing the page, it creates a "fake message" which is not data from the backend but data from the user.
	It uses this fake message to make the chatboard seem more instant as it will instantly put up data that is typed in before refreshing the page.
	*/
	getValues(text:string, location:string, name:string, score:number){
		this.values.push({'text': text, 'location': location, 'name': name, 'score': this.score}); // Adds values from textbox into "Fake message"
		window.location.reload(); // Reloads page
		console.log(this.values);
		fetch("https://votesrq.com/messages/send?name="+name+"&location="+location+"&message="+text+"&score="+score); // Sends message data to flask server
	}

/*Leftover from when chatboard component handled message data*/
  constructor(private database: DatabaseApiService) { 
  this.database.getMessages()
    .then( (response) => (response.json()))
    .then( (json) => {
	this.jsonvalues = json;
	  
	  this.body1 = json[1].message;
	  this.body2 = json[2].message;
    });}
	

  ngOnInit(): void {
  }

}
