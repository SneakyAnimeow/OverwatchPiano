using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Piano.Data
{
    public partial class PianoContext : DbContext
    {
        public PianoContext()
        {
        }

        public PianoContext(DbContextOptions<PianoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Song> Songs { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                var appConfig = Setup.GetAppConfig;
                var config = appConfig.MssqlConfig;
                optionsBuilder.UseSqlServer(
                    $"Server={config.Server}{(config.Port > 0 ? "," + config.Port  : "")}; Database={config.Database}; {(appConfig.PianoConfig.IsWindowsAuth ? "Integrated Security=True;" : $"User={config.User}; Password={config.Password}")}");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Song>(entity =>
            {
                entity.ToTable("Song");

                entity.Property(e => e.Author).HasMaxLength(128);

                entity.Property(e => e.Data).IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(256);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
