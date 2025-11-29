using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Models;
using BissSolutions.Api.Models.DTOs;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers
{
    [ApiController]
    [Route("api/admin/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AdminUser> _userManager;
        private readonly SignInManager<AdminUser> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            UserManager<AdminUser> userManager,
            SignInManager<AdminUser> signInManager,
            IJwtService jwtService,
            ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _logger = logger;
        }

        /// <summary>
        /// Realiza login do administrador
        /// </summary>
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null || !user.IsActive)
                {
                    _logger.LogWarning("Tentativa de login com email inválido: {Email}", request.Email);
                    return Unauthorized(new { message = "Email ou senha incorretos" });
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
                
                if (!result.Succeeded)
                {
                    if (result.IsLockedOut)
                    {
                        _logger.LogWarning("Conta bloqueada por múltiplas tentativas: {Email}", request.Email);
                        return Unauthorized(new { message = "Conta temporariamente bloqueada. Tente novamente mais tarde." });
                    }
                    
                    _logger.LogWarning("Tentativa de login com senha incorreta: {Email}", request.Email);
                    return Unauthorized(new { message = "Email ou senha incorretos" });
                }

                // Atualizar último login
                user.LastLoginAt = DateTime.UtcNow;
                await _userManager.UpdateAsync(user);

                // Obter roles do usuário
                var roles = await _userManager.GetRolesAsync(user);

                // Gerar token JWT
                var token = _jwtService.GenerateToken(user, roles);
                var refreshToken = _jwtService.GenerateRefreshToken();

                _logger.LogInformation("Login bem-sucedido para: {Email}", request.Email);

                return Ok(new LoginResponse
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    Expiration = DateTime.UtcNow.AddMinutes(60),
                    User = new UserInfo
                    {
                        Id = user.Id,
                        Email = user.Email ?? string.Empty,
                        FullName = user.FullName,
                        UserName = user.UserName ?? string.Empty
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao realizar login para: {Email}", request.Email);
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Obtém informações do usuário logado
        /// </summary>
        [HttpGet("me")]
        [Microsoft.AspNetCore.Authorization.Authorize]
        public async Task<ActionResult<UserInfo>> GetCurrentUser()
        {
            try
            {
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null || !user.IsActive)
                    return Unauthorized();

                return Ok(new UserInfo
                {
                    Id = user.Id,
                    Email = user.Email ?? string.Empty,
                    FullName = user.FullName,
                    UserName = user.UserName ?? string.Empty
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter informações do usuário");
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Realiza logout (opcional, para invalidar refresh token)
        /// </summary>
        [HttpPost("logout")]
        [Microsoft.AspNetCore.Authorization.Authorize]
        public async Task<ActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok(new { message = "Logout realizado com sucesso" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao realizar logout");
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }
    }
}

