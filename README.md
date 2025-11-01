# EcoMart
-------------------
1. Initialise the project (init and install required libraries)
2. Setup the project directory (MVT)
3. Create the server script
4. Create and setup the public/static directory
5. Create our middleware
6. Setup some form of error handling
7. Create the database connection
8. Create routers and link them
9. Create views



# Project components
-----------------
 - auth (login, register)
 - admin (administrator dashboard, CRUD for product)
 - product (product page, home page, cart, checkout)



# Creating a database
1. Create a mongodb account
2. Create a mongodb cluster (free - use aws singapore/saf)
3. Create your database and collection
4. DOwnload mongodb compass software
5. Click on connect on cluster and then compass to get the connection string (edit the password)
6. Install mongoose
7. Link it in db.js
8. Create model files
9. Use model files in your routers/controllers


# Steps 
 - Implemented CRUD for products in admin dashboard
 - Rendered products dynamically on home page
 - Implemented search functionality on home page
 - Setting up user model
 - Creating login and register templates
 - Setting up login and register controller functions in routes & logouy
 - Configuring session management and only allowing logged in users to view home page
 - Setting up role-based access control for logged in users