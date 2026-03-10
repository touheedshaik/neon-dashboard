import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {

  constructor(private router: Router) {}

  logout() {   
    localStorage.clear();
    this.router.navigate(['/']);
  }
}