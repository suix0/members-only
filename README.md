## Members Only

An exclusive clubhouse where members can write anonymous posts. Inside the clubhouse, members can see the author of each post, but outsiders can only see the content. Built with Node.js, Express, Passport.js, PostgreSQL, and Tailwind CSS.

## Project Screen Shot(s)

### Desktop View

![image](https://github.com/user-attachments/assets/c2173226-90f2-4ad1-b15b-3f321cf38558)

![image](https://github.com/user-attachments/assets/9ccdeb96-3027-480d-a9c4-1da5d4dd1f8b)

### Mobile View

![image](https://github.com/user-attachments/assets/f58633e4-3c54-4ed1-a817-25ab9355c8b6)

![image](https://github.com/user-attachments/assets/d23b2fe6-fc7b-4631-bd40-e3c74a255de0)



## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Build and Watch Tailwind Styles:  

`npm run build:css`
`npm run watch:css`

To Start Server:

`node --watch app.js`  

To Visit App:

`localhost:5000`  

## Reflection

### Context

This project was part of The Odin Project, designed to help me implement and practice authentication using Passport.js in an Express application.

### Goals

The objective was to build a private club where only verified members could see message authors and allow admin users to delete messages.

### Challenges and Learning Experience

Initially, authentication was difficult to grasp conceptually, but implementing it and seeing it in action significantly improved my understanding. Working with Passport.js and handling user sessions gave me practical experience with authentication workflows.

### Unexpected Obstacles

There weren’t many significant challenges. If anything, making the UI responsive took some extra effort, but that wasn’t a major issue.

### Tools Used

Node.js & Express – Backend framework.

PostgreSQL – Database for user and message storage.

Passport.js – Authentication middleware.

Bcrypt.js – Secure password hashing.

EJS – Templating engine for dynamic views.

Tailwind CSS v4 – Styling.

Railway.app – Deployment.
