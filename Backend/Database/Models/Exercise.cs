namespace Backend.Database.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string TargetMuscle{get; set;} = null!;
        public string? Description { get; set; }
    }
}