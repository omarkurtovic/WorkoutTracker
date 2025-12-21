using Backend.Features.Workouts.Models;

namespace Backend.Features.Exercises.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string TargetMuscle{get; set;} = null!;
        public string? Description { get; set; }
        public ICollection<WorkoutExercise> WorkoutExercises { get; set; } = [];
    }
}