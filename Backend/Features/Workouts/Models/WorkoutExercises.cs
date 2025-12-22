
using Backend.Features.Exercises.Models;

namespace Backend.Features.Workouts.Models
{
    public class WorkoutExercise
    {
        public int WorkoutExerciseId{get; set;}
        public int WorkoutId{get; set;}
        public Workout Workout{get; set;} = null!;
        public int ExerciseId{get; set;}
        public Exercise Exercise{get; set;} = null!;
        public ICollection<WorkoutExerciseSet> WorkoutExerciseSets { get; set; } = [];
    }
}