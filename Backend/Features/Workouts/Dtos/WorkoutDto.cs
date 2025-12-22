using Backend.Features.Exercises.Dtos;

namespace Backend.Features.Workouts.Dtos
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<WorkoutExerciseDto> WorkoutExercises { get; set; } = []; 
    }
}