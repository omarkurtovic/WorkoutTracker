using Backend.Features.Exercises.Dtos;
using Backend.Features.Workouts.Dtos;
using Backend.Features.Workouts.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Features.Workouts.Repositories
{
    public class WorkoutRepository
    {
        private readonly AppDbContext _context;

        public WorkoutRepository(AppDbContext context)
        {
            _context = context;
        }


        public async Task<List<WorkoutDto>> GetAllWorkoutsAsync()
        {
            return await _context.Workouts
            .Include(w => w.WorkoutExercises)
            .ThenInclude(we => we.Exercise)
            .Select(w => new WorkoutDto
            {
                Id = w.Id,
                Name = w.Name,
                Exercises = w.WorkoutExercises.Select(we => new ExerciseDto
                {
                    Id = we.Exercise.Id,
                    Name = we.Exercise.Name,
                    Description = we.Exercise.Description
                }).ToList()
            }).ToListAsync();
        }

        public async Task<WorkoutDto?> GetWorkoutByIdAsync(int id)
        {
            var workout = await _context.Workouts
            .Include(w => w.WorkoutExercises)
            .ThenInclude(we => we.Exercise)
            .FirstOrDefaultAsync(w => w.Id == id);

            if (workout == null)
            {
                return null;
            }

            return new WorkoutDto
            {
                Id = workout.Id,
                Name = workout.Name,
                Exercises = [.. workout.WorkoutExercises.Select(we => new ExerciseDto
                {
                    Id = we.Exercise.Id,
                    Name = we.Exercise.Name,
                    Description = we.Exercise.Description
                })]
            };
        }

        public async Task CreateWorkoutAsync(WorkoutDto workoutDto)
        {
            var workout = new Workout
            {
                Name = workoutDto.Name
            };
            _context.Workouts.Add(workout);

            foreach (var exerciseDto in workoutDto.Exercises)
            {
                var workoutExercise = new WorkoutExercise
                {
                    Workout = workout,
                    ExerciseId = exerciseDto.Id!.Value
                };
                _context.WorkoutExercises.Add(workoutExercise);
            }
            await _context.SaveChangesAsync();
        }

        public async Task EditWorkoutAsync(int id, WorkoutDto workoutDto)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
            {
                throw new Exception("Workout not found");
            }

            workout.Name = workoutDto.Name;
            _context.Workouts.Update(workout);

            var existingExercises = _context.WorkoutExercises.Where(we => we.WorkoutId == id);
            _context.WorkoutExercises.RemoveRange(existingExercises);

            foreach (var exerciseDto in workoutDto.Exercises)
            {
                var workoutExercise = new WorkoutExercise
                {
                    WorkoutId = workout.Id,
                    ExerciseId = exerciseDto.Id!.Value
                };
                _context.WorkoutExercises.Add(workoutExercise);
            }
            await _context.SaveChangesAsync();
        }


        public async Task DeleteWorkoutAsync(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
            {
                throw new Exception("Workout not found");
            }

            var existingExercises = _context.WorkoutExercises.Where(we => we.WorkoutId == id);
            _context.WorkoutExercises.RemoveRange(existingExercises);

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
        }

    }
}