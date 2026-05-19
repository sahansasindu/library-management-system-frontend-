import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class RecentTransactionsComponent {
  @Input() transactions: any[] = [];
}
