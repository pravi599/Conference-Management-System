using CMSapplication.Models.DTOs;

namespace CMSapplication.Interfaces
{
    public interface IUserService
    {
        UserDTO Register(UserDTO userDTO);
        UserDTO Login(UserDTO userDTO);
    }
}
