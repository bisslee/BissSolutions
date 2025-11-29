using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Data;
using BissSolutions.Api.Services;
using BissSolutions.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Health Checks
builder.Services.AddHealthChecks();

// Configuração do Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registro dos serviços
builder.Services.AddScoped<IPageService, PageService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200", "http://localhost:4550", "https://biss.com.br", "https://www.biss.com.br")
              .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
              .WithHeaders("Content-Type", "Authorization", "X-Requested-With")
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

// Exception Handling (deve ser primeiro)
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Rate Limiting
app.UseMiddleware<RateLimitMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apenas redirecionar HTTPS em produção
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Habilitar CORS
app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

// Health Check endpoint
app.MapHealthChecks("/health");

// Criar banco de dados se não existir e popular com dados iniciais
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        // Em desenvolvimento: EnsureCreated
        // Em produção: usar migrations
        if (app.Environment.IsDevelopment())
        {
            context.Database.EnsureCreated();
            SeedData.Initialize(context);
        }
        else
        {
            // Em produção, apenas verificar se pode conectar
            if (context.Database.CanConnect())
            {
                app.Logger.LogInformation("Database connection successful");
            }
            else
            {
                app.Logger.LogWarning("Cannot connect to database. Please check connection string.");
            }
        }
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Error initializing database");
        // Não falhar a aplicação se o banco não estiver disponível
        // A API ainda pode funcionar para endpoints que não precisam do banco
    }
}

app.Run();
