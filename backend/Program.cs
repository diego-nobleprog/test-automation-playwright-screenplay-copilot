using Npgsql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

const string connectionString =
    "Host=postgres;Port=5432;Database=labdb;Username=lab;Password=lab";

await EnsureDatabaseAsync();

app.MapGet("/", () => Results.Ok(new
{
    service = "Todo API",
    status = "running"
}));

app.MapGet("/api/tasks", async () =>
{
    var tasks = new List<TaskItem>();

    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();

    const string sql = """
        SELECT id, title, completed
        FROM tasks
        ORDER BY id;
        """;

    await using var command = new NpgsqlCommand(sql, connection);
    await using var reader = await command.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        tasks.Add(new TaskItem(
            reader.GetInt64(0),
            reader.GetString(1),
            reader.GetBoolean(2)
        ));
    }

    return Results.Ok(tasks);
});

app.MapGet("/api/tasks/{id:long}", async (long id) =>
{
    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();

    const string sql = """
        SELECT id, title, completed
        FROM tasks
        WHERE id = @id;
        """;

    await using var command = new NpgsqlCommand(sql, connection);
    command.Parameters.AddWithValue("id", id);

    await using var reader = await command.ExecuteReaderAsync();

    if (!await reader.ReadAsync())
    {
        return Results.NotFound();
    }

    var task = new TaskItem(
        reader.GetInt64(0),
        reader.GetString(1),
        reader.GetBoolean(2)
    );

    return Results.Ok(task);
});

app.MapPost("/api/tasks", async (CreateTaskRequest request) =>
{
    var title = request.Title.Trim();

    if (string.IsNullOrWhiteSpace(title))
    {
        return Results.BadRequest(new
        {
            error = "Title is required."
        });
    }

    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();

    const string sql = """
        INSERT INTO tasks (title, completed)
        VALUES (@title, false)
        RETURNING id, title, completed;
        """;

    await using var command = new NpgsqlCommand(sql, connection);
    command.Parameters.AddWithValue("title", title);

    await using var reader = await command.ExecuteReaderAsync();

    await reader.ReadAsync();

    var task = new TaskItem(
        reader.GetInt64(0),
        reader.GetString(1),
        reader.GetBoolean(2)
    );

    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.MapPatch("/api/tasks/{id:long}", async (
    long id,
    UpdateTaskRequest request) =>
{
    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();

    const string sql = """
        UPDATE tasks
        SET completed = @completed
        WHERE id = @id
        RETURNING id, title, completed;
        """;

    await using var command = new NpgsqlCommand(sql, connection);
    command.Parameters.AddWithValue("id", id);
    command.Parameters.AddWithValue("completed", request.Completed);

    await using var reader = await command.ExecuteReaderAsync();

    if (!await reader.ReadAsync())
    {
        return Results.NotFound();
    }

    var task = new TaskItem(
        reader.GetInt64(0),
        reader.GetString(1),
        reader.GetBoolean(2)
    );

    return Results.Ok(task);
});

app.MapDelete("/api/tasks/{id:long}", async (long id) =>
{
    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();

    const string sql = """
        DELETE FROM tasks
        WHERE id = @id;
        """;

    await using var command = new NpgsqlCommand(sql, connection);
    command.Parameters.AddWithValue("id", id);

    var deletedRows = await command.ExecuteNonQueryAsync();

    if (deletedRows == 0)
    {
        return Results.NotFound();
    }

    return Results.NoContent();
});

app.Run();

async Task EnsureDatabaseAsync()
{
    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();

    const string sql = """
        CREATE TABLE IF NOT EXISTS tasks (
            id BIGSERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT FALSE
        );
        """;

    await using var command = new NpgsqlCommand(sql, connection);
    await command.ExecuteNonQueryAsync();
}

record TaskItem(
    long Id,
    string Title,
    bool Completed
);

record CreateTaskRequest(
    string Title
);

record UpdateTaskRequest(
    bool Completed
);
