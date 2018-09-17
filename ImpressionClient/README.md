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


<!-- Automatically generated -->
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
