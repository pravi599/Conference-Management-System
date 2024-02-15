using CMSapplication.Models.DTOs;

namespace CMSapplication.Interfaces
{
    public interface ITokenService
    {
        string GetToken(UserDTO user);
    }
}
