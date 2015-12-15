/// <reference path="../../../tools/typings/tsd/tsd.d.ts" />
import { Injectable } from 'angular2/angular2';
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
	addEpisode(id) {
		var headers = new Headers();
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.get('http://api.test.com:8000/episode/' + id + '/', {
			headers: headers
			})
		.map(res => res.json())
		.subscribe(
			data => this.testMethod(data),
			err => console.log(err),
			() => console.log()
		);
	}
	testMethod(data) {
		this.episodeList.push(data.link);
	}
}

