import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spotify-container',
  template: `
  <div class="spotify">
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/73Bxsi1UB4V8d9u4sDLu3O?utm_source=generator" width="100%" height="380" frameBorder="0" 
	allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
	</div>
  `,
  styleUrls: ['./spotify-container.component.css']
})
export class SpotifyContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
