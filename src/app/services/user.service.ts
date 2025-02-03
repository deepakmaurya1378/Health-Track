import { Injectable } from '@angular/core';
import { UserData } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private users: UserData[] = [];
  private defaultUserData: UserData[] = [
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
    { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
    { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] }
  ];

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedData = localStorage.getItem('workoutData');
      this.users = storedData ? JSON.parse(storedData) : this.defaultUserData;
      this.saveToLocalStorage();
    } else {
      this.users = this.defaultUserData;
    }
  }

  getUsers(): UserData[] {
    return this.users;
  }

  addUserWorkout(name: string, workout: string, duration: number) {
    const userIndex = this.users.findIndex(user => user.name === name);
    const newWorkout = { type: workout, minutes: duration };

    if (userIndex !== -1) {
      this.users[userIndex].workouts.push(newWorkout);
    } else {
      this.users.push({ id: this.users.length + 1, name, workouts: [newWorkout] });
    }
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('workoutData', JSON.stringify(this.users));
    }
  }
}
