﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPISample.Data;

namespace WebAPISample.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20201102192009_added image source variable to movie class")]
    partial class addedimagesourcevariabletomovieclass
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPISample.Models.Movie", b =>
                {
                    b.Property<int>("MovieId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Director")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Genre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageSource")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MovieId");

                    b.ToTable("Movies");

                    b.HasData(
                        new
                        {
                            MovieId = 1,
                            Director = "Martin Scorsese",
                            Genre = "Drama",
                            Title = "The Departed"
                        },
                        new
                        {
                            MovieId = 2,
                            Director = "Christopher Nolan",
                            Genre = "Drama",
                            Title = "The Dark Knight"
                        },
                        new
                        {
                            MovieId = 3,
                            Director = "Christopher Nolan",
                            Genre = "Drama",
                            Title = "Inception"
                        },
                        new
                        {
                            MovieId = 4,
                            Director = "David Gordon Green",
                            Genre = "Comedy",
                            Title = "Pineapple Express"
                        },
                        new
                        {
                            MovieId = 5,
                            Director = "John McTiernan",
                            Genre = "Action",
                            Title = "Die Hard"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
