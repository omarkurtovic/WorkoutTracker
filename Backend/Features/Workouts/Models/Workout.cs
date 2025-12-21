
namespace Backend.Features.Workouts.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<WorkoutExercise> WorkoutExercises { get; set; } = [];
    }
}