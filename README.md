# API for users

This is a CRUD based backend API using express js to store users in a MongoDB database. Use Postman to send requests.

Users can register a new account, then login and view data, and logout. There are 3 different roles for users: admin, mod, user. Admins and mods can view and change users (but only admins can change users' roles). The project uses access tokens and refresh tokens for user authentication. When a user logins in via /auth a refresh token is generated and stored in the database inside that user's document, as well as their cookies inside their browser. They are also provided an access token. The access token lets them access routes in the API, by adding it as a bearer token to the authorization header. The access token lasts for 60s. After this the user must go to /refresh, which checks their refresh token cookie is valid. They can then obtain a new access token.

# API

### Base url: https://user-backend-project.herokuapp.com

## Register

`POST /register`

(https://user-backend-project.herokuapp.com/register)

Register by providing username and password in as form

![Alt text](/screenshots/register.png)

## Login

`POST /auth`

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

`PUT /users`

Give ID in request body and give new username and/or password. Mods can update users, but only admins can changes the user's role, so only admins can make a user a mod, or a mod an admin.

![Alt text](/screenshots/updateUser.png)

## Delete user

`DELETE /users`

Give ID in request body. Only admins can delete users.

![Alt text](/screenshots/deleteUser.png)

## Logout

`GET /logout`

Clears cookies and remove refresh token from database.
