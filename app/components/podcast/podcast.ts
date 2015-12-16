/// <reference path="../../../tools/typings/tsd/tsd.d.ts" />

import {Component, ViewEncapsulation} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {EpisodeService} from '../../services/episode_service';
import {CommentFormCmp} from '../app/comment_form';
import { RouterLink, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import {Http, Headers} from 'angular2/http';
//import {Observable} from 'rx';
//import * as io from 'socket.io-client';

@Component({
  selector: 'podcast',
  templateUrl: './components/podcast/podcast.html',
  styleUrls: ['./components/podcast/podcast.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [CORE_DIRECTIVES, RouterLink, ROUTER_DIRECTIVES, CommentFormCmp]
})
export class PodcastCmp {
	comments: Array<Object>;
	podcast: Array<Object>;
	episodes: Array<Object>;
	routeParam: RouteParams;
	id: number;
	object_type: string;
	title: string;
	author: string;
	publisher: string;
	summary: string;
	category: string;
	explicit: boolean;
	link: string;
	language: string;
	copyright: number;
	blocked: boolean;
	complete: boolean;
	keywords: string;
	image: string;
	
	

	// need to set an actual default
	image = 'http://slaidcleaves.com/wp-content/themes/soundcheck/images/default-artwork.png';

	constructor(service: EpisodeService, routeParam: RouteParams, public http:Http) {
		this.service = service;
		this.routeParam = routeParam;
		this.id = this.routeParam.params.id;
		this.object_type = 'podcast';
		//this.service.startEpisode(this.routeParam.params.id);

		var headers = new Headers();
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.get('http://api.test.com:8000/podcast/' + this.routeParam.params.id + '/comments/', {
			headers: headers
			})
		.subscribe(
			data => this.comments = data.json(),
			err => console.log(err),
			() => console.log()
		);

		this.http.get('http://api.test.com:8000/podcast/' + this.routeParam.params.id + '/', {
			headers: headers
			})
		.subscribe(
			data => this._populatePodcastInfo(data.json()),
			err => console.log(err),
			() => console.log()
		);

		this.http.get('http://api.test.com:8000/episode/?podcast=' + this.routeParam.params.id, {
			headers: headers
			})
		.subscribe(
			data => this.episodes = data.json(),
			err => console.log(err),
			() => console.log()
		);
	}

	_populatePodcastInfo(data) {
		this.title = data.title;
		this.author = data.author;
		this.publisher = data.publisherName;
		this.summary = data.summary;
		this.category = data.category;
		this.explicit = data.explicit;
		this.link = data.link;
		this.language = data.language;
		this.copyright = data.copyright;
		this.blocked = data.blocked;
		this.complete = data.complete;
		this.keywords = data.keywords;
		this.image = data.image;
	}
}

