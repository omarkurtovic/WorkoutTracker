using Backend.Features.Exercises.Models;
using Backend.Features.Workouts.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend
{
    public class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public AppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Exercise> Exercises{get; set;}
        public DbSet<WorkoutExercise> WorkoutExercises{get; set;}
        public DbSet<WorkoutExerciseSet> WorkoutExerciseSets { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseNpgsql(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Workout>()
                .HasMany(w => w.WorkoutExercises)
                .WithOne(we => we.Workout)
                .HasForeignKey(we => we.WorkoutId);

            modelBuilder.Entity<WorkoutExercise>()
                .HasMany(we => we.WorkoutExerciseSets)
                .WithOne(wes => wes.WorkoutExercise)
                .HasForeignKey(wes => wes.WorkoutExerciseId);
        }
    }
}