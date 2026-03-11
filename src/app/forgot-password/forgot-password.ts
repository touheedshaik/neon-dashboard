import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {

  email: string = '';
  otp: string = '';
  newPassword: string = '';

  errorMessage: string = '';
  message: string = '';

  step: number = 1;
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  sendOtp() {

    if (!this.email || this.email.trim() === '') {
      this.errorMessage = "Please enter your email";
      return;
    }

    this.errorMessage = '';

    this.authService.sendLoginOtp(this.email).subscribe({
      next: (res:any) => {

        if(res.status === 'success'){
          this.step = 2;
        } else {
          this.errorMessage = res.message;
        }

      },
      error: () => {
        this.errorMessage = "Server error";
      }
    });

  }

  verifyOtp() {

    this.http.post<any>(
      'https://360net.ac.nz/api/verify-otp.php',
      { email: this.email, otp: this.otp }
    ).subscribe(res => {

      if (res.success) {
        this.step = 3;
        this.message = '';
      } else {
        this.message = res.message;
      }

    });

  }

  resetPassword() {

    this.http.post<any>(
      'https://360net.ac.nz/api/reset-password.php',
      { email: this.email, password: this.newPassword }
    ).subscribe(res => {

      if (res.success) {
        alert('Password changed successfully');
        this.router.navigate(['/']);
      } else {
        this.message = res.message;
      }

    });

  }

}