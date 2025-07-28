import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetardsAbsencesComponent } from './retards-absences.component';

describe('RetardsAbsencesComponent', () => {
  let component: RetardsAbsencesComponent;
  let fixture: ComponentFixture<RetardsAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetardsAbsencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetardsAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
