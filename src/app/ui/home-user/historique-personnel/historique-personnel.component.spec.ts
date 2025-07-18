import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePersonnelComponent } from './historique-personnel.component';

describe('HistoriquePersonnelComponent', () => {
  let component: HistoriquePersonnelComponent;
  let fixture: ComponentFixture<HistoriquePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquePersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
