import { Injectable } from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {FablerService} from './fabler_service';

@Injectable()
export class EpisodeService {
	episodeList:Array<Object> = [];
    imageList:Array<string> = [];
    authorList:Array<string> = [];
	prev_episodeList:Array<Object> = [];
    prev_imageList:Array<string> = [];
    prev_authorList:Array<string> = [];
    current_episode;
    current_image;
    current_author;
	constructor(public http:Http, public fablerService: FablerService) {
		this.episodeList = [];
	}
	getNextEpisode() {
        if(this.current_episode) {
            this.prev_episodeList.push(this.current_episode);
        }
		this.current_episode = this.episodeList.shift();
        return this.current_episode;
	}
    getNextImage() {
        if(this.current_image) {
            this.prev_imageList.push(this.current_image);
        }
		this.current_image = this.imageList.shift();
        return this.current_image;
    }
    getNextAuthor() {
        if(this.current_author) {
            this.prev_authorList.push(this.current_author);
        }
		this.current_author = this.authorList.shift();
        return this.current_author;
    }
	getPrevEpisode() {
        if(this.current_episode) {
            this.episodeList.unshift(this.current_episode);
        }
		this.current_episode = this.prev_episodeList.shift();
        return this.current_episode;
	}
    getPrevImage() {
        if(this.current_image) {
            this.imageList.unshift(this.current_image);
        }
		this.current_image = this.prev_imageList.shift();
        return this.current_image;
    }
    getPrevAuthor() {
        if(this.current_author) {
            this.authorList.unshift(this.current_author);
        }
		this.current_author = this.prev_authorList.shift();
        return this.current_author;
    }
	addEpisode(id:number, image:string, author:string) {
		var headers = new Headers();
		headers.append('Authorization', 'Bearer ' + this.fablerService.get_token());
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', '*/*');
		this.http.get(this.fablerService.get_api() + 'episode/' + id + '/', {
			headers: headers
			})
		.subscribe(
			data => { this.episodeList.push(data.json()); this.imageList.push(image); this.authorList.push(author);},
			err => console.log(err),
			() => console.log()
		);
	}
}

