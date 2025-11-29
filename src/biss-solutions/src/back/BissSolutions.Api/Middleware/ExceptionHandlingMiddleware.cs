using System.Net;
using System.Text.Json;

namespace BissSolutions.Api.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var result = string.Empty;

            // Personalizar resposta baseado no tipo de exceção
            if (exception is ArgumentException or ArgumentNullException)
            {
                code = HttpStatusCode.BadRequest;
                result = JsonSerializer.Serialize(new
                {
                    success = false,
                    message = "Dados inválidos fornecidos."
                });
            }
            else
            {
                result = JsonSerializer.Serialize(new
                {
                    success = false,
                    message = "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."
                });
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}

