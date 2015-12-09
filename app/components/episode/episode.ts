/// <reference path="../../../tools/typings/tsd/tsd.d.ts" />

import {Component, CORE_DIRECTIVES, ViewEncapsulation} from 'angular2/angular2';
import {EpisodeService} from '../../services/episode_service';
import {CommentFormCmp} from '../app/comment_form';
import { RouterLink, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import {Http, Headers} from 'angular2/http';
//import {Observable} from 'rx';
//import * as io from 'socket.io-client';

@Component({
  selector: 'episode',
  templateUrl: './components/episode/episode.html',
  styleUrls: ['./components/episode/episode.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [CORE_DIRECTIVES, RouterLink, ROUTER_DIRECTIVES, CommentFormCmp]
})
export class EpisodeCmp {
	comments: Array<Object>;
	episode: Array<Object>;
	routeParam: RouteParams;
	id: int;
	objectType: string;
	mark;
	episodeTitle;
	podcastTitle;
	subtitle;
	description;
	pubdate;
	duration;
	explicit;
	subscribed;
	author;
	publisher;
	// need to set an actual default
	image = 'http://slaidcleaves.com/wp-content/themes/soundcheck/images/default-artwork.png';

	constructor(service: EpisodeService, routeParam: RouteParams, public http:Http) {
		this.service = service;
		this.routeParam = routeParam;
		this.id = this.routeParam.params.id;
		this.objectType = 'episode';
		//this.service.startEpisode(this.routeParam.params.id);

		var headers = new Headers();
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.get('http://api.test.com:8000/episode/' + this.routeParam.params.id + '/comments/', {
			headers: headers
			})
		.map(res => res.json())
		.subscribe(
			/*id
			comment
			user
			submit_date
			username
			is_removed
			net_vote
			uservote*/
			data => this.comments = data,
			err => console.log(err),
			() => console.log()
		);

		this.http.get('http://api.test.com:8000/episode/' + this.routeParam.params.id + '/', {
			headers: headers
			})
		.map(res => res.json())
		.subscribe(
			/*id
			comment
			user
			submit_date
			username
			is_removed
			net_vote
			uservote*/
			data => this._populateEpisodeInfo(data),
			err => console.log(err),
			() => console.log()
		);
	}
	_populateEpisodeInfo(data) {
		this.mark = data.mark;
		this.episodeTitle = data.title;
		this.subtitle = data.subtitle;
		this.description = data.description;
		this.pubdate = data.pubdate;
		this.duration = data.duration;

		var headers = new Headers();
		headers.append('Authorization', 'Bearer cIpKsqIy6lghD5lANwT0lVPIzNGiT6');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.get('http://api.test.com:8000/podcast/' + data.podcast + '/', {
			headers: headers
			})
		.map(res => res.json())
		.subscribe(
			/*id
			comment
			user
			submit_date
			username
			is_removed
			net_vote
			uservote*/
			data => this._populatePodcastInfo(data),
			err => console.log(err),
			() => console.log()
		);
	}

	_populatePodcastInfo(data) {
		this.image = data.image;
		this.podcastTitle = data.title;
		this.subscribed = data.subscribed;
		this.author = data.author;
		this.publisher = data.publisherName;
	}
	// Play pause functionality for the audio element


}

