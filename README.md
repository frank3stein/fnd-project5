# fnd-project5

In this project I used Yelp API, Google Maps API, Google StreetView API and Wikipedia API in order to create a map of Sydney where users can look at the first 20 Sushi Restaurants around the city.

I have used knockoutjs to control the view and model flow. No dirty checking is done for marker changes, knockout handles the process.

In order to automate the workflow I used gulp. Previously, for my web optimization project I have used grunt and in this project I tried to learn Gulp. To run the build process and let gulp watch for changes just type $ gulp in project directory. The default task includes html minification, css minification, javascript minification and image minification. To see the setup check out the gulpjs file.

The markers are numbered to the order of the list items, they are sorted as in the Yelp data callback. And they are different from the red marker which is for the city.

The iframe in Sydney marker does not work the best for now, but I think after google incorporates views.google to maps, it will be more customisable.

Map Controls 

On desktop
Press " L " - Toggles the list view

On Mobile
Three finger tap - Toggles the list view

You can view the project with the link below:
http://frank3stein.github.io/fnd-project5/build/

