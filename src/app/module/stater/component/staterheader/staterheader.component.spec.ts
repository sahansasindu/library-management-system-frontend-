import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaterheaderComponent } from './staterheader.component';

describe('StaterheaderComponent', () => {
  let component: StaterheaderComponent;
  let fixture: ComponentFixture<StaterheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaterheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaterheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
