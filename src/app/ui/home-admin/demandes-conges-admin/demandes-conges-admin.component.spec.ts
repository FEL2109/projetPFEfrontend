import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesCongesAdminComponent } from './demandes-conges-admin.component';

describe('DemandesCongesAdminComponent', () => {
  let component: DemandesCongesAdminComponent;
  let fixture: ComponentFixture<DemandesCongesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesCongesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandesCongesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
