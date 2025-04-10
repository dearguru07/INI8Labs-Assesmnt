# User Registration CRUD App

A simple full-stack app using:

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL

## Features

- View all users
- Add new user
- Edit user info
- Delete user

## How to Run

1. Create a MySQL DB with a `users` table:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100) UNIQUE,
     dob DATE
   );
   ```

npm install
node server.js
