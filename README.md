# Background
We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.
Your database will be PSQL, and you will interact with it using node-postgres.

# Dependencies
Run 'npm install' in order to get all the relevent dependencies.

# How to create the environment variables to clone this project and run it locally.
There are two databases present in this project. One for real looking dev data and another for simpler test data.

The data has been provided in the setup.sql file. 

You will need to create two .env files for your project: .env.test and .env.development. Into the .env.development file, add PGDATABASE=<database_nc_news>, and into the .env.test file add PGDATABASE=<database_nc_news_test>. Double check that these .env files are .gitignored.


