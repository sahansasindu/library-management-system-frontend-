import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-categories',
  templateUrl: './book-categories.component.html',
  styleUrl: './book-categories.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class BookCategoriesComponent {
  @Input() categories: { name: string, count: number, color: string, width: string }[] = [];
}
