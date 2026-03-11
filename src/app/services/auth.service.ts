import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginApi = 'https://360net.ac.nz/api/login.php';
  private verifyOtpApi = 'https://360net.ac.nz/api/verify-login-otp.php';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {

    return this.http.post<any>(this.loginApi,{
      email,
      password
    });

  }
  sendLoginOtp(email:string){
  return this.http.post(
    'https://360net.ac.nz/api/send-login-otp.php',
    { email }
  );
}
  verifyLoginOtp(email:string,otp:string){

    return this.http.post<any>(this.verifyOtpApi,{
      email,
      otp
    });

  }

}  