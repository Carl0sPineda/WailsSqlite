package main

import (
    "context"
    "database/sql"
    _ "github.com/mattn/go-sqlite3"
    "github.com/sethvargo/go-password/password"
)

// User struct
type User struct {
    ID       int
    Name     string
    Email    string
    Password string
}

// App struct
type App struct {
    ctx context.Context
    db  *sql.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
    // Open SQLite database
    db, err := sql.Open("sqlite3", "./data.db")
    if err != nil {
        panic(err)
    }

    // Create table if not exists
    _, err = db.Exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT
    )`)
    if err != nil {
        panic(err)
    }

    return &App{db: db}
}

func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
}

func (a *App) AddUser(name, email, password string) error {
    _, err := a.db.Exec("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", name, email, password)
    return err
}

func (a *App) DeleteUser(ID int) error {
    _, err := a.db.Exec("DELETE FROM users WHERE id = ?", ID)
    return err
}

func (a *App) EditUser(ID int, name, email, password string) error {
    _, err := a.db.Exec("UPDATE users SET name=?, email=?, password=? WHERE id=?", name, email, password, ID)
    return err
}

func (a *App) ListUsers() ([]User, error) {
    rows, err := a.db.Query("SELECT * FROM users")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var user User
        err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Password)
        if err != nil {
            return nil, err
        }
        users = append(users, user)
    }
    return users, nil
}

func (a *App) GeneratePassword() (string, error) {
    // Generate a password that is 12 characters long with 4 digits, 4 symbols,
  // allowing upper and lower case letters, disallowing repeat characters.
    generatedPassword, err := password.Generate(12, 4, 4, false, false)
    if err != nil {
        return "", err
    }
    return generatedPassword, nil
}