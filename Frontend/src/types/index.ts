export interface Exercise {
  id: number;
  name: string;
  targetMuscle: string;
  description?: string;
}


export interface Workout{
  id: number,
  name: string,
  workoutExercises: WorkoutExercise[]
}

export interface WorkoutExercise{
  id: number,
  exerciseId: number,
  workoutExerciseSets: WorkoutExerciseSet[]
}

export interface WorkoutExerciseSet{
  id: number,
  repetitions: number
}