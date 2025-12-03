namespace Backend.Database.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DifficultyLevel { get; set; }
    }
}