export interface Workout {
  type: string;
  minutes: number;
}

export interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}
