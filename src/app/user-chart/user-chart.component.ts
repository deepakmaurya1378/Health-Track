import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements OnInit {
  userData: any[] = [];
  selectedUser: any = {};
  chartData!: ChartData<'bar'>;
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };
  chartType: ChartType = 'bar';

  ngOnInit() {
    const storedData = localStorage.getItem('workoutData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      this.selectedUser = this.userData[0];
      this.updateChartData();
    } else {
      console.error('No user data found in localStorage');
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.updateChartData();
  }

  updateChartData() {
    this.chartData = {
      labels: this.selectedUser.workouts.map((w: any) => w.type),
      datasets: [
        {
          label: `${this.selectedUser.name}'s Workout Minutes`,
          data: this.selectedUser.workouts.map((w: any) => w.minutes),
          backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107']
        }
      ]
    };
  }
}
