import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.html',
  standalone: true,
  styleUrls: ['./usage.css']
})
export class UsageComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {

    // ✅ Only run in browser
    if (isPlatformBrowser(this.platformId)) {

      const canvas = document.getElementById('usage-chart') as HTMLCanvasElement;

      if (!canvas) return;

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: ['23/1', '28/1', '2/2', '7/2', '12/2', '17/2'],
          datasets: [{
            data: [8, 21, 10, 16, 9, 15],
            borderColor: '#00f5ff',
            backgroundColor: 'rgba(155, 92, 255, 0.25)',
            borderWidth: 3,
            tension: 0,       // sharp edges
            pointRadius: 0,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#00f5ff' }
            },
            y: {
  min: 0,
  max: 21,
  afterBuildTicks: (axis) => {
    axis.ticks = [
      { value: 0 },
      { value: 5 },
      { value: 10 },
      { value: 16 },
      { value: 21 }
    ];
  },
  ticks: {
    color: '#00f5ff'
  },
  grid: {
    color: 'rgba(0,255,255,0.1)'
  }
}
          }
        }
      });

    }
  }
}