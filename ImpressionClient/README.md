# Impressionclient

The client side of the Impression project is a single page application developed using the Angular 5 framework. 

The webpage consists of four components: 

	- `navigation bar`;
	- `footer`;
	- `dashboard` containing the core part of the application;
	- `import module` listing all the import modules needed for the application, keeping the `app.module` clean as much as possible. 

## Requirement

For an optimal usage of the app, it is recommended the latest version of the Chrome browser. 
The client has also been lightly tested successfully in Edge broswer.
It is not recommended to use the Firefox browser, which require further improvemenst. 
Other browsers have not been tested. 

## Style

The app style is based on the material style guidelines.
A `theme.scss` file is available in the assets folder, listing the material color palette used in the application. 
The custom font used is also available in the assets folder. This font has been relased free to use. 

## Dashboard

The dashboard scaffold has been developed using a responsive approach.
The structure uses a combination of CSS flex and CSS grid, which shrinks and moves the cards on smaller screens. 

The dashboard uses two main libraries:

	- `ngx-datatable` (https://github.com/swimlane/ngx-datatable) for the table;
	- `amCharts` (https://www.amcharts.com/) for graphs and map. 
  
These libraries have been chosen for the ease of use, while ensuring a wide range of advanced features such as animation capabilities. 

## Code

The `app.service` lists the http requests made by the client

The `dashboard.component` subscribes to the http requests and is responsible for generating the charts.
The color property of the graphs is randomized through a random function that usez a small list of defined material colors. 
