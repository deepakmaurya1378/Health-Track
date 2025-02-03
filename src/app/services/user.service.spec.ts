import { TestBed } from '@angular/core/testing';
import { UserDataService } from './user.service';
import { UserData } from '../models/user.model';

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return the default users when localStorage is empty', () => {
      const users = service.getUsers();
      expect(users).toEqual([
        { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
        { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
        { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] }
      ]);
    });

    it('return users from localStorage when data exists', () => {
      const mockData: UserData[] = [
        { id: 1, name: 'Test User', workouts: [{ type: 'Walking', minutes: 20 }] }
      ];
      localStorage.setItem('workoutData', JSON.stringify(mockData));

      service = new UserDataService();
      const users = service.getUsers();
      expect(users).toEqual(mockData);
    });
  });

  describe('addUserWorkout', () => {
    it('add a workout to an existing user', () => {
      const initialUsers = service.getUsers();
      const initialWorkoutCount = initialUsers[0].workouts.length;

      service.addUserWorkout('John Doe', 'Swimming', 50);
      const updatedUsers = service.getUsers();

      expect(updatedUsers[0].workouts.length).toBe(initialWorkoutCount + 1);
      expect(updatedUsers[0].workouts).toContain(jasmine.objectContaining({ type: 'Swimming', minutes: 50 }));
    });

    it('create a new user with correct ID if not exists', () => {
      const newUserName = 'New User';
      service.addUserWorkout(newUserName, 'Yoga', 30);

      const users = service.getUsers();
      const newUser = users.find(u => u.name === newUserName);

      expect(users.length).toBe(4);
      expect(newUser).toEqual({
        id: 4,
        name: 'New User',
        workouts: [{ type: 'Yoga', minutes: 30 }]
      });
    });
  });
});
