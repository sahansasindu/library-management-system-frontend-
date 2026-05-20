import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-categories',
  templateUrl: './book-categories.component.html',
  styleUrl: './book-categories.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class BookCategoriesComponent implements OnChanges {
  @Input() categories: { name: string, count: number, color: string, width: string }[] = [];

  totalCount = 0;
  donutSlices: {
    name: string;
    count: number;
    color: string;
    percentage: number;
    dashArray: string;
    dashOffset: number;
  }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories']) {
      this.calculateDonutSlices();
    }
  }

  private calculateDonutSlices(): void {
    this.totalCount = this.categories.reduce((sum, cat) => sum + cat.count, 0);

    let accumulatedPercentage = 0;
    const r = 50;
    const circumference = 2 * Math.PI * r;

    this.donutSlices = this.categories.map(cat => {
      const percentage = this.totalCount > 0 ? (cat.count / this.totalCount) : 0;
      const sliceLength = percentage * circumference;
      const strokeDashoffset = -accumulatedPercentage * circumference;

      accumulatedPercentage += percentage;

      return {
        name: cat.name,
        count: cat.count,
        color: cat.color,
        percentage: Math.round(percentage * 100),
        dashArray: `${sliceLength} ${circumference}`,
        dashOffset: strokeDashoffset
      };
    });
  }
}
