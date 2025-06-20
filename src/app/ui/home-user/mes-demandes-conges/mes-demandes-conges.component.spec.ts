import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDemandesCongesComponent } from './mes-demandes-conges.component';

describe('MesDemandesCongesComponent', () => {
  let component: MesDemandesCongesComponent;
  let fixture: ComponentFixture<MesDemandesCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesDemandesCongesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesDemandesCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
