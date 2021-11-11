# Auth API with MongoDB

![WBS Coding School](https://mlsf03rmjfdn.i.optimole.com/fVWTwdQ.Z_5R~130ed/w:auto/h:auto/q:90/https://www.wbscodingschool.com/files/WBS_CODING_SCHOOL_logo.svg)

## Install

- Fork project
- Clone your fork:

```bash
git clone <link-to-project>
cd <project-directory>/
npm install
```

## Environment

Create a .env file with:

- MONGO_URI variable, it has to be a valid MongoDB connection string.
- JWT_SECRET
- ORIGIN (for CORS)

# Commands

## Dev

Dev commands runs app with nodemon

```bash
npm run dev
```

## Start

Start commands runs app with Node

```bash
npm start
```

## Features

- [x] Set up MongoDB
- [x] Create my User model with Mongoose
- [x] Create a new user -> POST /signup (returns token) + hashed password
- [x] Login -> /signin (returns token)
- [x] Get user info -> /me (returns user info if authenticated)

# API routes and methods

- POST /auth/signup

-- Sample request:

```json
{
  "name": String,
  "email": String,
  "password": String
}
```

-- Sample response

```json
{
  "token": JWTString
}
```

- POST /auth/signin

-- Sample request:

```json
{
  "email": String,
  "password": String
}
```

-- Sample response

```json
{
  "token": JWTString
}
```

- GET /auth/me (send token in header as "Authorization")

-- Sample response:

```json
{
  "_id": String,
  "name": String,
  "email": String
}
```

- GET /auth/verify-session (send token in header as "Authorization")

-- Sample response:

```json
{
  "success": "Valid token"
}
```
