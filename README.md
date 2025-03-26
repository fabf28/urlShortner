# Url Shortner Api
 **Introduction**
 
 Welcome to my urlShortner api project. In this project I implemented the User Authentication, Url Shortening, Admin Analytics Endpoints, and Database Schema. The database schema can be found in the dbschema.sql file and the API Documentation can be found in the .yaml file.

 **Setup**
 1. Clone the project and run npm i.
 2. Open the postman collection.
 3. Setup a local postgres database.
 4. Fill in the database details in config/db.ts.
 5. Copy the dbschema.sql code and run it in the pgAdmin query tool.
 6. Run npm run setup to populate the db.
 7. Run npm start to start the server.
 8. You can now run the postman collection for testing or run each request in the collection individually.

**Notes**
- For the sake of simplicity, I committed the secret key in the .env file and didn't hardcoded the database details in the /config/db.ts but I understand this isn't indesstry practice.
- Running npm run setup prints a url alias for testing. Manually add this into the request called "Admin Analytics - Action Needed" for best results.
- The postman collection is not the api documentation and is rather just for testing.
