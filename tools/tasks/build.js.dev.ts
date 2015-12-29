import {join} from 'path';
import {APP_SRC, APP_DEST, DEV_CLIENT_ID, DEV_API_URL} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

export = function buildJSDev(gulp, plugins) {
  let tsProject = tsProjectFn(plugins);
  return function () {
    let src = [
                join(APP_SRC, '**/*.ts'),
                '!' + join(APP_SRC, '**/*_spec.ts')
              ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      // Won't be required for non-production build after the change
      .pipe(plugins.inlineNg2Template({ base: APP_SRC }))
	    .pipe(plugins.preprocess({context: {CLIENT_ID: DEV_CLIENT_ID, API_HTTP: DEV_API_URL}}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };
};
