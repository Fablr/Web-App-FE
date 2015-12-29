import {Component, ViewEncapsulation} from 'angular2/core';
import {EpisodeService} from '../../services/episode_service';
import {FablerService} from '../../services/fabler_service';

import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../home/home';
import {EpisodeCmp} from '../episode/episode';
import {PodcastCmp} from '../podcast/podcast';
import {PlayerCmp} from './player';
import {NavCmp} from '../navbar/navbar';
import {Login} from './login';

@Component({
  selector: 'app',
  viewBindings: [EpisodeService, FablerService],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, PlayerCmp, Login, NavCmp]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/episode/:id', component: EpisodeCmp, as: 'Episode' },
  { path: '/podcast/:id', component: PodcastCmp, as: 'Podcast' }
])
export class AppCmp {
}
