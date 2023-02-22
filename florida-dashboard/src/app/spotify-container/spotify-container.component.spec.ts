import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyContainerComponent } from './spotify-container.component';

describe('SpotifyContainerComponent', () => {
  let component: SpotifyContainerComponent;
  let fixture: ComponentFixture<SpotifyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
