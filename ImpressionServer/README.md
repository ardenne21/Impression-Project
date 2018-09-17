# Impressionclient

The server side of the Impression project is developed in Node.js with the support of the `express` framework (https://expressjs.com). 

## Code

Firstly, a stream has been created to read the csv file (provided in the assets folder). Operations are simplified through the `csv-parser` library (https://www.npmjs.com/package/csv-parser). 
The data obtained are saved in an array of objects for further manipulations.

Secondly, server configuration operations are started using express.js. 
A CORS (Cross-origin HTTP request) is enabled in order to handle requests from a different URL. Then, a list of routes has been created: 
	- The first route is a generic path to get all the data from the csv file. 
	- The second to the fifth route is used to serve the manipulated data requested by the client.

## Map 
A separate note is necessary for the manipulation of the data contained in the `map.json` file (provided in the assets folder) and used to serve the fifth route. 

The map.json provided is of the GeoJSON format. The GeoJSON format is a geospatial data interchange format based on JavaScript Object Notation (JSON) (https://tools.ietf.org/html/rfc7946).

To easily manipulate this format, is has been used the `d3-geo` library (https://github.com/d3/d3-geo) which provide a function called `geoContains(object,point)` returning true or false if the specified GeoJSON object contains the specific point provided as a two dimensional array [lng,lat].

However, during testing two problems arose:
	- the high number of records slowed down the checking operations considerably;
	- the coordinates of many points were outside the US borders or non-localizable. 
These problems have been addressed through a function that checks whether the provided point is located within the US border. If the result if positive, another function checks in which state the point is located. 



