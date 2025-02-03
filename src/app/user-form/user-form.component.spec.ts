import { TestBed } from '@angular/core/testing';
import { UserDataService } from '../services/user.service';
import { UserData } from '../models/user.model';

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });
    service = TestBed.inject(UserDataService);
  });

  it('created', () => {
    expect(service).toBeTruthy();
  });

  it('return user', () => {
    const users = service.getUsers();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBeTruthy();
  });

  it('Add a new workout for an existing user', () => {
    const initialUsers = service.getUsers().length;
    service.addUserWorkout('John Doe', 'Swimming', 40);
    const users = service.getUsers();
    const user = users.find((u: UserData) => u.name === 'John Doe');
    expect(user).toBeDefined();
    expect(user?.workouts.some((w: { type: string; minutes: number }) => w.type === 'Swimming' && w.minutes === 40)).toBeTruthy();
  });

  it('Add a new user with a workout if user does not exist', () => {
  const initialUsers = service.getUsers().length;
  console.log('Initial users:', initialUsers);  // Add a log for debugging

  service.addUserWorkout('Alice Brown', 'Yoga', 60);

  const users = service.getUsers();
  console.log('Users after adding workout:', users);  // Add a log for debugging

  const newUser = users.find((u: UserData) => u.name === 'Alice Brown');
  expect(users.length).toBe(initialUsers + 1);
  expect(newUser).toBeDefined();
  expect(newUser?.workouts.length).toBe(1);
  expect(newUser?.workouts[0]).toEqual({ type: 'Yoga', minutes: 60 });
});

});
