namespace Backend.Features.Exercises.Dtos
{
    public class ExerciseDto
    {
        public int? Id { get; set; } = null!;
        public string? Name { get; set; } = null!;
        public string? TargetMuscle{get; set;} = null!;
        public string? Description { get; set; } = null!;
    }
}