var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapAreaControllerRoute(
       name: "default",
       areaName: "api",
       pattern: "api/{controller=Square}/{action=getSquares}"
);

app.MapControllers();

app.Run();
