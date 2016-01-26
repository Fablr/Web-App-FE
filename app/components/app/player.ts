import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {EpisodeService} from '../../services/episode_service';

@Component({
	selector: 'player',
	template: `
        <footer class="footer navbar-fixed-bottom" id="informational">
            <div *ngIf="title">
                <div id="now-playing" class="slideUp">
                    <p>{{title}}</p>
                    <img [src]='image' height="200" width="200">
                    <p>{{author}}</p>
                </div>
            </div>
        </footer>
        <footer class="footer navbar-fixed-bottom">
			<div id="player">
				<div class="form-inline">
						<button type="button" (click)="PlayPrev()" class="btn btn-default" aria-label="Left Align">
							<span class="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
						</button>
						<button type="button" (click)="PlayPause()" class="btn btn-default" id="playpause">
							<span class="glyphicon glyphicon-play" id="play" aria-hidden="true"></span>
						</button>
						<button type="button" (click)="PlayNext()" class="btn btn-default">
							<span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
						</button>
						
						<label for="seek" id="curtime">00:00:00</label>	
						<div id="scrubber">
							<div id="progress"></div>
							<div id="thumb"></div>
						</div>

						<div id="duration">00:00:00</div>
						<div id="volume">
							<div id="progress"></div>
							<div id="thumb"></div>
						</div>
						<div id="rightheader">
						<button type="button" class="btn btn-default pull-right" id="mute">
							<span class="glyphicon glyphicon-volume-up" id="volumemute" aria-hidden="true"></span>
						</button>
					</div>
				</div>
			</div>
		</footer>
		`,
	styleUrls: ['./components/app/player.css', './components/app/animations.css']
})

export class PlayerCmp {
	episode: Array<Object>;
	slider;
	audioElement: any = document.createElement('audio');
	audioScrubber;
	volumeScrubber;
	ended: boolean;

    image = 'http://slaidcleaves.com/wp-content/themes/soundcheck/images/default-artwork.png';
    title = '';
    author = 'Nothing Loaded';

	constructor(public episodeService: EpisodeService, public http:Http) {
		this.audioScrubber = new Scrubber('scrubber', 0);
		this.volumeScrubber = new Scrubber('volume', 1);
		this.audioScrubber.updateCallback = (frac: number) : void => {this.audioElement.currentTime = this.audioElement.duration*frac;};
		this.volumeScrubber.updateCallback = (frac: number) : void => {this.audioElement.volume=frac;};
		//this.audioElement = <HTMLAudioElement>document.createElement('audio');
	}
	PlayPause() {
		if(this.audioElement.src) {
			if(this.audioElement.paused) {
				this.audioElement.play();
				document.querySelector('#play').className = 'glyphicon glyphicon-pause';
			} else {
				this.audioElement.pause();
				document.querySelector('#play').className = 'glyphicon glyphicon-play';
			}
		} else {
			var episode = this.episodeService.getNextEpisode();
			// If we have another episode ready, load it into the player.
			if(typeof episode === 'undefined') {
				alert('Nothing loaded in player');
			} else {
				this.audioElement.src = episode.link;
                this.image = this.episodeService.getNextImage();
                this.author = this.episodeService.getNextAuthor();
                this.title = episode.title;

				var __this = this;
				this.audioElement.addEventListener('canplay',function(){
					var sec_num = parseInt(__this.audioElement.duration, 10);
					var hours   = Math.floor(sec_num / 3600);
					var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
					var seconds = sec_num - (hours * 3600) - (minutes * 60);
					if (hours   < 10) {var nhours   = '0'+hours;} else {nhours = String(hours);}
					if (minutes < 10) {var nminutes = '0'+minutes;} else {nminutes = String(minutes);}
					if (seconds < 10) {var nseconds = '0'+seconds;} else {nseconds = String(seconds);}
					var duration    = nhours+':'+nminutes+':'+nseconds;
					(<HTMLInputElement>document.querySelector('#duration')).innerHTML = duration;
				});
				this.audioElement.addEventListener('timeupdate',function (){
					var sec_num = parseInt(__this.audioElement.currentTime, 10);
					var hours   = Math.floor(sec_num / 3600);
					var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
					var seconds = sec_num - (hours * 3600) - (minutes * 60);
					if (hours   < 10) {var nhours   = '0'+hours;} else {nhours = String(hours);}
					if (minutes < 10) {var nminutes = '0'+minutes;} else {nminutes = String(minutes);}
					if (seconds < 10) {var nseconds = '0'+seconds;} else {nseconds = String(seconds);}
					var currentTime    = nhours+':'+nminutes+':'+nseconds;
					(<HTMLInputElement>document.querySelector('#curtime')).innerHTML = currentTime;
					__this.audioScrubber.updateScrubber(__this.audioElement.currentTime/__this.audioElement.duration);
					//slider.style.width = (100*audioElement.currentTime/audioElement.duration) + '%';
					//thumb.style.left = (100*audioElement.currentTime/audioElement.duration) + '%';
				});
				this.audioElement.addEventListener('ended', function (){
					document.querySelector('#play').className = 'glyphicon glyphicon-play';
					__this.ended = true;
				});
				this.audioElement.play();
				document.querySelector('#play').className = 'glyphicon glyphicon-pause';
			}
		}
	}
    PlayNext() {
        var episode = this.episodeService.getNextEpisode();
        if(typeof episode !== 'undefined') {
            this.title = episode.title;
            this.image = this.episodeService.getNextImage();
            this.author = this.episodeService.getNextAuthor();
			this.audioElement.src = episode.link;
            this.audioElement.play();
            document.querySelector('#play').className = 'glyphicon glyphicon-pause';
        }
    }
    PlayPrev() {
        var episode = this.episodeService.getPrevEpisode();
        if(typeof episode !== 'undefined') {
            this.title = episode.title;
            this.image = this.episodeService.getPrevImage();
            this.author = this.episodeService.getPrevAuthor();
			this.audioElement.src = episode.link;
            this.audioElement.play();
            document.querySelector('#play').className = 'glyphicon glyphicon-pause';
        }
    }
}

class Scrubber {
	cachedLeft : number;
	cachedWidth : number;
	cachedTop : number;
	cachedHeight : number;
	isMousedown : boolean;
	min : number;
	max : number;
	value : number;
	ended : boolean;
	scrubber;
	slider;
	thumb;
	public updateCallback;

	constructor(scrubber : string, frac : number) {
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
		window.addEventListener('mousemove', function(evt) { _this.mouseMove(evt); });
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
	setValueFromPageX(pageX : number) {
		var frac = Math.min(1, Math.max((pageX - this.cachedLeft)/this.cachedWidth, 0));
		this.value = Math.max(this.min, Math.min(this.max, ((1-frac)*this.min + frac*this.max)));
		frac = (this.value - this.min)/(this.max-this.min);
		this.thumb.style.left = frac*100 + '%';
		this.slider.style.width = frac*100 + '%';
		this.updateCallback(frac);
	};
	updateScrubber(frac: number) {
		this.thumb.style.left = frac*100 + '%';
		this.slider.style.width = frac*100 + '%';
	}
}
