import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauDeBordUserComponent } from './tableau-de-bord-user.component';

describe('TableauDeBordUserComponent', () => {
  let component: TableauDeBordUserComponent;
  let fixture: ComponentFixture<TableauDeBordUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauDeBordUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauDeBordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
