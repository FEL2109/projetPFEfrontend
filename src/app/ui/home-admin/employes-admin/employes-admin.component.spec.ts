import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesAdminComponent } from './employes-admin.component';

describe('EmployesAdminComponent', () => {
  let component: EmployesAdminComponent;
  let fixture: ComponentFixture<EmployesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
