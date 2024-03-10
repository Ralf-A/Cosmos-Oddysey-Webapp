using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cosmos_Oddysey.Migrations
{
    /// <inheritdoc />
    public partial class migrationcosmos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    FlightID = table.Column<string>(type: "text", nullable: false),
                    CompanyName = table.Column<string>(type: "text", nullable: true),
                    Origin = table.Column<string>(type: "text", nullable: true),
                    Destination = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Distance = table.Column<long>(type: "bigint", nullable: false),
                    DepartureTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ArrivalTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ValidUntil = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    isValid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.FlightID);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    ReservationID = table.Column<string>(type: "text", nullable: false),
                    TravelID = table.Column<string>(type: "text", nullable: true),
                    FlightID = table.Column<string>(type: "text", nullable: true),
                    isValid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.ReservationID);
                });

            migrationBuilder.CreateTable(
                name: "Travels",
                columns: table => new
                {
                    TravelID = table.Column<string>(type: "text", nullable: false),
                    PassengerFirstName = table.Column<string>(type: "text", nullable: true),
                    PassengerLastName = table.Column<string>(type: "text", nullable: true),
                    Distance = table.Column<long>(type: "bigint", nullable: false),
                    Duration = table.Column<long>(type: "bigint", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    isValid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Travels", x => x.TravelID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Flights");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Travels");
        }
    }
}
