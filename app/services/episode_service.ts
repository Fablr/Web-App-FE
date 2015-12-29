import { Injectable } from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class EpisodeService {
	episodeList:string[] = [];
	http:Http;
	constructor(public http:Http) {
		this.episodeList = [];
	}
	/*public getPrevEpisode() {
		
	}*/
	getNextEpisode() {
		return this.episodeList.shift();
	}
	addEpisode(id:number) {
		var headers = new Headers();
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.get(System.http_api + '/episode/' + id + '/', {
			headers: headers
			})
		.subscribe(
			data => this.testMethod(data.json()),
			err => console.log(err),
			() => console.log()
		);
	}
	testMethod(data) {
		this.episodeList.push(data.link);
	}
}

