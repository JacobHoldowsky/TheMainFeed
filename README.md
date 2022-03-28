# The Main Feed

The Main Feed is the main place to immerse oneself in the worlds the athletes they love. Replete with images in a collage-like style of each athlete, one can follow all the athletes he/she loves and scroll on their main feed from one exciting view to the next. Users will love adding pictures and seeing the page change form to bring the new image in the mix. All images remain a model of their original size, but remain centered in each row with the other pictures for a sweet, eye-candy experience. 

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

## ![Screen Shot 2022-03-28 at 10 17 26 AM](https://user-images.githubusercontent.com/52753308/160418158-277b8409-f429-444f-bb6c-56f14f749676.png)

## ![Screen Shot 2022-03-28 at 10 18 00 AM](https://user-images.githubusercontent.com/52753308/160418261-cf427ea1-834f-480a-b2b0-b52de91adc4f.png)

## Post Detail

## ![Screen Shot 2022-03-28 at 10 22 33 AM](https://user-images.githubusercontent.com/52753308/160419246-9f71085e-cb01-4d6e-8f78-5008c87cb5a4.png)

## ![Screen Shot 2022-03-28 at 10 22 54 AM](https://user-images.githubusercontent.com/52753308/160419316-17dbf729-0dd1-48a7-8a99-b65378f4723e.png)

## User Profile

## ![Screen Shot 2022-03-28 at 10 23 21 AM](https://user-images.githubusercontent.com/52753308/160419409-d2680d60-f54a-4e74-b061-e7f485cca284.png)

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
