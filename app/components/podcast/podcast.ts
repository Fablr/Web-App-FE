import {Component, ViewEncapsulation} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {EpisodeService} from '../../services/episode_service';
import {CommentFormCmp} from '../app/comment_form';
import { RouterLink, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {FablerService} from '../../services/fabler_service';
//import {Observable} from 'rx';
import {CommentSortPipe} from '../app/comment_pipe';

@Component({
  selector: 'podcast',
  templateUrl: './components/podcast/podcast.html',
  styleUrls: ['./components/podcast/podcast.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [CORE_DIRECTIVES, RouterLink, ROUTER_DIRECTIVES, CommentFormCmp],
  pipes: [CommentSortPipe]
})
export class PodcastCmp {
	comments: Array<Object>;
	podcast: Array<Object>;
	episodes: Array<Object>;
	routeParam: RouteParams;
	id: string;
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
	// need to set an actual default
	image: string = 'http://slaidcleaves.com/wp-content/themes/soundcheck/images/default-artwork.png';

	constructor(public episodeService: EpisodeService, routeParam: RouteParams, public http:Http, public fablerService: FablerService) {
		this.id = routeParam.get('id');
		this.object_type = 'podcast';
		//this.service.startEpisode(this.routeParam.params.id);

		var headers = new Headers();
		headers.append('Authorization', 'Bearer ' + fablerService.get_token());
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', '*/*');
		this.http.get(fablerService.get_api() + 'podcast/' + this.id + '/comments/', {
			headers: headers
			})
		.subscribe(
			data => this.comments = data.json(),
			err => console.log(err),
			() => console.log()
		);

		this.http.get(fablerService.get_api() + 'podcast/' + this.id + '/', {
			headers: headers
			})
		.subscribe(
			data => this._populatePodcastInfo(data.json()),
			err => console.log(err),
			() => console.log()
		);

		this.http.get(fablerService.get_api() + 'episode/?podcast=' + this.id, {
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

