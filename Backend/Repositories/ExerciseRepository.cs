using Backend.Database;
using Backend.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class ExerciseRepository
    {
        private readonly AppDbContext _context;
        public ExerciseRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Exercise>> GetAllAsync()
        {
            return await _context.Exercises.ToListAsync();
        }

        public async Task<Exercise?> GetByIdAsync(int id)
        {
            return await _context.Exercises.FindAsync(id);
        }


        public async Task AddAsync(Exercise exercise)
        {
            await _context.Exercises.AddAsync(exercise);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(int id, Exercise exercise)
        {
            var existingExercise = await _context.Exercises.FindAsync(id);
            if (existingExercise != null)
            {
                existingExercise.Name = exercise.Name;
                existingExercise.TargetMuscle = exercise.TargetMuscle;
                existingExercise.Description = exercise.Description;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            if (exercise != null)
            {
                _context.Exercises.Remove(exercise);
                await _context.SaveChangesAsync();
            }
        }
    }
}