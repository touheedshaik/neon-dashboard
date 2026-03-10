
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {

  email = '';
  otp = '';
  newPassword = '';
  step = 1; // 1=email, 2=otp, 3=new password
  message = '';
  loading: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  sendOtp() {
  this.http.post<any>(
    'https://360net.ac.nz/api/send-otp.php',
    { email: this.email },
  ).subscribe(res => {
    if (res.success) {
      this.step = 2;
      this.message = 'OTP sent to your email';
    } else {
      this.message = res.message;
    }
    console.log("SEND OTP CLICKED");
  });
}

verifyOtp() {
  this.http.post<any>(
    'https://360net.ac.nz/api/verify-otp.php',
    { email: this.email, otp: this.otp },
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
    { email: this.email, password: this.newPassword },
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