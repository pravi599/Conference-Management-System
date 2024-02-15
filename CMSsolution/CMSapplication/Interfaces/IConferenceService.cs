using CMSapplication.Models.DTOs;

namespace CMSapplication.Interfaces
{
    public interface IConferenceService
    {
        bool Add(ConferenceDTO conferenceDTO);
        bool Remove(int conferenceID);
        ConferenceDTO Update(ConferenceDTO conferenceDTO);
        ConferenceDTO GetConferenceById(int conferenceID);
        IEnumerable<ConferenceDTO> GetAllConferences();
    }
}
