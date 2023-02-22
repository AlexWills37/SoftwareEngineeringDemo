import { Component, OnInit } from '@angular/core';
import JSConfetti from 'js-confetti'
/**
 * Displays confetti when the user puts in the correct answer to a question.
 * Relies on the JSConfetti package to create the confetti visuals.
 * Uses: https://github.com/loonywizard/js-confetti
 *
 * Uses HTML input element to allow the user to type in a field
 * Uses Angular Event Binding to detect when the user types their answer,
 * and checks if the answer is correct anytime the answer changes. *
 *
 * @author Alex Wills
 */

@Component({
  selector: 'app-confetti-box',
  template: `
    <div class = 'box'>
      Join
      <!-- input checks the answer after any key is pressed, and after the answer is submitted -->
      <input
        (change)='checkAnswer( getValue($event) )'
        (keyup)='checkAnswer( getValue($event) )'>
      Club
    </div>
  `,
  styleUrls: ['./confetti-box.component.css']
})
export class ConfettiBoxComponent implements OnInit {

  // The correct answer for the user to receive confetti
  answer: string = "climbing";

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Create confetti on the screen using the JSConfetti package
   */
  confetti(){
    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti({
      confettiNumber: 500
    })
  }

  /**
   * Access the value of an input field
   * @param event javascript event whose target is an HTML Input Element
   * @returns the value of the input element (the text in the field)
   */
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  /**
   * Compares the user's answer to the correct answer, specified by the class.
   * Displays confetti if the answer is correct.
   *
   * @param answer the user's answer.
   */
  checkAnswer(answer: string){
    if (answer.toLowerCase() == this.answer) {
      this.confetti();
    }
  }
}
