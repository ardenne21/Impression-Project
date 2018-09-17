const fs = require('fs'); 
const csv = require('csv-parser');
const moment = require('moment');
const d3Geo = require('d3-geo');
const express = require('express');
const app = express();

const inputFilePath = 'assets/dataset.csv';
const usMap = require('./assets/map.json');

const top = 49.3457868 // north lat
const left = -124.7844079 // west long
const right = -66.9513812 // east long
const bottom =  24.7433195 // south lat

let impressionData = [];

function impressionObj(device_id,lat,lng,timestamp) {
	this.device_id = device_id;
	this.lat = lat;
	this.lng = lng;
	this.timestamp = timestamp;
};

// Create a strem to read the csv file
fs.createReadStream(inputFilePath)
	.pipe(csv())
	.on('data', function(data){
	    try {
    		impressionData.push(new impressionObj(data.device_id, data.lat, data.lng, moment(parseInt(data.timestamp))));
	    }
	    catch(err) {
	        console.log('There was an error', err)
	    }
	})
	.on('end',function(){
	    console.log('Data loaded')
	}); 

// CORS middleware
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // '*' = we will allow any type of location or URL
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

// Get all data
app.get('/impressions', (req, res) => {
	res.json(impressionData);
})

// Get total impressions for each device
app.get('/impressionsbydevice', (req, res) => {
	var impressionMap = {}
	for(let el of impressionData){
		if(!impressionMap[el.device_id]){
			impressionMap[el.device_id] = 1;
		} else {
			impressionMap[el.device_id] = impressionMap[el.device_id]+1;
		}
	}
	var impressionArray = [];
	for(let key in impressionMap){
		impressionArray.push({device_id: key, count: impressionMap[key]})
	}
	res.json(impressionArray);
})

// Get impressions for each hour of the day
app.get('/impressionsbyhour', (req, res) => {
	var impressionMap = {}
	for(let el of impressionData){
		let hour = moment(el.timestamp).hour();
		if(!impressionMap[hour]){
			impressionMap[hour] = 1;
		} else {
			impressionMap[hour] = impressionMap[hour]+1;
		}
	}
	var impressionArray = [];
	for(let key in impressionMap){
		impressionArray.push({hour: key, count: impressionMap[key]})
	}
	res.json(impressionArray);
})

// Get impressions for each day of the week
app.get('/impressionsbyweek', (req, res) => {
	var impressionMap = {}
	for(let el of impressionData){
		let day = moment(el.timestamp).day();
		if(!impressionMap[day]){
			impressionMap[day] = 1;
		} else {
			impressionMap[day] = impressionMap[day]+1;
		}
	}
	var impressionArray = [];
	for(let key in impressionMap){
		switch(key) {
			case "0":
				impressionArray.push({day: "Sun", count: impressionMap[key]});
				break;
			case "1":
				impressionArray.push({day: "Mon", count: impressionMap[key]});
				break;
			case "2":
				impressionArray.push({day: "Tue", count: impressionMap[key]});
				break;
			case "3":
				impressionArray.push({day: "Wed", count: impressionMap[key]});
				break;
			case "4":
				impressionArray.push({day: "Thu", count: impressionMap[key]});
				break;
			case "5":
				impressionArray.push({day: "Fri", count: impressionMap[key]});
				break;
			case "6":
				impressionArray.push({day: "Sat", count: impressionMap[key]});
				break;
			default:
				break;
		}
	}
	res.json(impressionArray);
})

// Get impressions for each day of the month
app.get('/impressionsbymonth', (req, res) => {
	var impressionMap = {}
	for(let el of impressionData){
		let date = moment(el.timestamp).date();
		if(!impressionMap[date]){
			impressionMap[date] = 1;
		} else {
			impressionMap[date] = impressionMap[date]+1;
		}
	}
	var impressionArray = [];
	for(let key in impressionMap){
		impressionArray.push({day: key, count: impressionMap[key]})
	}
	res.json(impressionArray);
})

// Get impressions for each US state
app.get('/impressionsbystate', (req, res) => {
	var impressionMap = {}
	for(let el of impressionData){
		if(inBound(el)){
			let state = getImpressionState(el);
			if(state){
				state = state.substr(state.lastIndexOf(" ")+1, state.length).replace(".","-");
				if(!impressionMap[state]){
					impressionMap[state] = 1;
				} else {
					impressionMap[state] = impressionMap[state]+1;
				}
			}
		}
	}
	var impressionArray = [];
	for(let key in impressionMap){
		impressionArray.push({id: key, value: impressionMap[key]})
	}
	res.json(impressionArray);
})

// Check if the location is contained in the US borders. 
function inBound(impression) {
	return (impression.lat>bottom && impression.lat<top) && (impression.lng>left && impression.lng<right);
}

// Map the map.json
function getImpressionState(impression) {
	var impressionState = null;
	for(let state of usMap.features) {
		let found = contained(impression.lat, impression.lng, state);
		if(found) {
			impressionState = state.properties.name;
			break;
		}
	}
	return impressionState;
}

// Check if the location is contained inside the given state coordinates.
function contained(lat, lng, feature) {
	return d3Geo.geoContains(feature, [lng,lat]);
};

// Start the server
app.listen(3000);
console.log('Server started');

