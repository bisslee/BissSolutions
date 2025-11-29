namespace BissSolutions.Api.Services
{
    public interface IEmailService
    {
        Task<bool> SendContactEmailAsync(string fromEmail, string fromName, string subject, string message, string? phone = null, string? company = null);
    }
}

