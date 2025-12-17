export interface Exercise {
  id: number;
  name: string;
  targetMuscle: string;
  description?: string;
}


export interface Workout{
  id: number,
  name: string,
  exercises: Exercise[]
}