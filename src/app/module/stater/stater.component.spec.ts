import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaterComponent } from './stater.component';

describe('StaterComponent', () => {
  let component: StaterComponent;
  let fixture: ComponentFixture<StaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
