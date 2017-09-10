# Code Institute - Stream 2 - Flask App

[See live app](https://blooming-journey-67425.herokuapp.com/)

#### Technologies used

##### HTML
I tried to use as much semantic HTML5 as possible. I didn't want to fill the site with it if it wasn't needed. 

##### CSS
I used bootstrap as the css framework for the app. I also applied custom styles of my own. 

##### JavaScript
Javascript gives the app a lot of the functionality. There are numerous javascript plugins used to power the app. 

###### dc.js
dc.js makes it easier to work with d3 and means you have to write less code. 
###### d3.js
d3 is used to create the charts in the app using SVG. 
###### crossfilter.js
Used to slice and dice the data before passing to dc and d3. 
###### queue.js
An asynchronous helper library, it waits until all data is avaiable before passing for processing. 

###### intro.js
intro.js is used to provide a step-by-step guide to the user on how to use the app and what each section is for. 

###### Flask
Flask is a microframework for Python. It is used in this app to connect to mongoDB and serve up the data for the frontend.

###### MongoDB
MongoDB is an NOSQL database. 

#### Overview
The app I created shows a breakdown of the number of customers, income, tips, method of payment for a restaurant over a period. This app is easily scalable and adjuastable to different data or industries.  

## Installation
 To install and run site locally:
 - Clone repo
 - [Create virtualenv](https://scotch.io/tutorials/getting-started-with-flask-a-python-microframework)
 -  from folder root typr 'pip install -r requirements.txt' in cmd
 -  export FLASK_APP=project.py
 -  followed by flask run

