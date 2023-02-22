import { Component, Input, OnInit } from '@angular/core';
import { DatabaseApiService } from '../services/database-api.service';
import { HttpResponse } from '@angular/common/http';
/*
Chatboard Message Component!
Displays messages from the database given a specific index!
Allows to "Like" a message.
Input: index,
When this component is created it is given an index value.
The index valu represents from the top how many messages down this component will display.
If the index value is 5, it will display the 6th message from the top.
Index[0] is the most recent message. Index[9] is the 10th most recent message.

@author Ferris Whitney
*/
@Component({
  selector: 'app-chatboard-message',
  template: `
  
	<div class="message">
	<p>
      
      {{jsonvalues[newindex].message}}
    </p>
	<div class="score">
	<p>
	{{jsonvalues[newindex].score}}
	</p>
	</div>
	<div class="name">
	<p>
	Name: {{jsonvalues[newindex].name}} 
	</p>
	<p>
	Location: {{jsonvalues[newindex].location}}
	</p>
	</div>
	<button (click)="increaseScore()">Like</button>
	<!-- <button (click)="decreaseScore()">Dislike</button> -->
	</div>
	
	
  `,
  styleUrls: ['./chatboard-message.component.css']
})
export class ChatboardMessageComponent implements OnInit {
	@Input() index = "";
	data: string = '';
	headers: string[] = [];
	body1: any;
	body2: any;
	text: string = '';
	jsonvalues: any;
	newindex: number = 0;
	
	/*
	IncreaseScore method.
	When the "Like" button is pressed, it takes the current score from jsonvalues and adds "1."
	Jsonvalues = all messages saved onto the backend saved as json.
	It then sends that +1 score value over to the flask backend using a fetch request.
	It sends the _id value (time) of the message that was liked and the new score value.
	*/
	increaseScore(){
		this.jsonvalues[this.index].score = parseInt(this.jsonvalues[this.index].score) + 1; // Sets the score value in jsonvalues to itself + 1.
		console.log(this.jsonvalues[this.index].score);
		
		// Sends fetch request to the backend containing the new score values, index, and time.
		fetch("https://votesrq.com/messages/updatescore?index="+this.index+"&score="+this.jsonvalues[this.index].score+"&time="+this.jsonvalues[this.index]._id);
	}
	
	/*
	DecreaseScore method. Same as increaseScore() however subtracts "1."
	If the dislike button is uncommented, this function is used.
	When the "Dislike" button is pressed, it takes the current score and subtracts "1."
	It then sends that -1 score value over to the flask backend using a fetch request.
	It sends the _id value (time) of the message that was liked and the new score value.
	*/
	decreaseScore(){
		this.jsonvalues[this.index].score = parseInt(this.jsonvalues[this.index].score) - 1;
		console.log(this.jsonvalues[this.index].score);
	}
	
	/*
	Gets all messages from the database when this component is created.
	Saves all messages from flask in json format into the jsonvalues variable.
	Jsonvalues then becomes all messages that are saved onto the backend.
	*/
	constructor(private database: DatabaseApiService) { 
	this.database.getMessages()
		.then( (response) => (response.json()))
		.then( (json) => {
			this.jsonvalues = json;
			this.newindex = parseInt(this.index);
			this.body1 = json[1].message;
			this.body2 = json[2].message;
    });}

	ngOnInit(): void {
	}

}
