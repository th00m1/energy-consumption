import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyInfoComponent } from './energy-info.component';

describe('EnergyInfoComponent', () => {
  let component: EnergyInfoComponent;
  let fixture: ComponentFixture<EnergyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
