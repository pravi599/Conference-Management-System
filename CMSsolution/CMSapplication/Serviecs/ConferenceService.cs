using CMSapplication.Interfaces;
using CMSapplication.Models;
using CMSapplication.Models.DTOs;
using System.Net;

namespace CMSapplication.Serviecs
{
    public class ConferenceService : IConferenceService
    {
        private readonly IRepository<int,Conference> _conferenceRepository;
        public ConferenceService(IRepository<int, Conference> conferenceRepository)
        {
            _conferenceRepository = conferenceRepository;          
        }

        public bool Add(ConferenceDTO conferenceDTO)
        {
            try
            {
                var book = new Conference
                {
                    Title = conferenceDTO.Title,
                    Description = conferenceDTO.Description,
                    Date = conferenceDTO.Date,
                    Location = conferenceDTO.Location,
                    Username = conferenceDTO.Username
                };
                _conferenceRepository.Add(book);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public IEnumerable<ConferenceDTO> GetAllConferences()
        {
            try
            {
                var books = _conferenceRepository.GetAll();
                return books.Select(c => new ConferenceDTO
                {
                    ConferenceID = c.ConferenceID,
                    Title = c.Title,
                    Description = c.Description,
                    Date = c.Date,
                    Location = c.Location,
                    Username = c.Username
                });
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ConferenceDTO GetConferenceById(int conferenceID)
        {
            try
            {
                var conferenceEntity = _conferenceRepository.GetById(conferenceID);
                if (conferenceEntity == null)
                    return null;
                return new ConferenceDTO
                {
                    ConferenceID = conferenceEntity.ConferenceID,
                    Title = conferenceEntity.Title,
                    Description = conferenceEntity.Description,
                    Date = conferenceEntity.Date,
                    Location = conferenceEntity.Location,
                    Username = conferenceEntity.Username
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool Remove(int conferenceID)
        {
            try
            {
                var removedConference = _conferenceRepository.Delete(conferenceID);
                return removedConference != null;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ConferenceDTO Update(ConferenceDTO conferenceDTO)
        {
            try
            {
                var updatedConference = new Conference
                {
                    ConferenceID = conferenceDTO.ConferenceID,
                    Title = conferenceDTO.Title,
                    Description = conferenceDTO.Description,
                    Date = conferenceDTO.Date,
                    Location = conferenceDTO.Location,
                    Username = conferenceDTO.Username
                };
                var result = _conferenceRepository.Update(updatedConference);
                return new ConferenceDTO
                {
                    ConferenceID = updatedConference.ConferenceID,
                    Title = updatedConference.Title,
                    Description = updatedConference.Description,
                    Date = updatedConference.Date,
                    Location = updatedConference.Location,
                    Username = updatedConference.Username
                };
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
