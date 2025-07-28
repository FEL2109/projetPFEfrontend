import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagerieRhComponent } from './messagerie-rh.component';

describe('MessagerieRhComponent', () => {
  let component: MessagerieRhComponent;
  let fixture: ComponentFixture<MessagerieRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagerieRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagerieRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
