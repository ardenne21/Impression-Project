import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppRestService {
	
	BASE_URL = 'http://localhost:3000'; 

	constructor(private http: HttpClient) {}
	
	// Get impressions for each device
	getImpressionsByDeviceID() {
		return this.http.get(this.BASE_URL + '/impressionsbydevice');					
	}

	// Get impressions for each hour of the day
	getImpressionsByHour() {		
		return this.http.get(this.BASE_URL + '/impressionsbyhour');	
	}

	// Get impressions for each day of the week
	getImpressionsByWeek() {		
		return this.http.get(this.BASE_URL + '/impressionsbyweek');
	}

	// Get impressions for each day of the month
	getImpressionsByMonth() {		
		return this.http.get(this.BASE_URL + '/impressionsbymonth');
	}
	
	// Get impressions for each US state
	getImpressionsByState() {		
		return this.http.get(this.BASE_URL + '/impressionsbystate');
	}

}