import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierJoursOfficielsComponent } from './calendrier-jours-officiels.component';

describe('CalendrierJoursOfficielsComponent', () => {
  let component: CalendrierJoursOfficielsComponent;
  let fixture: ComponentFixture<CalendrierJoursOfficielsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierJoursOfficielsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierJoursOfficielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
