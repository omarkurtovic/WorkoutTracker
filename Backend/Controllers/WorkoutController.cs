using Backend.Database;
using Backend.Database.Models;
using Backend.Repositories;
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
    public async Task<IEnumerable<Workout>> GetAll()
    {
        return await _workoutRepository.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Workout>> GetById(int id)
    {
        var workout = await _workoutRepository.GetByIdAsync(id);
        if (workout == null)
        {
            return NotFound();
        }
        return workout;
    }

    [HttpPost]
    public async Task<ActionResult<Workout>> Create(Workout workout)
    {
        await _workoutRepository.AddAsync(workout);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Workout workout)
    {
        await _workoutRepository.UpdateAsync(id, workout);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _workoutRepository.DeleteAsync(id);
        return Ok();
    }
}