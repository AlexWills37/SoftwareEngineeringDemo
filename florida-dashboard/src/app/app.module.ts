import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestBoxComponent } from './test-box/test-box.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavigationButtonComponent } from './navigation-button/navigation-button.component';
import { YoutubeVideoComponent } from './youtube-video/youtube-video.component';
import { SafePipe } from './pipes/safe.pipe';
import { YoutubePanelComponent } from './youtube-panel/youtube-panel.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { TweetComponent } from './tweet/tweet.component';
import { ChatboardComponent } from './chatboard/chatboard.component';
import { ChatboardMessageComponent } from './chatboard-message/chatboard-message.component';
import { SensordataComponent } from './sensordata/sensordata.component';
import { SensordataLineComponent } from './sensordata-line/sensordata-line.component';
import { TitleBoxComponent } from './title-box/title-box.component';
import { SpotifyContainerComponent } from './spotify-container/spotify-container.component';
import { ConfettiBoxComponent } from './confetti-box/confetti-box.component';

@NgModule({
  declarations: [
    AppComponent,
    TestBoxComponent,
    NavigationBarComponent,
    NavigationButtonComponent,
    YoutubeVideoComponent,
    SafePipe,
    YoutubePanelComponent,
    BarGraphComponent,
    TweetListComponent,
    TweetComponent,
    ChatboardComponent,
    ChatboardMessageComponent,
    SensordataComponent,
    SensordataLineComponent,
    TitleBoxComponent,
    SpotifyContainerComponent,
    ConfettiBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
