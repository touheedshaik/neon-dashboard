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
  password: string = '';
  otp: string = '';

  step: number = 1;

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(){

  this.errorMessage='';
  this.isLoading=true;

  this.authService.login(this.email,this.password)
  .subscribe({
    next:(res:any)=>{

      this.isLoading=false;

      if(res.status==='success'){
        this.step=2;
      }
      else{
        this.errorMessage=res.message;
      }

    },
    error:()=>{
      this.isLoading=false;
      this.errorMessage='Server error';
    }
  });

}


  verifyOtp(){

    this.isLoading = true;

    this.authService.verifyLoginOtp(this.email,this.otp)
      .subscribe({
        next:(res:any)=>{

          this.isLoading = false;

          if(res.success){

            localStorage.setItem('member_id', res.member_id);
            this.router.navigate(['/dashboard']);

          }else{

            this.errorMessage = res.message;

          }

        },
        error:()=>{
          this.isLoading = false;
          this.errorMessage = 'Server error';
        }
      });

  }

}