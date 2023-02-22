import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
	FormsModule
  ],
  template:`<p>
	Chatboard Message Here:
	<input type="text" id="input" [(ngModel)] = "text"></p>`
})
export class ChatboardInputModule { }
