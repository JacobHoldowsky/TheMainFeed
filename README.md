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

## ![Screen Shot 2022-03-27 at 11 53 22 AM](https://user-images.githubusercontent.com/52753308/160289767-21cbc0bd-477c-4880-b88a-e87c5d5e95b8.png)

## ![Screen Shot 2022-03-27 at 11 54 09 AM](https://user-images.githubusercontent.com/52753308/160289804-bd98dfd1-f173-4965-a6fc-543a28d1de36.png)

## Post Detail

## ![Screen Shot 2022-03-27 at 11 54 42 AM](https://user-images.githubusercontent.com/52753308/160289818-5f1103ba-9a63-4bae-b994-6e510625f9b1.png)

## ![Screen Shot 2022-03-27 at 11 57 49 AM](https://user-images.githubusercontent.com/52753308/160289963-ea32ba4b-bede-46c0-ac24-a445cf7894d4.png)

## User Profile

## <img width="1440" alt="Screen Shot 2022-03-27 at 11 59 01 AM" src="https://user-images.githubusercontent.com/52753308/160290034-206df406-f020-49d8-bdbb-40091da36532.png">

# Developer's thoughts moving forward

This was a fun project to work on, and it really started to develop a flavor once images could be displayed as a model of their original sizes.  While this project is only the beginning of a venture that has the potential to be expanded in multiple demensions, this developer is very excited with the progress thus far. The plan at this moment is to add a search function to search for a particular team or athlete. Furthermore, I would like to list all athletes by last name.

## Getting started

1. Clone this repository (only this branch)

      - `git clone git@github.com:JacobHoldowsky/TheMainFeed.git`

2. Install backend dependencies

      - `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app
      
      - `pipenv shell`

      - 'flask db upgrade'

      - `flask seed all`

      - `flask run`

6. Install frontend dependencies

      - cd into react-app
      - run `npm install`

7. Start front end server

      - in react-app directory, run `npm start`
      - This should take you to localhost:3000, but you can also go there manually in your browser
