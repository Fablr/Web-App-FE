/// <reference path="../../../tools/typings/tsd/tsd.d.ts" />

import {Component, ViewEncapsulation} from 'angular2/angular2';
import {EpisodeService} from '../../services/episode_service';

import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'http/http';

import {HomeCmp} from '../home/home';
import {EpisodeCmp} from '../episode/episode';
import {PodcastCmp} from '../podcast/podcast';
import {PlayerCmp} from './player';

@Component({
  selector: 'app',
  viewBindings: [EpisodeService],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, PlayerCmp]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/episode/:id', component: EpisodeCmp, as: 'Episode' }
  { path: '/podcast/:id', component: PodcastCmp, as: 'Podcast' }
])
export class AppCmp {
}
