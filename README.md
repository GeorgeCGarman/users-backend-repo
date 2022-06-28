# API for users
This is a CRUD based backend API using express js to store users in a MongoDB database. I used Postman to send requests.

# Start the server
    $ node server.js

# API

## Get all users
`GET localhost:3000/users`

## Get specific user
`GET localhost:3000/users/:id`

## Create new user
`POST localhost:3000/users/`

Give username and password in request body

## Update user
`POST localhost:3000/users/`

Give ID in request body and give new username and/or password

## Delete user
`POST localhost:3000/users/`

Give ID in request body