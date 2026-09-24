# Course Enrollment System

A REST API-based Course Enrollment System built using Node.js, Express.js and MongoDB.

## Features

- User registration and login
- JWT authentication
- Role-based authorization
- Admin course management
- View active courses
- Student course enrollment
- Duplicate enrollment prevention
- Student enrollment history
- Drop enrollment
- Admin enrollment management
- Course capacity management

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Postman

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Courses

GET /api/courses

POST /api/courses

PUT /api/courses/:id

PATCH /api/courses/:id/deactivate

### Enrollments

POST /api/enrollments

GET /api/enrollments/my

PATCH /api/enrollments/:id/drop

GET /api/enrollments/all

PATCH /api/enrollments/:id/status

## Test Admin Credentials

Email: admin@test.com

Password: admin123

## Running the Project

npm install

npm run dev

## Postman Collection

The Postman collection is included in this repository for testing the Course Enrollment System APIs.

It contains requests covering:

* User registration and login
* Admin login
* Viewing active courses
* Creating, updating and deactivating courses
* Student enrollment
* Viewing student enrollments
* Dropping courses
* Admin enrollment management
* Duplicate enrollment failure
* Duplicate course creation failure
* Unauthorized access
* Invalid login and authentication failures

### How to Use

1. Open Postman.
2. Click **Import**.
3. Select the file:

`postman/Course-Enrollment-System.postman_collection.json`

4. Import the collection.
5. Start the Node.js server using:

`npm run dev`

6. Run the requests from the collection.
