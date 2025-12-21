using Backend.Features.Exercises.Dtos;
using Backend.Features.Exercises.Repositories;
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

    [HttpGet]
    public async Task<IEnumerable<ExerciseDto>> GetAll()
    {
        return await _exerciseRepository.GetAllExercisesAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ExerciseDto>> GetById(int id)
    {
        var exercise = await _exerciseRepository.GetExerciseByIdAsync(id);
        if (exercise == null)
        {
            return NotFound();
        }
        return exercise;
    }

    [HttpPost]
    public async Task<ActionResult<ExerciseDto>> Create(ExerciseDto exercise)
    {
        await _exerciseRepository.CreateExerciseAsync(exercise);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ExerciseDto exercise)
    {
        await _exerciseRepository.EditExerciseAsync(id, exercise);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _exerciseRepository.DeleteExerciseAsync(id);
        return Ok();
    }
}