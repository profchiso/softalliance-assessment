# RESTful API FOR MANAGING MOVIES

Repository for technical assessment of Okorie Chinedu Sunday

# Introduction

This repository contains back-end implemention of a RESTful API build with Nodejs/express.js used for managing movies.

# Folder Structure

Bellow is a brief explanation of each folder

## Folder

1. **controllers** : This contains the business logic for the application.
2. **models** : This contains code that define the resource(movie) structures.
3. **routes** : This contains files that handles all the server routes.
4. **utils** : This contains utility logics that are mostly reusable.
5. **validations** : This contain file where the validation logics is implemented.

## How to set up the application

1. Clone the repository using the command `git clone https://github.com/profchiso/softalliance-assessment.git`

2. Install all dependencies using the command `npm install`
3. Set the environment variables as found **[here](https://github.com/profchiso/softalliance-assessment/blob/main/sample.env.txt)** I can provide my test cloudinary credentials via email if you don't have one because I used it for the photo upload.
4. Run the application using the command `node app.js` or `npm start`

# Other informations

- The API documentation can be found **[here](https://documenter.getpostman.com/view/7669287/2s9YRB3CNw)**, you can also import the documentation using the **Movie API.postman_collection.json** file in the root directory of the project.

- The required `env` variables are also in the **sample.env.txt** file in the root directory of the project

- The `photo` field must be sent as a base64 encoded string when making a `POST` request to the endpoint

- For further classification, reach me via my **[email](mailto:okoriechinedusunday@gmail.com)**
