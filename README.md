﻿# Url Shortner Api
 **Introduction**
 
 Welcome to my urlShortner api project. In this project I implemented the User Authentication, Url Shortening, Admin Analytics Endpoints, and Database Schema. The database schema can be found in the dbschema.sql file and the API Documentation can be found in the .yaml file. You can upload the .yaml onto swagger for illustration.

 **Setup**
 1. Clone the project and run npm i.
 2. Download postman for desktop and open the postman collection.
 3. Run npm start to start the server.
 4. You can now run the postman collection for testing or run each request in the collection individually.

**Notes**
- Add your own neon database url in the .env file and generate your own secret key.
- The postman collection is not the api documentation and is rather just for testing.
- You must run the postman tests on desktop and not web to run on localhost.
- Testing on localhost affects req ip so the program just uses 8.8.8.8 for everything for now which affects geographic logging.
