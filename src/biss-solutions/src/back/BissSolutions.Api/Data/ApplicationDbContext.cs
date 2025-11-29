using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Contact> Contacts { get; set; }

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
                      
                entity.HasOne(e => e.Page)
                      .WithMany(e => e.Images)
                      .HasForeignKey(e => e.PageId)
                      .OnDelete(DeleteBehavior.SetNull);
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
        }
    }
}
