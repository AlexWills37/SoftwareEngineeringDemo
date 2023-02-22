import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBoxComponent } from './test-box.component';

describe('TestBoxComponent', () => {
  let component: TestBoxComponent;
  let fixture: ComponentFixture<TestBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
