import {Component} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';
import {EpisodeService} from '../../services/episode_service';

@Component({
	selector: 'player'
	templateUrl: './components/app/player.html',
	styleUrls: ['./components/app/player.css'],
})

export class PlayerCmp {
	episode: Array<Object>;
	slider;
	audioElement;
	audioScrubber;
	volumeScrubber;
	constructor(service: EpisodeService, public http:Http) {
		this.service = service;
		audioScrubber = new Scrubber('scrubber', 0);
		volumeScrubber = new Scrubber('volume', 1);
		audioScrubber.updateCallback = (frac: double) : void => {audioElement.currentTime = audioElement.duration*frac;};
		volumeScrubber.updateCallback = (frac: double) : void => {audioElement.volume=frac;};
		audioElement = document.createElement('audio');
	}
	_populateEpisode(data) {
		audioElement.src = data;
		audioElement.oncanplay = function () {
			sec_num = parseInt(audioElement.duration, 10);
			hours   = Math.floor(sec_num / 3600);
			minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			seconds = sec_num - (hours * 3600) - (minutes * 60);
			if (hours   < 10) {hours   = '0'+hours;}
			if (minutes < 10) {minutes = '0'+minutes;}
			if (seconds < 10) {seconds = '0'+seconds;}
			duration    = hours+':'+minutes+':'+seconds;
			document.querySelector('#duration').innerHTML = duration;
		};
		audioElement.addEventListener('timeupdate',function (){
			setCurrentTime();
			audioScrubber.updateScrubber(audioElement.currentTime/audioElement.duration);
			//slider.style.width = (100*audioElement.currentTime/audioElement.duration) + '%';
			//thumb.style.left = (100*audioElement.currentTime/audioElement.duration) + '%';
		});
		audioElement.addEventListener('ended', function (){
			document.querySelector('#play').className = 'glyphicon glyphicon-play';
			ended = true;
		});
		setCurrentTime = function () {
			sec_num = parseInt(audioElement.currentTime, 10);
			hours   = Math.floor(sec_num / 3600);
			minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			seconds = sec_num - (hours * 3600) - (minutes * 60);
			if (hours   < 10) {hours   = '0'+hours;}
			if (minutes < 10) {minutes = '0'+minutes;}
			if (seconds < 10) {seconds = '0'+seconds;}
			currentTime    = hours+':'+minutes+':'+seconds;
			document.querySelector('#curtime').innerHTML = currentTime;
		};
	}
	PlayPause() {
		if(audioElement.src) {
			if(audioElement.paused) {
				audioElement.play();
				document.querySelector('#play').className = 'glyphicon glyphicon-pause';
			} else {
				audioElement.pause();
				document.querySelector('#play').className = 'glyphicon glyphicon-play';
			}
		}
		else {
			element = this.service.getNextEpisode();
			if(typeof element === "undefined") {
				alert("Nothing loaded in player");
			}
			else {
				this._populateEpisode(element);
				audioElement.play();
				document.querySelector('#play').className = 'glyphicon glyphicon-pause';
			}
		}
	}

}

class Scrubber {
	cachedLeft : double;
	cachedWidth : double;
	cachedTop : double;
	cachedHeight : double;
	isMousedown : boolean;
	min : number;
	max : number;
	value : double;
	ended : boolean;
	scrubber;
	slider;
	thumb;
	public updateCallback;

	constructor(scrubber : string, frac : double) {
		this.scrubber = document.getElementById(scrubber);
		this.slider = this.scrubber.children[0];
		this.thumb = this.scrubber.children[1];
		this.isMousedown = false;
		this.min = 0;
		this.max = 1;
		this.value = frac;
		this.updateScrubber(frac);
		var _this = this;
		this.scrubber.addEventListener('mousedown', function(evt) { _this.mouseDown(evt); });
		window.addEventListener('mouseup', function(evt) { _this.mouseUp(evt); });
		window.addEventListener('mousemove', = function(evt) { _this.mouseMove(evt); });
	}
	mouseDown(evt: MouseEvent) {
		this.isMousedown = true;
		evt.preventDefault();
		var rect = this.scrubber.getBoundingClientRect();
		var xOffset = window.pageXOffset;
		var yOffset = window.pageYOffset;
		this.cachedLeft = rect.left + xOffset;
		this.cachedWidth = rect.width;
		this.cachedTop = rect.top + yOffset;
		this.cachedHeight = rect.height;
		this.thumb.className +=  ' dragging';
		this.setValueFromPageX(evt.pageX);
	}
	mouseUp(evt : MouseEvent) {
		if(!this.isMousedown) return;
		this.isMousedown = false;
		evt.preventDefault();
		this.cachedLeft = undefined;
		this.cachedWidth = undefined;
		this.cachedTop = undefined;
		this.cachedHeight = undefined;
		this.thumb.className = 'thumb';
	}
	mouseMove(evt : MouseEvent) {
		if(!this.isMousedown) return;
		evt.preventDefault();
		this.setValueFromPageX(evt.pageX);
	};
	setValueFromPageX(pageX : double) {
		var frac = Math.min(1, Math.max((pageX - this.cachedLeft)/this.cachedWidth, 0));
		this.value = Math.max(this.min, Math.min(this.max, ((1-frac)*this.min + frac*this.max)));
		frac = (this.value - this.min)/(this.max-this.min);
		this.thumb.style.left = frac*100 + '%';
		this.slider.style.width = frac*100 + '%';
		this.updateCallback(frac);
	};
	updateScrubber(frac: double) {
		this.thumb.style.left = frac*100 + '%';
		this.slider.style.width = frac*100 + '%';
	}
}
