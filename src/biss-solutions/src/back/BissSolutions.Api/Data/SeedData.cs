using Microsoft.AspNetCore.Identity;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Data
{
    public static class SeedData
    {
        public static async Task Initialize(ApplicationDbContext context, UserManager<AdminUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            if (!context.Pages.Any())
            {
                var pages = new List<Page>
                {
                    new Page
                    {
                        Title = "Home",
                        Slug = "home",
                        Description = "Página inicial da Biss Solutions",
                        MetaTitle = "Biss Solutions - Soluções Tecnológicas",
                        MetaDescription = "Oferecemos soluções tecnológicas personalizadas para impulsionar seu negócio",
                        Order = 1
                    },
                    new Page
                    {
                        Title = "Empresa",
                        Slug = "empresa",
                        Description = "Conheça nossa empresa",
                        MetaTitle = "Sobre a Biss Solutions",
                        MetaDescription = "Conheça nossa história, missão e valores",
                        Order = 2
                    },
                    new Page
                    {
                        Title = "Clientes",
                        Slug = "clientes",
                        Description = "Nossos clientes e cases",
                        MetaTitle = "Clientes - Biss Solutions",
                        MetaDescription = "Veja nossos cases de sucesso e clientes satisfeitos",
                        Order = 3
                    },
                    new Page
                    {
                        Title = "Produtos",
                        Slug = "produtos",
                        Description = "Nossos produtos",
                        MetaTitle = "Produtos - Biss Solutions",
                        MetaDescription = "Conheça nossos produtos e soluções",
                        Order = 4
                    },
                    new Page
                    {
                        Title = "Serviços",
                        Slug = "servicos",
                        Description = "Nossos serviços",
                        MetaTitle = "Serviços - Biss Solutions",
                        MetaDescription = "Serviços de desenvolvimento, consultoria e suporte",
                        Order = 5
                    },
                    new Page
                    {
                        Title = "Contato",
                        Slug = "contato",
                        Description = "Entre em contato",
                        MetaTitle = "Contato - Biss Solutions",
                        MetaDescription = "Entre em contato conosco",
                        Order = 6
                    },
                    new Page
                    {
                        Title = "Sobre",
                        Slug = "sobre",
                        Description = "Estrutura e tecnologia do site",
                        MetaTitle = "Sobre Este Site - Biss Solutions",
                        MetaDescription = "Conheça como este site foi construído e as tecnologias utilizadas",
                        Order = 7
                    },
                    new Page
                    {
                        Title = "Política de Privacidade",
                        Slug = "privacy",
                        Description = "Política de privacidade",
                        MetaTitle = "Política de Privacidade - Biss Solutions",
                        MetaDescription = "Nossa política de privacidade e proteção de dados",
                        Order = 8
                    },
                    new Page
                    {
                        Title = "Termos de Uso",
                        Slug = "terms",
                        Description = "Termos de uso",
                        MetaTitle = "Termos de Uso - Biss Solutions",
                        MetaDescription = "Termos e condições de uso do site",
                        Order = 9
                    }
                };

                context.Pages.AddRange(pages);
                context.SaveChanges();

                // Adicionar componentes para a página Home
                var homePage = pages.First(p => p.Slug == "home");
                var homeComponents = new List<Component>
                {
                    new Component
                    {
                        Type = "carousel",
                        Title = "Hero Section",
                        PageId = homePage.Id,
                        Order = 1,
                        Configuration = @"{
                            ""slides"": [
                                {
                                    ""id"": 1,
                                    ""image"": ""/images/slides/solucoes.jpg"",
                                    ""title"": ""Soluções Tecnológicas"",
                                    ""buttonText"": ""Saiba Mais"",
                                    ""buttonLink"": ""/servicos"",
                                    ""overlayColor"": ""rgba(37, 99, 235, 0.7)""
                                },
                                {
                                    ""id"": 2,
                                    ""image"": ""/images/slides/consultoria.jpg"",
                                    ""title"": ""Consultoria Especializada"",
                                    ""buttonText"": ""Saiba Mais"",
                                    ""buttonLink"": ""/empresa"",
                                    ""overlayColor"": ""rgba(16, 185, 129, 0.7)""
                                },
                                {
                                    ""id"": 3,
                                    ""image"": ""/images/slides/bi.jpg"",
                                    ""title"": ""Cases de Sucesso"",
                                    ""buttonText"": ""Saiba Mais"",
                                    ""buttonLink"": ""/clientes"",
                                    ""overlayColor"": ""rgba(245, 158, 11, 0.7)""
                                }
                            ]
                        }"
                    },
                    new Component
                    {
                        Type = "services",
                        Title = "Nossos Serviços",
                        PageId = homePage.Id,
                        Order = 2,
                        Configuration = @"{
                            ""services"": [
                                {
                                    ""icon"": ""ri-code-s-slash-line"",
                                    ""title"": ""Desenvolvimento"",
                                    ""description"": ""Soluções personalizadas em software"",
                                    ""link"": ""/servicos/desenvolvimento""
                                },
                                {
                                    ""icon"": ""ri-user-search-line"",
                                    ""title"": ""Consultoria"",
                                    ""description"": ""Estratégias tecnológicas eficazes"",
                                    ""link"": ""/servicos/consultoria""
                                },
                                {
                                    ""icon"": ""ri-cloud-line"",
                                    ""title"": ""Cloud Solutions"",
                                    ""description"": ""Infraestrutura em nuvem segura"",
                                    ""link"": ""/servicos/cloud""
                                },
                                {
                                    ""icon"": ""ri-shield-check-line"",
                                    ""title"": ""Segurança"",
                                    ""description"": ""Proteção de dados e sistemas"",
                                    ""link"": ""/servicos/seguranca""
                                },
                                {
                                    ""icon"": ""ri-customer-service-line"",
                                    ""title"": ""Suporte"",
                                    ""description"": ""Suporte técnico especializado"",
                                    ""link"": ""/servicos/suporte""
                                },
                                {
                                    ""icon"": ""ri-bar-chart-line"",
                                    ""title"": ""Analytics & BI"",
                                    ""description"": ""Business Intelligence avançado"",
                                    ""link"": ""/servicos/analytics""
                                }
                            ]
                        }"
                    }
                };

                context.Components.AddRange(homeComponents);
                context.SaveChanges();
            }

            // Seed de usuário admin inicial
            await SeedAdminUser(userManager, roleManager, configuration);
        }

        private static async Task SeedAdminUser(UserManager<AdminUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            // Criar role Admin se não existir
            const string adminRoleName = "Admin";
            if (!await roleManager.RoleExistsAsync(adminRoleName))
            {
                await roleManager.CreateAsync(new IdentityRole(adminRoleName));
            }

            // Verificar se já existe usuário admin
            var adminSettings = configuration.GetSection("AdminSettings");
            var defaultEmail = adminSettings["DefaultAdminEmail"] ?? "admin@biss.com.br";
            var defaultPassword = adminSettings["DefaultAdminPassword"] ?? "ChangeThisPassword123!";

            var existingAdmin = await userManager.FindByEmailAsync(defaultEmail);
            if (existingAdmin == null)
            {
                var adminUser = new AdminUser
                {
                    UserName = defaultEmail,
                    Email = defaultEmail,
                    EmailConfirmed = true,
                    FullName = "Administrador",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                var result = await userManager.CreateAsync(adminUser, defaultPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, adminRoleName);
                    Console.WriteLine($"✅ Usuário admin criado: {defaultEmail}");
                    Console.WriteLine($"⚠️  IMPORTANTE: Altere a senha padrão em produção!");
                }
                else
                {
                    Console.WriteLine($"❌ Erro ao criar usuário admin: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }
            }
            else
            {
                // Garantir que o usuário existente tenha a role Admin
                if (!await userManager.IsInRoleAsync(existingAdmin, adminRoleName))
                {
                    await userManager.AddToRoleAsync(existingAdmin, adminRoleName);
                }
            }
        }
    }
}
