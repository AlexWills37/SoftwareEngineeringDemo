import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensordataComponent } from './sensordata.component';

describe('SensordataComponent', () => {
  let component: SensordataComponent;
  let fixture: ComponentFixture<SensordataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensordataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensordataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
