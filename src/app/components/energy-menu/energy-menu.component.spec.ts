import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyMenuComponent } from './energy-menu.component';

describe('EnergyMenuComponent', () => {
  let component: EnergyMenuComponent;
  let fixture: ComponentFixture<EnergyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
