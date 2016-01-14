import { Injectable } from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {FablerService} from './fabler_service';

@Injectable()
export class EpisodeService {
	episodeList:string[] = [];
	constructor(public http:Http, public fablerService: FablerService) {
		this.episodeList = [];
	}
	/*public getPrevEpisode() {
		
	}*/
	getNextEpisode() {
		return this.episodeList.shift();
	}
	addEpisode(id:number) {
		var headers = new Headers();
		headers.append('Authorization', 'Bearer ' + this.fablerService.get_token());
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', '*/*');
		this.http.get(this.fablerService.get_api() + 'episode/' + id + '/', {
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

