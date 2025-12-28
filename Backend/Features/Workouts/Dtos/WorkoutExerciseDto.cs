
using Backend.Features.Exercises.Models;

namespace Backend.Features.Workouts.Dtos
{
    public class WorkoutExerciseDto
    {
        public int ExerciseId{get; set;}
        public string ExerciseName{get; set;} = null!;
        public List<WorkoutExerciseSetDto> WorkoutExerciseSets { get; set; } = [];
    }
}