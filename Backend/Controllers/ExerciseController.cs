using Backend.Database;
using Backend.Database.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ExercisesController : ControllerBase
{
    private readonly ExerciseRepository _exerciseRepository;
    public ExercisesController(ExerciseRepository exerciseRepository)
    {
        _exerciseRepository = exerciseRepository;
    }

    [HttpGet(Name = "GetAllExercises")]
    public async Task<IEnumerable<Exercise>> GetAll()
    {
        return await _exerciseRepository.GetAllAsync();
    }

    [HttpGet("{id}", Name = "GetExerciseById")]
    public async Task<ActionResult<Exercise>> GetById(int id)
    {
        var exercise = await _exerciseRepository.GetByIdAsync(id);
        if (exercise == null)
        {
            return NotFound();
        }
        return exercise;
    }

    [HttpPost(Name = "CreateExercise")]
    public async Task<ActionResult<Exercise>> Create(Exercise exercise)
    {
        await _exerciseRepository.AddAsync(exercise);
        return Ok();
    }

    [HttpPut("{id}", Name = "UpdateExercise")]
    public async Task<IActionResult> Update(int id, Exercise exercise)
    {
        await _exerciseRepository.UpdateAsync(id, exercise);
        return Ok();
    }

    [HttpDelete("{id}", Name = "DeleteExercise")]
    public async Task<IActionResult> Delete(int id)
    {
        await _exerciseRepository.DeleteAsync(id);
        return Ok();
    }
}