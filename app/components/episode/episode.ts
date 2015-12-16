/// <reference path="../../../tools/typings/tsd/tsd.d.ts" />

import {Component, ViewEncapsulation} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {EpisodeService} from '../../services/episode_service';
import {CommentFormCmp} from '../app/comment_form';
import { RouterLink, RouteParams, ROUTER_DIRECTIVES, Location } from 'angular2/router';
import {Http, Headers} from 'angular2/http';
//import {Observable} from 'rx';
//import * as io from 'socket.io-client';

@Component({
  selector: 'episode',
  templateUrl: './components/episode/episode.html',
  styleUrls: ['./components/episode/episode.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [CORE_DIRECTIVES, RouterLink, ROUTER_DIRECTIVES, CommentFormCmp]
//  directives: [RouterLink, CORE_DIRECTIVES]
})
export class EpisodeCmp {
	comments: Array<Object>;
	episode: Array<Object>;
	routeParam: RouteParams;
	id: number;
	object_type: string;
	mark: string;
	episodeTitle: string;
	podcastTitle: string;
	subtitle: string;
	description: string;
	pubdate: string;
	duration: string;
	explicit: boolean;
	subscribed: boolean;
	author: string;
	publisher: string;
	podcast: number;
	// need to set an actual default
	image = 'http://slaidcleaves.com/wp-content/themes/soundcheck/images/default-artwork.png';

	constructor(service: EpisodeService, routeParam: RouteParams, public http:Http, location: Location) {
		this.service = service;
		this.routeParam = routeParam;
		this.id = this.routeParam.params.id;
		this.object_type = 'episode';
		//this.service.startEpisode(this.routeParam.params.id);

		var headers = new Headers();
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.get('http://api.test.com:8000/episode/' + this.routeParam.params.id + '/comments/', {
			headers: headers
			})
		.subscribe(
			data => this.comments = data.json(),
			err => console.log(err),
			() => console.log()
		);

		this.http.get('http://api.test.com:8000/episode/' + this.routeParam.params.id + '/', {
			headers: headers
			})
		.subscribe(
			data => this._populateEpisodeInfo(data.json()),
			err => console.log(err),
			() => console.log()
		);
	}
	_populateEpisodeInfo(data) {
		this.mark = data.mark;
		this.episodeTitle = data.title;
		this.subtitle = data.subtitle;
		this.description = data.description;
		this.pubdate = new Date(data.pubdate);
		this.duration = data.duration;
		this.podcast = data.podcast;

		var headers = new Headers();
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.get('http://api.test.com:8000/podcast/' + data.podcast + '/', {
			headers: headers
			})
		.subscribe(
			data => { 
				this.image = data.json().image;
				this.podcastTitle = data.json().title;
				this.subscribed = data.json().subscribed;
				this.author = data.json().author;
				this.publisher = data.json().publisherName;},
			err => console.log(err),
			() => console.log()
		);
	}
}

