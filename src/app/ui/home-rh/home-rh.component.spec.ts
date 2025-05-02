import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRhComponent } from './home-rh.component';

describe('HomeRhComponent', () => {
  let component: HomeRhComponent;
  let fixture: ComponentFixture<HomeRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
