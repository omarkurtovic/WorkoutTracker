using Backend.Database;
using Backend.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class WorkoutRepository
    {
        private readonly AppDbContext _context;
        public WorkoutRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Workout>> GetAllAsync()
        {
            return await _context.Workouts.ToListAsync();
        }

        public async Task<Workout?> GetByIdAsync(int id)
        {
            return await _context.Workouts.FindAsync(id);
        }


        public async Task AddAsync(Workout workout)
        {
            await _context.Workouts.AddAsync(workout);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(int id, Workout workout)
        {
            var existingWorkout = await _context.Workouts.FindAsync(id);
            if (existingWorkout != null)
            {
                existingWorkout.Name = workout.Name;
                existingWorkout.Exercises = workout.Exercises;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout != null)
            {
                _context.Workouts.Remove(workout);
                await _context.SaveChangesAsync();
            }
        }
    }
}