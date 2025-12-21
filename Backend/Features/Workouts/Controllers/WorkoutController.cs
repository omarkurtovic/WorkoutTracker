using Backend.Features.Workouts.Dtos;
using Backend.Features.Workouts.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkoutsController : ControllerBase
{
    private readonly WorkoutRepository _workoutRepository;
    public WorkoutsController(WorkoutRepository workoutRepository)
    {
        _workoutRepository = workoutRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<WorkoutDto>> GetAll()
    {
        return await _workoutRepository.GetAllWorkoutsAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<WorkoutDto>> GetById(int id)
    {
        var workout = await _workoutRepository.GetWorkoutByIdAsync(id);
        if (workout == null)
        {
            return NotFound();
        }
        return workout;
    }

    [HttpPost]
    public async Task<ActionResult<WorkoutDto>> Create(WorkoutDto workoutDto)
    {
        await _workoutRepository.CreateWorkoutAsync(workoutDto);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, WorkoutDto workoutDto)
    {
        await _workoutRepository.EditWorkoutAsync(id, workoutDto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _workoutRepository.DeleteWorkoutAsync(id);
        return Ok();
    }
}