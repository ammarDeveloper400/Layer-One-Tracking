using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class blogactivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogActivityLog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BlogId = table.Column<int>(type: "int", nullable: true),
                    ViewCount = table.Column<int>(type: "int", nullable: false),
                    ReadCount = table.Column<int>(type: "int", nullable: false),
                    RecommendCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogActivityLog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlogActivityLog_Blog_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blog",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlogActivityLog_BlogId",
                table: "BlogActivityLog",
                column: "BlogId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogActivityLog");
        }
    }
}
