# The Blog Spot - Reader

## Project Description
"The Blog Spot - Reader" is a React frontend only web app that allows users (Readers) or visitors to read a list of blog posts from various blog Authors. A seperate frontend web app is used by Authors to create and manage their blog posts ([The Blog Spot - Author](https://github.com/ty0088/ty0088.github.io/tree/main/blog_author)). This frontend web app uses a seperate restful backend API to access and edit data ([The Blog Spot API](https://github.com/ty0088/ty0088.github.io/tree/main/blog_author)).

## Project Features
* Visitor access - Visitors (non registered users) can read the full list of blog posts, however are not permitted to see who posted the blog post or read and create comments.
* Registered user privileges - Registered users are able to see post details such as the blog author, if the post has been edited and read and create post comments. Registered users can also see other users' details and access a list of user's posts and comments.
* User management and authentication - The web app allows users to sign up and manage their account details (update/delete). Authentication of users is done using through the backend API using passportJS and jwt cookie.
* Blog list navigation - The home page blog list is paginated with a default view of 5 pages and newest shown first; these can be toggled.
* Blog post reading - Users can 
* Demo account - A demo account is available for visitors to access user features. The demo account is read only, although the demo user can access everything a registered user can, any data submitted by the demo account will not be written to the backend.
* Responsiveness - The web app has been designed to allow for narrow screen access i.e. smartphones.

## Purpose
This web app was created as part of my self-learning on [The Odin Project](https://www.theodinproject.com/), specifically on the use and creation of APIs. The seperation of the frontend and backend and use of an API increases the flexibility of the code and it's use. As demonstrated, several different frontends can take advantage of the backend API, such as different frontends for different users and also different types of frontend codes using the one backend. For example, both a web app or mobile app can use the same backend.

## Future
In it's current state, there are no further plans to develop this web app. For the purposes of learning and this portfolio, it is simply not necessary.

## How to Use this Project
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## License
The license for all my code can be found [here](https://github.com/ty0088/ty0088.github.io/blob/main/license.md).

