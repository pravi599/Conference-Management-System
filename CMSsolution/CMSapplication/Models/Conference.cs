using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMSapplication.Models
{
    public class Conference
    {
        [Key]
        public int ConferenceID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Username { get; set; }
        [ForeignKey("Username")]
        public User? User { get; set; }
    }
}
