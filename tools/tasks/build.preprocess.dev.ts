import {join} from 'path';
import {APP_SRC, APP_DEST, DEV_CLIENT_ID, DEV_API_URL} from '../config';

export = function buildPreprocess(gulp, plugins) {
  return function () {
    let src = [
                join(APP_SRC, '**/*.ts'),
                '!' + join(APP_SRC, '**/*_spec.ts')
              ];

    return gulp.src(src)
    .pipe(plugins.preprocess({context: {API_HTTP: DEV_API_URL}}))
	  .pipe(plugins.preprocess({context: {CLIENT_ID: DEV_CLIENT_ID}}))
	  .pipe(gulp.dest(APP_DEST));
  };
};
