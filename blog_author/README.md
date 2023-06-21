# The Blog Spot - Author

## Live Access
A live implementation of this web app can be found at https://ty0088.github.io/blog_author.

## Project Description
"The Blog Spot - Author" is a React frontend only web app that allows users (Authors) to create and manage their own blog posts. A separate frontend web app is used by Readers of the blog posts to read the blog posts ([The Blog Spot - Reader](https://github.com/ty0088/ty0088.github.io/tree/main/blog_reader)). This frontend web app uses a separate restful backend API to access and edit data ([The Blog Spot API](https://github.com/ty0088/ty0088.github.io/tree/main/blog_author)).

## Project Features
* Author only access - Only registered Author users can access this web app. If a registered Reader user attempts to access this web app, they will automatically be redirected to "The Blog Spot - Reader" web app. Non-logged in visitors cannot access any parts of the web app except the log in and sign up pages.
* Blog post creation - Blog posts must have a title and text content. The post text editor is rich text using [TinyMCE](https://www.tiny.cloud/). Each post can have one accompanying image (limited to jpeg and no larger than 10MB). Blog posts can be published as public (visible to all) or private (only visible to it's own Author and site Admin). 
* Blog post management - Authors are shown a list of their own blog posts (viewed in list or post form), which they can read, edit or delete (images can also be separately changed or deleted).
* Demo account - A demo account is available for visitors to access user features. The demo account is read only, although the demo user can access everything a registered user can, any data submitted by the demo account will not be saved.
* Responsiveness - The web app has been designed to allow for narrow screen mobile access.

## Purpose
This web app was created as part of my self-learning on [The Odin Project](https://www.theodinproject.com/), specifically on the use and creation of APIs. The seperation of the frontend and backend and use of an API increases the flexibility and usability of the code and it's use. As demonstrated, several different frontends can take advantage of the backend API, such as different frontends for different users and also different types of frontend codes using the one backend. For example, both a web app or mobile app can use the same backend.

## Future
In it's current state, there are no further plans to develop this web app. For the purposes of learning and this portfolio, it is simply not necessary.

## How to Use this Project
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## License
The license for all my code can be found [here](https://github.com/ty0088/ty0088.github.io/blob/main/license.md).
