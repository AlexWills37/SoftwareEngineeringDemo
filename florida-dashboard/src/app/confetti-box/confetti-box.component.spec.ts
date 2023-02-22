import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfettiBoxComponent } from './confetti-box.component';

describe('ConfettiBoxComponent', () => {
  let component: ConfettiBoxComponent;
  let fixture: ComponentFixture<ConfettiBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfettiBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfettiBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
