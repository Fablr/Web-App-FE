///<reference path='../../../tools/typings/tsd/marked/marked.d.ts'/>

import {Component, ViewEncapsulation} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {EpisodeService} from '../../services/episode_service';
import {FablerService} from '../../services/fabler_service';
import {CommentFormCmp} from '../app/comment_form';
import {RouteParams, RouterLink} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import * as marked from 'marked';

import {CommentSortPipe} from '../app/comment_pipe';

@Component({
  selector: 'episode',
  templateUrl: './components/episode/episode.html',
  styleUrls: ['./components/episode/episode.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [CORE_DIRECTIVES, RouterLink, CommentFormCmp],
  pipes: [CommentSortPipe]
})
export class EpisodeCmp {
    comments: Array<Object>;
	episode: Array<Object>;
	routeParam: RouteParams;
	id: string;
	object_type: string;
	mark: string;
	episodeTitle: string;
	podcastTitle: string;
	subtitle: string;
	description: string;
	pubdate: Date;
	duration: string;
	explicit: boolean;
	subscribed: boolean;
	author: string = 'Loading...';
	publisher: string;
	podcast: number;
    reply: number = -1;
	// need to set an actual default
	image = 'http://slaidcleaves.com/wp-content/themes/soundcheck/images/default-artwork.png';
    private md: MarkedStatic;

	constructor(public episodeService: EpisodeService, routeParam: RouteParams, public http:Http, public fablerService: FablerService) {
		this.md = marked;
        this.id = routeParam.get('id');
		this.object_type = 'episode';
		var headers = new Headers();
		headers.append('Authorization', 'Bearer ' + this.fablerService.get_token());
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', '*/*');
		this.http.get(fablerService.get_api() + 'episode/' + this.id + '/comments/', {
			headers: headers
			})
		.subscribe(
			data => {
                this.comments = data.json();
            },
			err => console.log(err),
			() => console.log()
		);

		this.http.get(fablerService.get_api() + 'episode/' + this.id + '/', {
			headers: headers
			})
		.subscribe(
			data => this._populateEpisodeInfo(data.json()),
			err => { this.author = 'Not Found'; console.log(err);},
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
		headers.append('Authorization', 'Bearer ' + this.fablerService.get_token());
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', '*/*');
		this.http.get(this.fablerService.get_api() + 'podcast/' + data.podcast + '/', {
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
    parseComment(val:string) {
        return this.md.parse(val);
    }
    parseDate(val:string) {
        return new Date(val);
    }
}

