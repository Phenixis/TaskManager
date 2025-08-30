# Backend

## API endpoints

### /users

User Object = {
id: string;
username: string;
email: string;
password: string;
}

Username must match `/^[a-zA-Z0-9_\.-]{3,16}$/`, which can be described as a valid username containing 3 to 16 alphanumeric characters, underscores, dots, or hyphens.

Email must match `/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/`, which can be described as a valid email address.

Password must match `/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,24}$/`, which can be described as a strong password containing at least 8 characters, including at least 1 uppercase, 1 lowercase, 1 numeric, and 1 special characters without space.

#### GET /users

- Description: Retrieve a list of users
- Responses:
  - 200 OK / Array of user objects, without passwords.
  - 404 Not Found / No users found

#### POST /users

- Description: Create a new user
- Request Body: {
  username: string,
  email: string,
  password: string
  }
- Responses:
  - 200 OK / Created user object, with id and without password
  - 400 Bad Request / Validation errors, with explicit error message
    - Invalid username format
    - Invalid email format
    - Invalid password format
  - 409 Conflict / User already exists
    - Username already exists
    - Email already exists

#### GET /users/:username

- Description: Retrieve a specific user by username
- Responses:
  - 200 OK / User object, without password
  - 404 Not Found / User not found

#### PUT /users/:username

- Description: Update a specific user by username
- Request Body: {
  username?: string,
  email?: string,
  password?: string
  }
- Responses:
  - 200 OK / Updated user object, without password
  - 404 Not Found / User not found
  - 400 Bad Request / Validation errors, with explicit error message
    - Invalid username format
    - Invalid email format
    - Invalid password format
  - 409 Conflict / User already exists
    - Username already exists
    - Email already exists

#### DELETE /users/:username

- Description: Delete a specific user by username
- Responses:
  - 200 OK / Success message
  - 404 Not Found / User not found

### /tasks

Task Object = {
id: string;
title: string;
description: string;
userId: string;
status: "pending" | "in-progress" | "completed";
priority: "extremely low" | "low" | "medium" | "high" | "extremely high";
}

id format : <userId>-<taskIndex>
Title must be less than 101 characters long
Description must be less than 501 characters long
userId must be a valid ID of an existing user

#### GET /tasks

- Description: Retrieve a list of tasks
- Request Body: {
  userId: string
}
- Responses:
  - 200 OK / Array of task objects
  - 404 Not Found / No tasks found
  - 404 Not Found / User not found
  - 400 Bad Request / Invalid userId format

#### POST /tasks

- Description: Create a new task
- Request Body: {
  title: string,
  description: string,
  userId: string,
  status: "pending" | "in-progress" | "completed",
  priority: "extremely low" | "low" | "medium" | "high" | "extremely high"
  }
- Responses:
  - 201 Created / Created task object
  - 404 Not Found / User not found
  - 400 Bad Request / Validation errors, with explicit error message
    - Invalid title format
    - Invalid description format
    - Invalid userId format
    - Invalid status format
    - Invalid priority format

#### GET /tasks/:id

- Description: Retrieve a specific task by ID
- Request Body: {
  userId: string
}
- Responses:
  - 200 OK / Task object
  - 404 Not Found / User not found
  - 404 Not Found / Task not found
  - 400 Bad Request / Invalid id format
  - 400 Bad Request / Invalid userId format

#### PUT /tasks/:id

- Description: Update a specific task by ID
- Request Body: {
  id: string,
  userId: string,
  title?: string,
  description?: string,
  status?: "pending" | "in-progress" | "completed",
  priority?: "extremely low" | "low" | "medium" | "high" | "extremely high"
  }
- Responses:
  - 200 OK / Updated task object
  - 404 Not Found / User not found
  - 404 Not Found / Task not found
  - 400 Bad Request / Validation errors, with explicit error message
    - Invalid id format
    - Invalid title format
    - Invalid description format
    - Invalid userId format
    - Invalid status format
    - Invalid priority format

#### DELETE /tasks/:id

- Description: Delete a specific task by ID
- Responses:
  - 200 OK / Success message
  - 404 Not Found / User not found
  - 404 Not Found / Task not found
  - 400 Bad Request / Invalid id format
  - 400 Bad Request / Invalid userId format
