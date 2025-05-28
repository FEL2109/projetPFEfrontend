import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierJoursOfficielsAdminComponent } from './calendrier-jours-officiels-admin.component';

describe('CalendrierJoursOfficielsAdminComponent', () => {
  let component: CalendrierJoursOfficielsAdminComponent;
  let fixture: ComponentFixture<CalendrierJoursOfficielsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierJoursOfficielsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierJoursOfficielsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
