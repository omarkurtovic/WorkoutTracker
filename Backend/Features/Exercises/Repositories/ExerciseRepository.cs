using Backend.Features.Exercises.Dtos;
using Backend.Features.Exercises.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Features.Exercises.Repositories
{

    public class ExerciseRepository
    {
        private readonly AppDbContext _dbContext;

        public ExerciseRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ExerciseDto> GetExerciseByIdAsync(int id)
        {
            var exercise = await _dbContext.Exercises.FindAsync(id);
            if (exercise == null)
            {
                return null!;
            }
            return new ExerciseDto
            {
                Id = exercise.Id,
                Name = exercise.Name,
                TargetMuscle = exercise.TargetMuscle,
                Description = exercise.Description
            };
        }

        public async Task<List<ExerciseDto>> GetAllExercisesAsync()
        {
            return await _dbContext.Exercises.Select(exercise => new ExerciseDto
            {
                Id = exercise.Id,
                Name = exercise.Name,
                TargetMuscle = exercise.TargetMuscle,
                Description = exercise.Description
            }).ToListAsync();
        }

        public async Task<ExerciseDto> CreateExerciseAsync(ExerciseDto exerciseDto)
        {
            var exercise = new Exercise
            {
                Name = exerciseDto.Name!,
                TargetMuscle = exerciseDto.TargetMuscle!,
                Description = exerciseDto.Description
            };

            _dbContext.Exercises.Add(exercise);
            await _dbContext.SaveChangesAsync();

            return exerciseDto;
        }

        public async Task<ExerciseDto> EditExerciseAsync(int id, ExerciseDto exerciseDto)
        {
            var exercise = await _dbContext.Exercises.FindAsync(id);
            if (exercise == null)
            {
                throw new KeyNotFoundException("Exercise not found");
            }

            exercise.Name = exerciseDto.Name!;
            exercise.TargetMuscle = exerciseDto.TargetMuscle!;
            exercise.Description = exerciseDto.Description;

            await _dbContext.SaveChangesAsync();

            return exerciseDto;
        }

        public async Task DeleteExerciseAsync(int id)
        {
            var exercise = await _dbContext.Exercises.FindAsync(id);
            if (exercise == null)
            {
                throw new KeyNotFoundException("Exercise not found");
            }

            _dbContext.Exercises.Remove(exercise);
            await _dbContext.SaveChangesAsync();
        }
    }
}