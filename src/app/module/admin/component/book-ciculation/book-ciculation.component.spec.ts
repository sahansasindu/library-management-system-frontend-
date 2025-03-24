import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCiculationComponent } from './book-ciculation.component';

describe('BookCiculationComponent', () => {
  let component: BookCiculationComponent;
  let fixture: ComponentFixture<BookCiculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCiculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookCiculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
