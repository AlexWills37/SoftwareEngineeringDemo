import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-box',
  template: `
    <p class="title">
      Red Tide Dashboard
    </p>
  `,
  styleUrls: ['./title-box.component.css']
})
export class TitleBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
