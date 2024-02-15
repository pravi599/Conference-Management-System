using CMSapplication.Contexts;
using CMSapplication.Interfaces;
using CMSapplication.Models;

namespace CMSapplication.Repositories
{
    public class ConferenceRepository : IRepository<int, Conference>
    {
        private readonly CMSdbContext _context;
        public ConferenceRepository(CMSdbContext context)
        {
            _context = context;

        }
        public Conference Add(Conference entity)
        {
            _context.Conferences.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Conference Delete(int conferenceID)
        {
            var conference = _context.Conferences.Find(conferenceID);
            if (conference != null)
            {
                _context.Conferences.Remove(conference);
                _context.SaveChanges();
                return conference;
            }
            return null;
        }

        public IList<Conference> GetAll()
        {
            if (_context.Conferences.Count() == 0)
            {
                return null;
            }
            return _context.Conferences.ToList();
        }

        public Conference GetById(int conferenceID)
        {
            return _context.Conferences.FirstOrDefault(r => r.ConferenceID == conferenceID);
        }

        public Conference Update(Conference conference)
        {
            _context.Conferences.Update(conference);
            _context.SaveChanges();
            return conference;
        }
    }
}
