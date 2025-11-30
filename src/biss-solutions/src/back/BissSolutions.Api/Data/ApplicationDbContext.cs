using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<AdminUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Partner> Partners { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Company> Companies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração da entidade Page
            modelBuilder.Entity<Page>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Slug).IsRequired();
                entity.HasIndex(e => e.Slug).IsUnique();
                entity.Property(e => e.Title).IsRequired();
                // Não configuramos a relação Page-Images para evitar múltiplos caminhos de cascata
            });

            // Configuração da entidade Component
            modelBuilder.Entity<Component>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Type).IsRequired();
                entity.HasOne(e => e.Page)
                      .WithMany(e => e.Components)
                      .HasForeignKey(e => e.PageId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configuração da entidade Image
            modelBuilder.Entity<Image>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FileName).IsRequired();
                entity.Property(e => e.OriginalName).IsRequired();
                entity.Property(e => e.Path).IsRequired();
                
                entity.HasOne(e => e.Component)
                      .WithMany(e => e.Images)
                      .HasForeignKey(e => e.ComponentId)
                      .OnDelete(DeleteBehavior.SetNull);
                      
                // Ignorar propriedade de navegação Page para evitar FK constraint
                // PageId é mantido como coluna mas sem constraint de FK
                // A relação com Page é indireta através de Component
                entity.Ignore(e => e.Page);
                
                // PageId como coluna normal sem FK
                entity.Property(e => e.PageId);
            });

            // Configuração da entidade Contact
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Subject).IsRequired();
                entity.Property(e => e.Message).IsRequired();
            });

            // Configuração da entidade Service
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired();
                entity.Property(e => e.Slug).IsRequired();
                entity.HasIndex(e => e.Slug).IsUnique();
            });

            // Configuração da entidade Partner
            modelBuilder.Entity<Partner>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Logo).HasMaxLength(500);
                entity.Property(e => e.Description).HasMaxLength(2000);
                entity.Property(e => e.Website).HasMaxLength(500);
                entity.Property(e => e.IsActive).IsRequired();
                entity.Property(e => e.Order).IsRequired();
                entity.Property(e => e.CreatedAt).IsRequired();
                entity.Property(e => e.UpdatedAt).IsRequired();
            });

            // Configuração da entidade Client
            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Versions).HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(2000);
                entity.Property(e => e.ServicesProvided).HasMaxLength(2000);
                entity.Property(e => e.Logo).HasMaxLength(500);
                entity.Property(e => e.ProjectImage).HasMaxLength(500);
                entity.Property(e => e.ProjectLink).HasMaxLength(500);
                entity.Property(e => e.Website).HasMaxLength(500);
                entity.Property(e => e.IsActive).IsRequired();
                entity.Property(e => e.Order).IsRequired();
                entity.Property(e => e.CreatedAt).IsRequired();
                entity.Property(e => e.UpdatedAt).IsRequired();
            });

            // Configuração da entidade Product
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired();
            });

            // Configuração da entidade Company
            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Id);
            });
        }
    }
}
