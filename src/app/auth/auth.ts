import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent {

  email: string = '';
  otp: string = '';

  step: number = 1;

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.email || this.email.trim() === '') {
      this.errorMessage = "Please enter your email";
      return;
    }

    if (!emailPattern.test(this.email)) {
      this.errorMessage = "Please enter a valid email address";
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.sendLoginOtp(this.email)
      .subscribe({
        next: (res:any) => {

          this.isLoading = false;

          if(res.status === 'success'){

            this.step = 2;   // move to OTP screen
            this.otp = '';

          } else {

            this.errorMessage = res.message;

          }

        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = "Server error";
        }
      });

  }


  verifyOtp(){

    if(!this.otp || this.otp.length !== 6){
      this.errorMessage = "Enter valid OTP";
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.verifyLoginOtp(this.email,this.otp)
      .subscribe({
        next:(res:any)=>{

          this.isLoading = false;

          if(res.success){

            localStorage.setItem('member_id', res.member_id);
            this.router.navigate(['/dashboard']);

          }else{

            this.errorMessage = res.message || "Invalid OTP";

          }

        },
        error:()=>{
          this.isLoading = false;
          this.errorMessage = 'Server error';
        }
      });

  }

}