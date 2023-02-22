import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensordataLineComponent } from './sensordata-line.component';

describe('SensordataLineComponent', () => {
  let component: SensordataLineComponent;
  let fixture: ComponentFixture<SensordataLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensordataLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensordataLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
