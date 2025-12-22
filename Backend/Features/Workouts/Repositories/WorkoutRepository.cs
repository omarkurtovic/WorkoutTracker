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
            .Include(w => w.WorkoutExercises)
            .ThenInclude(wes => wes.WorkoutExerciseSets)
            .Select(w => new WorkoutDto
            {
                Id = w.Id,
                Name = w.Name,
                WorkoutExercises = w.WorkoutExercises.Select(we => new WorkoutExerciseDto
                {
                    ExerciseId = we.ExerciseId,
                    WorkoutExerciseSets = we.WorkoutExerciseSets.Select(wes => new WorkoutExerciseSetDto
                    {
                        Repetitions = wes.Repetitions
                    }).ToList()
                }).ToList()
            }).ToListAsync();
        }

        public async Task<WorkoutDto?> GetWorkoutByIdAsync(int id)
        {
            var workout = await _context.Workouts
            .Include(w => w.WorkoutExercises)
            .ThenInclude(we => we.Exercise)
            .Include(w => w.WorkoutExercises)
            .ThenInclude(wes => wes.WorkoutExerciseSets)
            .FirstOrDefaultAsync(w => w.Id == id);

            if (workout == null)
            {
                return null;
            }

            return new WorkoutDto
            {
                Id = workout.Id,
                Name = workout.Name,
                WorkoutExercises = workout.WorkoutExercises.Select(we => new WorkoutExerciseDto
                {
                    ExerciseId = we.ExerciseId,
                    WorkoutExerciseSets = we.WorkoutExerciseSets.Select(wes => new WorkoutExerciseSetDto
                    {
                        Repetitions = wes.Repetitions
                    }).ToList()
                }).ToList()
            };
        }

        public async Task CreateWorkoutAsync(WorkoutDto workoutDto)
        {
            var workout = new Workout
            {
                Name = workoutDto.Name
            };
            _context.Add(workout);

            foreach (var exercise in workoutDto.WorkoutExercises)
            {
                var workoutExercise = new WorkoutExercise
                {
                    Workout = workout,
                    ExerciseId = exercise.ExerciseId
                };
                _context.Add(workoutExercise);
                foreach(var set in exercise.WorkoutExerciseSets)
                {
                    var workoutExerciseSet = new WorkoutExerciseSet
                    {
                        WorkoutExercise = workoutExercise,
                        Repetitions = set.Repetitions
                    };
                    _context.Add(workoutExerciseSet);
                }
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
            _context.Update(workout);

            var existingExercises = _context.WorkoutExercises.Where(we => we.WorkoutId == id);
            _context.WorkoutExercises.RemoveRange(existingExercises);

            foreach (var exercise in workoutDto.WorkoutExercises)
            {
                var workoutExercise = new WorkoutExercise
                {
                    WorkoutId = workout.Id,
                    ExerciseId = exercise.ExerciseId
                };
                _context.Add(workoutExercise);
                var existingSets = _context.WorkoutExerciseSets.Where(wes => wes.WorkoutExerciseId == workoutExercise.WorkoutExerciseId);
                _context.WorkoutExerciseSets.RemoveRange(existingSets);
                foreach(var set in exercise.WorkoutExerciseSets)
                {
                    var workoutExerciseSet = new WorkoutExerciseSet
                    {
                        WorkoutExercise = workoutExercise,
                        Repetitions = set.Repetitions
                    };
                    _context.Add(workoutExerciseSet);
                }
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
            foreach(var exercise in existingExercises)
            {
                var existingSets = _context.WorkoutExerciseSets.Where(wes => wes.WorkoutExerciseId == exercise.WorkoutExerciseId);
                _context.WorkoutExerciseSets.RemoveRange(existingSets);
            }

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
        }

    }
}