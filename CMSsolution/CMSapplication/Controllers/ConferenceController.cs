using CMSapplication.Interfaces;
using CMSapplication.Models;
using CMSapplication.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CMSapplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("reactApp")]
    public class ConferenceController : ControllerBase
    {
        private readonly IConferenceService _conferenceService;

        public ConferenceController(IConferenceService conferenceService)
        {
            _conferenceService = conferenceService;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult AddConference([FromBody] ConferenceDTO conferenceDTO)
        {
            try
            {
                var success = _conferenceService.Add(conferenceDTO);
                if (success)
                    return Ok();
                return StatusCode(500, "Failed to add the conference.");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while adding new conference.");
            }
        }
        [Authorize(Roles = "Admin,User")]
        [HttpGet]
        public IActionResult GetAllConferences()
        {
            try
            {
                var conferences = _conferenceService.GetAllConferences();
                if (conferences != null)
                    return Ok(conferences);
                return NotFound("No Conferences added Yet");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while getting all conferences.");
            }
        }
        [Authorize(Roles = "Admin,User")]
        [HttpGet("{id}")]
        public IActionResult GetConferenceById(int id)
        {
            try
            {
                var conference = _conferenceService.GetConferenceById(id);
                if (conference != null)
                    return Ok(conference);
                return NotFound($"Conference with given Id {id} not found");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while getting conference by Conference ID.");
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult UpdateConference(int id, [FromBody] ConferenceDTO conferenceDTO)
        {
            try
            {
                if (id != conferenceDTO.ConferenceID)
                    return BadRequest("Conference ID mismatch.");

                var updatedConference = _conferenceService.Update(conferenceDTO);
                if (updatedConference != null)
                    return Ok(updatedConference);
                return NotFound($"Conference with given Id {id} not found");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while updating the existing conference.");
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult DeleteConference(int id)
        {
            try
            {
                var success = _conferenceService.Remove(id);
                if (success)
                    return Ok();
                return NotFound($"Conference with given Id {id} not found");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while deleting the existing conference.");
            }
        }

    }
}
