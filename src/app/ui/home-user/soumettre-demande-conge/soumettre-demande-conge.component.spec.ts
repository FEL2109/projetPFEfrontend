import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoumettreDemandeCongeComponent } from './soumettre-demande-conge.component';

describe('SoumettreDemandeCongeComponent', () => {
  let component: SoumettreDemandeCongeComponent;
  let fixture: ComponentFixture<SoumettreDemandeCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoumettreDemandeCongeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoumettreDemandeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
