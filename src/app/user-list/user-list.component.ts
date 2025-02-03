import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: { id: number, name: string, workouts: { type: string, minutes: number }[] }[] = [];
  searchName: string = '';
  selectedWorkoutType: string = '';
  page: number = 1;
  pageSize: number = 5;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Other'];

  constructor() { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') { // Ensure it's running in the browser
      const storedData = localStorage.getItem('workoutData');
      if (storedData) {
        this.users = JSON.parse(storedData);
      }
    }
  }

  get filteredUsers() {
    return this.users
      .filter(user => user.name.toLowerCase().includes(this.searchName.toLowerCase())) // Search by name
      .filter(user => this.selectedWorkoutType ? user.workouts.some(workout => workout.type === this.selectedWorkoutType) : true); // Filter by workout type
  }

  get paginatedUsers() {
    const filteredUsers = this.filteredUsers;
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return filteredUsers.slice(start, end);
  }

  onPageChange(page: number) {
    this.page = page;
  }
}
