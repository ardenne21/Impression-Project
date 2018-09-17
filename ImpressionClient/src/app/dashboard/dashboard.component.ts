import { Component, OnInit } from '@angular/core';
import { AppRestService } from '../app.service';
import { MatSnackBar } from '@angular/material'
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	impressionsByDevice: any = [];
	impressionsByHour: any = [];
	impressionsByWeek: any = [];
	impressionsByMonth: any = [];
	impressionsByState: any = [];

	rows: any = [];

  	constructor(private service: AppRestService, public snackBar: MatSnackBar, private AmCharts: AmChartsService) { }

	async ngOnInit() {
		await this.getImpressionsByDeviceID();
		await this.getImpressionsByHour();
		await this.getImpressionsByWeek();
		await this.getImpressionsByMonth();
		await this.getImpressionsByState();
	}

	getImpressionsByDeviceID() {
		this.service.getImpressionsByDeviceID().subscribe( data => {
			this.impressionsByDevice = data;
			this.makeChartDeviceID();
		}, error => {
			this.handleError("Unable to get data");
		})
	}

	getImpressionsByHour() {		
		this.service.getImpressionsByHour().subscribe( data => {
			this.impressionsByHour = data;
			this.makeChartHour();
		}, error => {
			this.handleError("Unable to get data");
		});			
	}

	getImpressionsByWeek() {		
		this.service.getImpressionsByWeek().subscribe( data => {
			this.impressionsByWeek = data;
			this.makeChartWeek();
		}, error => {
			this.handleError("Unable to get data");
		});					
	}

	getImpressionsByMonth() {		
		this.service.getImpressionsByMonth().subscribe( data => {
			this.impressionsByMonth = data;
			this.makeChartMonth();
		}, error => {
			this.handleError("Unable to get data");
		});					
	}

	getImpressionsByState() {		
		this.service.getImpressionsByState().subscribe( data => {
			this.impressionsByState = data;
			this.makeChartState();
		}, error => {
			this.handleError("Unable to get data");
		});					
	}
	
	handleError(error){
		console.error(error)
		this.snackBar.open(error, 'close', {duration:2000});
	}

	makeChartDeviceID() {
		this.rows = [...this.impressionsByDevice];
	}	

	makeChartHour() {
		this.makeChartColorPalette(this.impressionsByHour);

		var chart_hour = this.AmCharts.makeChart("chart_hour", {
	     	"theme": "light",
		    "type": "serial",
			"startDuration": 2,
		    "dataProvider": this.impressionsByHour,
		    "valueAxes": [{
		        "position": "left",
		        "title": "Number of impression"
		    }],
		    "rotate": true,
		    "graphs": [{
		        "balloonText": "Impressions at [[category]]: <b>[[value]]</b>",
		        "colorField": "color",
		        "fillAlphas": 1,
		        "lineAlpha": 0.1,
		        "type": "column",
		       	"valueField": "count",
		    }],
		    "depth3D": 20,
			"angle": 30,
		    "chartCursor": {
		        "categoryBalloonEnabled": false,
		        "cursorAlpha": 0,
		        "zoomable": false
		    },
		    "categoryField": "hour",
		    "categoryAxis": {
		        "gridPosition": "start",
		        "labelRotation": 0
		    },
		    "export": {
		    	"enabled": false
		    }
		});
	}

	makeChartWeek() {
		this.makeChartColorPalette(this.impressionsByWeek);

		var chart = this.AmCharts.makeChart("chart_week", {
		    "theme": "light",
		    "type": "serial",
			"startDuration": 2,
		    "dataProvider": this.impressionsByWeek,
		    "valueAxes": [{
		        "position": "left",
		        "title": "Number of impression"
		    }],
		    "graphs": [{
		        "balloonText": "Impressions on [[category]]: <b>[[value]]</b>",
		        "fillColorsField": "color",
		        "fillAlphas": 1,
		        "lineAlpha": 0.1,
		        "type": "column",
		        "valueField": "count"
		    }],
		    "depth3D": 20,
			"angle": 30,
		    "chartCursor": {
		        "categoryBalloonEnabled": false,
		        "cursorAlpha": 0,
		        "zoomable": false
		    },
		    "categoryField": "day",
		    "categoryAxis": {
		        "gridPosition": "start",
		        "labelRotation": 0
		    },
		    "export": {
		    	"enabled": false
		    }
		});
	}

	makeChartMonth() {
		this.makeChartColorPalette(this.impressionsByMonth);

		var chart = this.AmCharts.makeChart("chart_month", {
		    "theme": "light",
		    "type": "serial",
			"startDuration": 2,
		    "dataProvider": this.impressionsByMonth,
		    "rotate": true,
		    "valueAxes": [{
		        "position": "left",
		        "title": "Number of impression"
		    }],
		    "graphs": [{
		        "balloonText": "Impressions on [[category]]: <b>[[value]]</b>",
		        "fillColorsField": "color",
		        "fillAlphas": 1,
		        "lineAlpha": 0.1,
		        "type": "column",
		        "valueField": "count"
		    }],
		    "depth3D": 20,
			"angle": 30,
		    "chartCursor": {
		        "categoryBalloonEnabled": false,
		        "cursorAlpha": 0,
		        "zoomable": false
		    },
		    "categoryField": "day",
		    "categoryAxis": {
		        "gridPosition": "start",
		        "labelRotation": 0
		    },
		    "export": {
		    	"enabled": false
		    }
		});
	}

	makeChartState() {		
		var map = this.AmCharts.makeChart("chart_map", {
			"type": "map",
			"theme": "dark",
			"colorSteps": 10,
			"dataProvider": {
				"map": "usaLow",
    			"areas": this.impressionsByState
    		},
			"areasSettings": {
				"autoZoom": true,
				"balloonText": "[[value]] impression in [[title]]"
			},
			"valueLegend": {
				"right": 10,
				"minValue": "min",
				"maxValue": "max"
			},
			"export": {
				"enabled": false
			}
		});
	}

	// Fill the graphs with random material colors
	makeChartColorPalette(data) {
		const materialColorPalette = {     
			"indigo": {
				"50": "#e8eaf6",
				"100": "#c5cae9",
				"200": "#9fa8da",
				"300": "#7986cb",
				"400": "#5c6bc0",
				"500": "#3f51b5",
				"600": "#3949ab",
				"700": "#303f9f",
				"800": "#283593",
				"900": "#1a237e",
				"hex": "#3f51b5",
				"a100": "#8c9eff",
				"a200": "#536dfe",
				"a400": "#3d5afe",
				"a700": "#304ffe"
			},
			"blue": {
				"50": "#e3f2fd",
				"100": "#bbdefb",
				"200": "#90caf9",
				"300": "#64b5f6",
				"400": "#42a5f5",
				"500": "#2196f3",
				"600": "#1e88e5",
				"700": "#1976d2",
				"800": "#1565c0",
				"900": "#0d47a1",
				"hex": "#2196f3",
				"a100": "#82b1ff",
				"a200": "#448aff",
				"a400": "#2979ff",
				"a700": "#2962ff"
			},
			"lightBlue": {
				"50": "#e1f5fe",
				"100": "#b3e5fc",
				"200": "#81d4fa",
				"300": "#4fc3f7",
				"400": "#29b6f6",
				"500": "#03a9f4",
				"600": "#039be5",
				"700": "#0288d1",
				"800": "#0277bd",
				"900": "#01579b",
				"hex": "#03a9f4",
				"a100": "#80d8ff",
				"a200": "#40c4ff",
				"a400": "#00b0ff",
				"a700": "#0091ea"
			},
			"teal": {
				"50": "#e0f2f1",
				"100": "#b2dfdb",
				"200": "#80cbc4",
				"300": "#4db6ac",
				"400": "#26a69a",
				"500": "#009688",
				"600": "#00897b",
				"700": "#00796b",
				"800": "#00695c",
				"900": "#004d40",
				"hex": "#009688",
				"a100": "#a7ffeb",
				"a200": "#64ffda",
				"a400": "#1de9b6",
				"a700": "#00bfa5"
			},
			"green": {
				"50": "#e8f5e9",
				"100": "#c8e6c9",
				"200": "#a5d6a7",
				"300": "#81c784",
				"400": "#66bb6a",
				"500": "#4caf50",
				"600": "#43a047",
				"700": "#388e3c",
				"800": "#2e7d32",
				"900": "#1b5e20",
				"hex": "#4caf50",
				"a100": "#b9f6ca",
				"a200": "#69f0ae",
				"a400": "#00e676",
				"a700": "#00c853"
			},
			"lightGreen": {
				"50": "#f1f8e9",
				"100": "#dcedc8",
				"200": "#c5e1a5",
				"300": "#aed581",
				"400": "#9ccc65",
				"500": "#8bc34a",
				"600": "#7cb342",
				"700": "#689f38",
				"800": "#558b2f",
				"900": "#33691e",
				"hex": "#8bc34a",
				"a100": "#ccff90",
				"a200": "#b2ff59",
				"a400": "#76ff03",
				"a700": "#64dd17"
			},
			"grey": {
				"50": "#fafafa",
				"100": "#f5f5f5",
				"200": "#eeeeee",
				"300": "#e0e0e0",
				"400": "#bdbdbd",
				"500": "#9e9e9e",
				"600": "#757575",
				"700": "#616161",
				"800": "#424242",
				"900": "#212121",
				"hex": "#9e9e9e"
			},
			"blueGrey": {
				"50": "#eceff1",
				"100": "#cfd8dc",
				"200": "#b0bec5",
				"300": "#90a4ae",
				"400": "#78909c",
				"500": "#607d8b",
				"600": "#546e7a",
				"700": "#455a64",
				"800": "#37474f",
				"900": "#263238",
				"hex": "#607d8b"
			}
    	}

		let colorPalette = [];
		let colorList = {};

		while(colorPalette.length < data.length){
			colorList = materialColorPalette[this.pickRandomProperty(materialColorPalette)];
			for(let key in colorList){
				colorPalette.push(colorList[key]);
			}
		}
		for(var i=0; i< data.length; i++){			
			data[i].color = colorPalette[i];
		}
	}

	pickRandomProperty(obj) {
		var result;
		var count = 0;
		for (var prop in obj) {
			if (Math.random() < 1 / ++count) result = prop;
		}
		return result;
	}
}
