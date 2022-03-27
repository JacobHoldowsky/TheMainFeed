# The Main Feed

The Main Feed is a place to get caught up on all the latest news and events and the best way to stay connected.

# Overview of technologies used

The Main Feed is a blogging website built with Flask, SQLAlchemy, PostgresSQL, React and Redux.

## Backend

Flask - A very user friendly choice for backend development.
SQLAlchemy -  Makes interacting with the database a simpler process due to its intuitive style. 
PostgresSQL - Harmonious pair to SQLAlchemy 

## Frontend

React - Chosen for its lightening fast rendering as it only rerenders items that change.
Redux - Most state items were handled by redux, which helped keep all state necessities neat and organized.

# Screenshots of the The Main Feed

## Main Feed
![Screen Shot 2022-03-27 at 11 53 22 AM](https://user-images.githubusercontent.com/52753308/160289767-21cbc0bd-477c-4880-b88a-e87c5d5e95b8.png)

![Screen Shot 2022-03-27 at 11 54 09 AM](https://user-images.githubusercontent.com/52753308/160289804-bd98dfd1-f173-4965-a6fc-543a28d1de36.png)

## Post Detail

![Screen Shot 2022-03-27 at 11 54 42 AM](https://user-images.githubusercontent.com/52753308/160289818-5f1103ba-9a63-4bae-b994-6e510625f9b1.png)

![Screen Shot 2022-03-27 at 11 57 49 AM](https://user-images.githubusercontent.com/52753308/160289963-ea32ba4b-bede-46c0-ac24-a445cf7894d4.png)

## User Profile

<img width="1440" alt="Screen Shot 2022-03-27 at 11 59 01 AM" src="https://user-images.githubusercontent.com/52753308/160290034-206df406-f020-49d8-bdbb-40091da36532.png">

# Developer's thoughts moving forward

This was a fun project to work on, and it really started to develop a flavor once images could be displayed as a model of their original sizes.  While this project is only the beginning of a venture that has the potential to be expanded in multiple demensions, this developer is very excited with the progress thus far. The plan at this moment is to add a search function to search for a particular team or athlete. Furthermore, I would like to list all athletes by last name.

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone git@github.com:JacobHoldowsky/TheMainFeed.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env
variables.

12. profit

### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

