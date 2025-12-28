
using Backend.Features.Exercises.Models;

namespace Backend.Features.Workouts.Models
{
    public class WorkoutExerciseSet
    {
        public int WorkoutExerciseSetId { get; set; }
        public int WorkoutExerciseId { get; set; }
        public WorkoutExercise WorkoutExercise { get; set; } = null!;
        public int Repetitions { get; set; }
        public int Weight{get; set;}
    }
}