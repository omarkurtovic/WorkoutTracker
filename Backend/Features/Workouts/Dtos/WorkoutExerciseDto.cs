
using Backend.Features.Exercises.Models;

namespace Backend.Features.Workouts.Dtos
{
    public class WorkoutExerciseDto
    {
        public int ExerciseId{get; set;}
        public List<WorkoutExerciseSetDto> WorkoutExerciseSets { get; set; } = [];
    }
}