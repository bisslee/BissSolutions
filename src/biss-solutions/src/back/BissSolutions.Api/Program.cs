using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BissSolutions.Api.Data;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;
using BissSolutions.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// AddEndpointsApiExplorer não é necessário sem Swagger
// builder.Services.AddEndpointsApiExplorer();

// Health Checks
builder.Services.AddHealthChecks();

// Configuração do Entity Framework com Identity
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuração do Identity
builder.Services.AddIdentity<AdminUser, IdentityRole>(options =>
{
    // Configurações de senha
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    
    // Configurações de lockout
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
    
    // Configurações de usuário
    options.User.RequireUniqueEmail = true;
    options.SignIn.RequireConfirmedEmail = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configuração do JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey não configurado");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

// Registro dos serviços
builder.Services.AddScoped<IPageService, PageService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IJwtService, JwtService>();

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

// Swagger temporariamente desabilitado para compatibilidade com .NET 10
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// Apenas redirecionar HTTPS em produção
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Habilitar CORS
app.UseCors("AllowAngularApp");

// Authentication deve vir antes de Authorization
app.UseAuthentication();
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
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AdminUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
        
        // Em desenvolvimento: EnsureCreated
        // Em produção: usar migrations
        if (app.Environment.IsDevelopment())
        {
            context.Database.EnsureCreated();
            await SeedData.Initialize(context, userManager, roleManager, configuration);
        }
        else
        {
            // Em produção, apenas verificar se pode conectar
            if (context.Database.CanConnect())
            {
                app.Logger.LogInformation("Database connection successful");
                
                // Seed apenas do usuário admin (se não existir)
                await SeedData.Initialize(context, userManager, roleManager, configuration);
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
