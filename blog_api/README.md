# The Blog Spot API

## Live Access
A live implementation of this API can be found at https://blog-api.ty0088.co.uk. The API is hosted using AWS Elastic Beanstalk.

## Project Description
"The Blog Spot" API is a RESTful backend API built using ExpressJS/Node for "The Blog Spot" web apps. Separate frontend web apps use this backend API to access and manage the apps' data ([The Blog Spot - Reader](https://github.com/ty0088/ty0088.github.io/tree/main/blog_reader) and [The Blog Spot - Author](https://github.com/ty0088/ty0088.github.io/tree/main/blog_author)).

## Project Features
* User authentication - user authentication is provided through the use of [passportJS and jwt cookie](https://www.passportjs.org/packages/passport-jwt/). Authentication tokens are encrypted.
* Inputs - User inputs are sanitised and validated before submission to the database.
* Database - Post and user data is hosted on non-relational database MongoDB using [Mongoose](https://mongoosejs.com/).
* Image hosting - Images are hosted on [AWS](https://aws.amazon.com/) S3. No credentials are exposed to frontend clients, as the server generates presigned URLs for access to the S3 bucket.
* Interface and architecture - This project follows the Create, Read, Update and Delete (CRUD) and Model, View, Controller (MVC) concepts. The backend endpoints follow the REST pattern.

## Purpose
This API was created as part of my self-learning on [The Odin Project](https://www.theodinproject.com/), specifically on the use and creation of APIs. The seperation of the frontend and backend and use of an API increases the flexibility and usability of the code. As demonstrated, several different frontends can take advantage of the backend API, such as different frontends for different users and also different types of frontend codes using the one backend. For example, both a web app or mobile app can use the same backend.

## Future
In it's current state, there are no further plans to develop this API. For the purposes of learning and this portfolio, it is simply not necessary.

## How to Use this Project
In the project directory, you can run:

### `npm serverstart` - for dev mode/debugging
or
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## License
The license for all my code can be found [here](https://github.com/ty0088/ty0088.github.io/blob/main/license.md).
