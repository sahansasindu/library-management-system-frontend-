import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaterfooterComponent } from './staterfooter.component';

describe('StaterfooterComponent', () => {
  let component: StaterfooterComponent;
  let fixture: ComponentFixture<StaterfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaterfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaterfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
