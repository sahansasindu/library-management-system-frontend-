import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookresavationComponent } from './bookresavation.component';

describe('BookresavationComponent', () => {
  let component: BookresavationComponent;
  let fixture: ComponentFixture<BookresavationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookresavationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookresavationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
