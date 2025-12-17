using Backend.Database.Models;

namespace Backend.Database.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}