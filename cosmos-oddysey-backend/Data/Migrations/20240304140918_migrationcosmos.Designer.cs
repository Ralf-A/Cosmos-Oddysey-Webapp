﻿// <auto-generated />
using System;
using CosmosOdyssey.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Cosmos_Oddysey.Migrations
{
    [DbContext(typeof(ApiContext))]
    [Migration("20240304140918_migrationcosmos")]
    partial class migrationcosmos
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("CosmosOdyssey.Models.Flight", b =>
                {
                    b.Property<string>("FlightID")
                        .HasColumnType("text");

                    b.Property<DateTime>("ArrivalTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CompanyName")
                        .HasColumnType("text");

                    b.Property<DateTime>("DepartureTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Destination")
                        .HasColumnType("text");

                    b.Property<long>("Distance")
                        .HasColumnType("bigint");

                    b.Property<string>("Origin")
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<DateTime>("ValidUntil")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("isValid")
                        .HasColumnType("integer");

                    b.HasKey("FlightID");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("CosmosOdyssey.Models.Reservation", b =>
                {
                    b.Property<string>("ReservationID")
                        .HasColumnType("text");

                    b.Property<string>("FlightID")
                        .HasColumnType("text");

                    b.Property<string>("TravelID")
                        .HasColumnType("text");

                    b.Property<int>("isValid")
                        .HasColumnType("integer");

                    b.HasKey("ReservationID");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("CosmosOdyssey.Models.Travel", b =>
                {
                    b.Property<string>("TravelID")
                        .HasColumnType("text");

                    b.Property<long>("Distance")
                        .HasColumnType("bigint");

                    b.Property<long>("Duration")
                        .HasColumnType("bigint");

                    b.Property<string>("PassengerFirstName")
                        .HasColumnType("text");

                    b.Property<string>("PassengerLastName")
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<int>("isValid")
                        .HasColumnType("integer");

                    b.HasKey("TravelID");

                    b.ToTable("Travels");
                });
#pragma warning restore 612, 618
        }
    }
}
