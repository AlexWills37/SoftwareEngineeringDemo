import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubePanelComponent } from './youtube-panel.component';

describe('YoutubePanelComponent', () => {
  let component: YoutubePanelComponent;
  let fixture: ComponentFixture<YoutubePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
