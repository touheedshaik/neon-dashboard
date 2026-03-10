import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('member_id')) {
      this.router.navigate(['/']);
    }
  }
}