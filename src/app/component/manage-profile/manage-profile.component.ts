import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export class ManageProfileComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  @Output() profileSubmit = new EventEmitter<any>();

  onSubmit(updateprofileForm: NgForm) {
    if (updateprofileForm.valid) {
      if (this.password !== this.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }
      this.passwordMismatch = false;
      this.profileSubmit.emit({ email: this.email, password: this.password });
    }
  }
}
