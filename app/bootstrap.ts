import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppCmp} from './components/app/app';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(AppCmp, [
  HTTP_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '<%= APP_DEST %>' } ),
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
