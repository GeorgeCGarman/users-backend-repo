# API for users

This is a CRUD based backend API using express js to store users in a MongoDB database. Use Postman to send requests.

# API

### Base url: https://user-backend-project.herokuapp.com

## Register

`POST /register`

(https://user-backend-project.herokuapp.com/register)

Register by providing username and password in as form

![Alt text](/screenshots/register.png)

## Login

`GET /auth`

Login as the new user to get a access token. This will last for 60s. Logging in also generates a new refresh token stored in the database and cookies.

![Alt text](/screenshots/login.png)

## Get all users

`GET /users`

New accounts are all assigned the role of 'user'. The user is only permitted to view specific users. 'Admins' and 'moderators' can view all users at once.

![Alt text](/screenshots/getUsers.png)

## Get specific user

`GET /users/:id`

![Alt text](/screenshots/getUser.png)

## Create new user

`POST /users`

Give username and password in request body. Admins and mods can create new users like this.

![Alt text](/screenshots/newUser.png)

## Update user

`POST /users`

Give ID in request body and give new username and/or password. Mods can update users, but only admins can changes the user's role, so only admins can make a user a mod, or a mod an admin.

![Alt text](/screenshots/updateUser.png)

## Delete user

`POST /users`

Give ID in request body. Only admins can delete users.

![Alt text](/screenshots/deleteUser.png)
