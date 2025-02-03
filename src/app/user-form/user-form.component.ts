import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../services/user.service'; // Ensure correct path

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  username = '';
  workoutType = '';
  customWorkout = '';
  duration: number | null = null;

  constructor(private userDataService: UserDataService) {}

  onWorkoutTypeChange(): void {
    if (this.workoutType !== 'Other') {
      this.customWorkout = '';
    }
  }

  addUser(): void {
    if (!this.username || !this.workoutType || !this.duration) {
      alert('Please fill in all required fields!');
      return;
    }


    const finalWorkoutType = this.workoutType === 'Other' && this.customWorkout
      ? this.customWorkout
      : this.workoutType;

    this.userDataService.addUserWorkout(
      this.username,
      finalWorkoutType,
      this.duration
    );

  
    this.resetForm();
    alert('Workout added successfully!');
  }

  private resetForm(): void {
    this.username = '';
    this.workoutType = '';
    this.customWorkout = '';
    this.duration = null;
  }
}
