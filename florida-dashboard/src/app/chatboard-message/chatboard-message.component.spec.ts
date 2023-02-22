import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboardMessageComponent } from './chatboard-message.component';

describe('ChatboardMessageComponent', () => {
  let component: ChatboardMessageComponent;
  let fixture: ComponentFixture<ChatboardMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatboardMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatboardMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
