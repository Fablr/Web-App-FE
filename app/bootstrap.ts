import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from 'angular2/router';
import {AppCmp} from './components/app/app';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(AppCmp, [
  HTTP_PROVIDERS,
  provide(APP_BASE_HREF, {useValue : '/'}),
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
