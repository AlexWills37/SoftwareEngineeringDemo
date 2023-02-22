import { Component, Input, OnInit } from '@angular/core';
/**
 * A button that can store an image or text, and which navigates to a different page/href when clicked
 * Usage: <app-navigation-button
 *        hrefId='#[anchorID]'
 *        imagePath='[imagePath]'
 *        altText='[alt text]'> </app-navigation-button>
 *
 * HTML allows for instantly moving to different parts of a website using anchors and href properites.
 * When you click on an anchor, it will take you to the href property (another webpage if you specify a link,
 * or another anchor if you specify an anchor's ID).
 *
 * This component makes a button with an image, and an invisible anchor that takes you to another anchor based on
 * what you specify as this component's hrefId property.
 * When you click on the button, it automatically clicks on the invisible anchor to take you to its destination.
 *
 * You should pass in the destination anchor's ID with a '#' sign.
 * If your destination is an anchor <a id = 'home'> </a>,
 * this component should be <app-navigation-button hrefId = '#home'> </app-navigation-button>
 *
 * @author Alex Wills
 */
@Component({
  selector: 'app-navigation-button',
  template: `

    <!-- When you click this, it clicks on the anchor object -->
    <button (click)="anchorRef.click()">

      <img [src]='this.imagePath'
           [alt]='this.altText'>

    </button>

    <!-- When you click on the anchor object, it goes to the specified link -->
    <a #anchorRef
    [href]='this.hrefId'></a>
  `,
  styleUrls: ['./navigation-button.component.css']
})
export class NavigationButtonComponent implements OnInit {

  // The value of href to go to when the button is clicked
  @Input() hrefId = "";

  // The image to display on the button
  @Input() imagePath = "";

  // Text to display if the image is not visible
  @Input() altText = "No image";

  constructor() { }

  ngOnInit(): void {
  }


}
