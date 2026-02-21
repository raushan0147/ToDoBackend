# ToDo Backend API Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Project Structure](#project-structure)
5. [Environment Variables](#environment-variables)
6. [Database Configuration](#database-configuration)
7. [API Architecture](#api-architecture)
8. [Models](#models)
9. [Controllers](#controllers)
10. [Routes](#routes)
11. [Running the Application](#running-the-application)
12. [API Endpoints](#api-endpoints)
13. [Error Handling](#error-handling)
14. [Best Practices & Improvements](#best-practices--improvements)

---

## Project Overview

### What is ToDo Backend?
The **ToDo Backend API** is a RESTful web service built with **Node.js** and **Express.js** that allows users to manage their to-do tasks efficiently. It provides complete CRUD (Create, Read, Update, Delete) operations for managing to-do items stored in a **MongoDB** database.

### Key Features
- **Create** new to-do items with title and description
- **Read** all to-dos or fetch a specific to-do by ID
- **Update** existing to-do items
- **Delete** to-do items
- **Timestamps** for tracking creation and update times
- **Error Handling** with proper HTTP status codes

### Technology Stack
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for building APIs |
| **MongoDB** | NoSQL database for data storage |
| **Mongoose** | ODM (Object Data Modeling) library |
| **dotenv** | Environment variable management |

---

## Prerequisites

Before setting up this project, ensure you have the following installed:

### System Requirements
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) - Node Package Manager
- **MongoDB** - Either local installation or MongoDB Atlas cloud account
- **MongoDBCompass** (optional) - GUI tool for MongoDB visualization
- **Postman** or **Thunder Client** (optional) - For testing API endpoints

### Knowledge Requirements
- Basic understanding of JavaScript/Node.js
- Familiarity with REST API concepts
- Understanding of async/await in JavaScript
- Basic MongoDB and Mongoose knowledge

---

## Installation & Setup

### Step 1: Clone or Create Project
```bash
cd path/to/your/projects
mkdir toDoBackend
cd toDoBackend
```

### Step 2: Initialize Node Project
```bash
npm init -y
```

### Step 3: Install Required Dependencies
```bash
npm install express mongoose dotenv
```

### Step 4: Project Structure Setup
Create the following folder structure:
```
toDoBackend/
├── config/
│   └── database.js
├── controllers/
│   ├── createTodo.js
│   ├── deleteTodo.js
│   ├── getTodo.js
│   └── updateTodo.js
├── models/
│   └── Todo.js
├── routes/
│   └── todos.js
├── .env
├── index.js
├── package.json
└── Readme.md
```

### Step 5: Create .env File
Create a `.env` file in the root directory with the following variables:
```env
PORT=4000
DATABASE_URL=mongodb://localhost:27017/todoDb
NODE_ENV=development
```

---

## Project Structure

### Directory Breakdown

#### 📁 **config/**
Contains configuration files for external services and connections.
- **database.js** - MongoDB connection configuration using Mongoose

#### 📁 **controllers/**
Contains business logic for handling requests and responses.
- **createTodo.js** - Logic to create new to-do items
- **getTodo.js** - Logic to fetch all or specific to-do items
- **updateTodo.js** - Logic to update existing to-do items
- **deleteTodo.js** - Logic to delete to-do items

#### 📁 **models/**
Contains Mongoose schema definitions.
- **Todo.js** - To-do data model with schema definition

#### 📁 **routes/**
Contains API route definitions.
- **todos.js** - All to-do related API routes

#### 📄 **index.js**
Main entry point of the application where:
- Express server is configured
- Middleware is setup
- Routes are mounted
- Database connection is initialized
- Server listens on specified PORT

---

## Environment Variables

Environment variables are used to store sensitive information and configuration settings that should not be hardcoded.

### Required Environment Variables

| Variable | Description | Default Value | Example |
|----------|-------------|----------------|---------|
| `PORT` | Server port number | 4000 | 4000, 5000, 8000 |
| `DATABASE_URL` | MongoDB connection string | - | mongodb://localhost:27017/todoDb |
| `NODE_ENV` | Application environment | development | development, production, testing |

### How to Use Environment Variables
```javascript
// Access in your code
const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;
```

### Why Use Environment Variables?
✅ Keep sensitive data (passwords, URLs) out of version control
✅ Easy configuration switching between development and production
✅ Secure API keys and credentials
✅ Flexible deployment across different environments

---

## Database Configuration

### Overview
The database configuration file establishes a connection to MongoDB using Mongoose ODM.

### File Location
📄 [config/database.js](config/database.js)

### Connection Details

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected successfully"))
    .catch((error) => {
        console.log("Issue in connection");
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;
```

### Key Components

**Mongoose Connection Options:**
- `useNewUrlParser: true` - Uses the new URL string parser
- `useUnifiedTopology: true` - Uses the new connection management engine

**Success Handler:**
- Logs "Connected successfully" when database connection is established

**Error Handler:**
- Catches connection errors and displays error message
- Exits the process with code 1 on connection failure

### MongoDB Connection String Format
```
mongodb://[username:password@]hostname[:port]/[database]
```

**Examples:**
- Local: `mongodb://localhost:27017/todoDb`
- MongoDB Atlas: `mongodb+srv://user:password@cluster.mongodb.net/todoDb`

---

## API Architecture

### MVC Pattern
This project follows the **Model-View-Controller (MVC)** architecture pattern:

```
Route Request
    ↓
Router (routes/todos.js)
    ↓
Controller (controllers/*.js) - Business Logic
    ↓
Model (models/Todo.js) - Database Schema
    ↓
Database (MongoDB)
    ↓
Response back to Client
```

### Request-Response Flow

1. **Client sends HTTP request** to API endpoint
2. **Express router** matches the request to appropriate route
3. **Controller** processes the request and applies business logic
4. **Model** interacts with MongoDB database
5. **Response** is sent back to client with status and data

---

## Models

### Todo Model

#### File Location
📄 [models/Todo.js](models/Todo.js)

#### Schema Definition
The Todo model defines the structure of all to-do documents stored in MongoDB.

```javascript
const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        maxLength: 50
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("Todo", toDoSchema);
```

#### Field Descriptions

| Field | Type | Required | Constraints | Purpose |
|-------|------|----------|-------------|---------|
| `title` | String | Yes | Max 50 characters | Brief title of the to-do item |
| `description` | String | Yes | Max 50 characters | Detailed description of the task |
| `createdAt` | Date | Yes | Auto-set to current time | Timestamp when item was created |
| `updatedAt` | Date | Yes | Auto-set to current time | Timestamp when item was last updated |

#### Schema Features
- **Data Validation** - All fields are required
- **Field Length Limits** - Title and description capped at 50 characters
- **Automatic Timestamps** - Dates automatically set when document is created
- **MongoDB Integration** - Schema is converted to MongoDB collection

---

## Controllers

Controllers contain the business logic for handling API requests and generating responses.

### 1. Create Todo Controller

#### File Location
📄 [controllers/createTodo.js](controllers/createTodo.js)

#### Function: `createTodo()`

**Purpose:** Creates a new to-do item in the database

**Request Format:**
```json
POST /api/v1/createTodos

{
    "title": "Complete Project",
    "description": "Finish the API documentation"
}
```

**Response on Success (Status 200):**
```json
{
    "success": true,
    "data": {
        "_id": "60d5ec49c1234567890abc12",
        "title": "Complete Project",
        "description": "Finish the API documentation",
        "createdAt": "2024-02-21T10:30:00.000Z",
        "updatedAt": "2024-02-21T10:30:00.000Z"
    },
    "message": "Entry created successfully"
}
```

**Response on Error (Status 500):**
```json
{
    "success": false,
    "data": "internal server error",
    "message": "[error details]"
}
```

**Process Flow:**
1. Extract `title` and `description` from request body
2. Create new Todo document in database
3. Return success response with created document
4. Catch and handle any errors

---

### 2. Get Todo Controller

#### File Location
📄 [controllers/getTodo.js](controllers/getTodo.js)

#### Function: `getTodo()`

**Purpose:** Retrieves all to-do items from the database

**Request Format:**
```
GET /api/v1/getTodos
```

**Response on Success (Status 200):**
```json
{
    "success": true,
    "data": [
        {
            "_id": "60d5ec49c1234567890abc12",
            "title": "Complete Project",
            "description": "Finish the API",
            "createdAt": "2024-02-21T10:30:00.000Z",
            "updatedAt": "2024-02-21T10:30:00.000Z"
        }
    ],
    "message": "entire Todo data"
}
```

**Response on Error (Status 500):**
```json
{
    "success": false,
    "error": "[error details]",
    "message": "Server Error"
}
```

---

#### Function: `getTodoById()`

**Purpose:** Retrieves a specific to-do item by its ID

**Request Format:**
```
GET /api/v1/getTodo/:id
```

**Response on Success (Status 200):**
```json
{
    "success": true,
    "data": {
        "_id": "60d5ec49c1234567890abc12",
        "title": "Complete Project",
        "description": "Finish API documentation",
        "createdAt": "2024-02-21T10:30:00.000Z",
        "updatedAt": "2024-02-21T10:30:00.000Z"
    },
    "message": "Todo 60d5ec49c1234567890abc12 data fetched successfully"
}
```

**Response when Not Found (Status 404):**
```json
{
    "success": false,
    "message": "no data find for given id"
}
```

**Process Flow:**
1. Extract ID from URL parameters
2. Query database for document with matching ID
3. If not found, return 404 status
4. If found, return document with success status

---

### 3. Update Todo Controller

#### File Location
📄 [controllers/updateTodo.js](controllers/updateTodo.js)

#### Function: `updateTodo()`

**Purpose:** Updates an existing to-do item

**Request Format:**
```
PUT /api/v1/updateTodo/:id

{
    "title": "Updated Title",
    "description": "Updated description"
}
```

**Response on Success (Status 200):**
```json
{
    "success": true,
    "data": {
        "_id": "60d5ec49c1234567890abc12",
        "title": "Updated Title",
        "description": "Updated description",
        "createdAt": "2024-02-21T10:30:00.000Z",
        "updatedAt": "2024-02-21T11:45:00.000Z"
    },
    "message": "Updated successfully"
}
```

**Response on Error (Status 500):**
```json
{
    "success": false,
    "error": "[error details]",
    "message": "Server Error"
}
```

**Process Flow:**
1. Extract ID from URL parameters
2. Extract new `title` and `description` from request body
3. Update document with new values and current timestamp
4. Return updated document or error message

---

### 4. Delete Todo Controller

#### File Location
📄 [controllers/deleteTodo.js](controllers/deleteTodo.js)

#### Function: `deleteTodo()`

**Purpose:** Deletes a to-do item from the database

**Request Format:**
```
DELETE /api/v1/deleteTodo/:id
```

**Response on Success (Status 200):**
```json
{
    "success": true,
    "message": "todo deleted"
}
```

**Response on Error (Status 500):**
```json
{
    "success": false,
    "error": "[error details]",
    "message": "Server Error"
}
```

**Process Flow:**
1. Extract ID from URL parameters
2. Find and delete document with matching ID
3. Return success response
4. Catch and handle any errors

---

## Routes

### File Location
📄 [routes/todos.js](routes/todos.js)

### Route Definitions

The routes file defines all available API endpoints and maps them to their respective controller functions.

```javascript
const express = require('express');
const router = express.Router();

const {createTodo} = require('../controllers/createTodo');
const {getTodo, getTodoById} = require("../controllers/getTodo");
const {updateTodo} = require('../controllers/updateTodo');
const {deleteTodo} = require('../controllers/deleteTodo');

// Define API routes
router.post("/createTodos", createTodo);
router.get("/getTodos", getTodo);
router.get('/getTodo/:id', getTodoById);
router.put('/updateTodo/:id', updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
```

### Route Summary

| Method | Endpoint | Handler | Purpose |
|--------|----------|---------|---------|
| POST | `/api/v1/createTodos` | createTodo | Create new to-do |
| GET | `/api/v1/getTodos` | getTodo | Fetch all to-dos |
| GET | `/api/v1/getTodo/:id` | getTodoById | Fetch specific to-do |
| PUT | `/api/v1/updateTodo/:id` | updateTodo | Update to-do item |
| DELETE | `/api/v1/deleteTodo/:id` | deleteTodo | Delete to-do item |

---

## Running the Application

### Step 1: Start MongoDB

**If using Local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

**If using MongoDB Atlas (Cloud):**
- Database URL is already configured in `.env`

### Step 2: Start the Server

```bash
node index.js
```

### Expected Output
```
server started at 4000
connected successfully
```

### Step 3: Verify Server is Running

Open your browser and visit:
```
http://localhost:4000/
```

You should see a response message from the default route.

### Stop the Server
Press `Ctrl + C` in the terminal

---

## API Endpoints

### Base URL
```
http://localhost:4000/api/v1
```

### Complete API Reference

#### 1. Create a New Todo
```
POST /api/v1/createTodos
Content-Type: application/json

Body:
{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
}
```

#### 2. Get All Todos
```
GET /api/v1/getTodos
```

#### 3. Get Todo by ID
```
GET /api/v1/getTodo/60d5ec49c1234567890abc12
```

#### 4. Update a Todo
```
PUT /api/v1/updateTodo/60d5ec49c1234567890abc12
Content-Type: application/json

Body:
{
    "title": "Updated title",
    "description": "Updated description"
}
```

#### 5. Delete a Todo
```
DELETE /api/v1/deleteTodo/60d5ec49c1234567890abc12
```

### Using Postman/Thunder Client

**Step 1:** Create a new request
**Step 2:** Select HTTP method (GET, POST, PUT, DELETE)
**Step 3:** Enter URL: `http://localhost:4000/api/v1/getTodos`
**Step 4:** For POST/PUT requests, go to Body tab and select "raw" → "JSON"
**Step 5:** Add request body and send

---

## Error Handling

### HTTP Status Codes Used

| Status Code | Meaning | When Used |
|-------------|---------|-----------|
| **200** | OK | Request successful |
| **404** | Not Found | To-do ID doesn't exist |
| **500** | Internal Server Error | Server or database error |

### Common Error Responses

### 1. Missing Required Fields
**Example:** Creating a todo without title
```json
{
    "success": false,
    "error": "Validation Error: required field missing"
}
```

### 2. Invalid Todo ID
**Example:** Fetching non-existent todo
```json
{
    "success": false,
    "message": "no data find for given id"
}
```

### 3. Database Connection Error
```json
{
    "success": false,
    "error": "Cannot connect to database",
    "message": "Server Error"
}
```

### Best Practices for Error Handling

✅ Always include a `success` flag in response
✅ Provide meaningful error messages
✅ Use appropriate HTTP status codes
✅ Log errors in console for debugging
✅ Don't expose sensitive system information to client

---

## Best Practices & Improvements

### Current Strengths ✅
- RESTful API design
- Proper separation of concerns (MVC pattern)
- Environment variable usage for configuration
- Error handling with try-catch blocks
- Consistent response format

### Areas for Improvement 🔧

#### 1. **Add Input Validation**
```javascript
// Validate inputs before database operation
if (!title || !description) {
    return res.status(400).json({
        success: false,
        message: "Title and description are required"
    });
}
```

#### 2. **Add Authentication**
```javascript
// Implement JWT tokens for user authentication
const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
```

#### 3. **Add Request Logging**
```javascript
// Use morgan middleware for request logging
app.use(morgan('combined'));
```

#### 4. **Implement Pagination**
```javascript
// For getTodo - fetch limited results
const page = req.query.page || 1;
const limit = 10;
const todos = await Todo.find()
    .skip((page - 1) * limit)
    .limit(limit);
```

#### 5. **Add Data Sanitization**
```javascript
// Prevent NoSQL injection attacks
const sanitizeHtml = require('sanitize-html');
const cleanTitle = sanitizeHtml(title);
```

#### 6. **Implement Soft Delete**
```javascript
// Add isDeleted field instead of permanent deletion
const toDoSchema = new mongoose.Schema({
    ...existing fields...,
    isDeleted: {
        type: Boolean,
        default: false
    }
});
```

#### 7. **Add Request Rate Limiting**
```javascript
// Prevent abuse by limiting requests
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
```

#### 8. **Fix Bug in database.js**
Change `process.env(1)` to `process.exit(1)`

#### 9. **Fix Typo in getTodo.js**
Change `sucess` to `success` in response

#### 10. **Implement Proper Logging**
```javascript
// Use winston or bunyan for production logging
const logger = require('./logger');
logger.info('Todo created successfully');
```

---

## Project Dependencies

### Required Packages
```json
{
    "dependencies": {
        "express": "^4.18.2",
        "mongoose": "^7.0.0",
        "dotenv": "^16.0.3"
    }
}
```

### Installation Command
```bash
npm install express mongoose dotenv
```

### Optional Packages for Enhancement
```bash
npm install morgan cors jsonwebtoken bcrypt express-validator
```

---

## Conclusion

This ToDo Backend API provides a solid foundation for managing to-do items. The modular architecture makes it easy to extend and maintain. By following the improvement suggestions and best practices, you can enhance security, performance, and user experience.

### Next Steps
1. ✅ Set up environment variables
2. ✅ Connect to MongoDB
3. ✅ Test all API endpoints
4. ✅ Implement suggested improvements


---

**Created:** February 21, 2026
**Version:** 1.0.0
**Author:** Development Team
**Last Updated:** February 21, 2026
