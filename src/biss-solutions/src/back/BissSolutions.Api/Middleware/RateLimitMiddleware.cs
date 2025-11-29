using System.Collections.Concurrent;
using System.Net;

namespace BissSolutions.Api.Middleware
{
    public class RateLimitMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RateLimitMiddleware> _logger;
        
        // Armazena contadores por IP
        private static readonly ConcurrentDictionary<string, RateLimitInfo> _rateLimitStore = new();
        
        // Configurações
        private const int MaxRequests = 5; // Máximo de requisições
        private const int TimeWindowMinutes = 60; // Janela de tempo em minutos

        public RateLimitMiddleware(RequestDelegate next, ILogger<RateLimitMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Aplicar rate limiting apenas no endpoint de contato
            if (context.Request.Path.StartsWithSegments("/api/Contact") && 
                context.Request.Method == "POST")
            {
                var clientIp = GetClientIpAddress(context);
                var rateLimitInfo = _rateLimitStore.GetOrAdd(clientIp, _ => new RateLimitInfo());

                // Limpar entradas antigas periodicamente
                CleanupOldEntries();

                // Verificar se excedeu o limite
                if (rateLimitInfo.RequestCount >= MaxRequests && 
                    DateTime.UtcNow < rateLimitInfo.ResetTime)
                {
                    _logger.LogWarning($"Rate limit exceeded for IP: {clientIp}");
                    context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(new
                    {
                        success = false,
                        message = "Muitas requisições. Por favor, tente novamente mais tarde.",
                        retryAfter = (int)(rateLimitInfo.ResetTime - DateTime.UtcNow).TotalSeconds
                    }));
                    return;
                }

                // Atualizar contador
                if (DateTime.UtcNow >= rateLimitInfo.ResetTime)
                {
                    rateLimitInfo.RequestCount = 0;
                    rateLimitInfo.ResetTime = DateTime.UtcNow.AddMinutes(TimeWindowMinutes);
                }

                rateLimitInfo.RequestCount++;
                rateLimitInfo.LastRequest = DateTime.UtcNow;
            }

            await _next(context);
        }

        private string GetClientIpAddress(HttpContext context)
        {
            // Tentar obter IP real (considerando proxies)
            var ip = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();
            if (!string.IsNullOrEmpty(ip))
            {
                return ip.Split(',')[0].Trim();
            }

            ip = context.Request.Headers["X-Real-IP"].FirstOrDefault();
            if (!string.IsNullOrEmpty(ip))
            {
                return ip;
            }

            return context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        }

        private void CleanupOldEntries()
        {
            // Limpar entradas antigas (mais de 2 horas sem uso)
            var cutoff = DateTime.UtcNow.AddHours(-2);
            var keysToRemove = _rateLimitStore
                .Where(kvp => kvp.Value.LastRequest < cutoff)
                .Select(kvp => kvp.Key)
                .ToList();

            foreach (var key in keysToRemove)
            {
                _rateLimitStore.TryRemove(key, out _);
            }
        }

        private class RateLimitInfo
        {
            public int RequestCount { get; set; }
            public DateTime ResetTime { get; set; } = DateTime.UtcNow.AddMinutes(TimeWindowMinutes);
            public DateTime LastRequest { get; set; } = DateTime.UtcNow;
        }
    }
}

