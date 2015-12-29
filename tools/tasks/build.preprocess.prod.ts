import {join} from 'path';
import {APP_SRC, APP_DEST, PROD_CLIENT_ID, PROD_API_URL} from '../config';

export = function buildPreprocess(gulp, plugins) {
  return function () {
    let src = [
                join(APP_SRC, '**/*.ts'),
                '!' + join(APP_SRC, '**/*_spec.ts')
              ];

    return gulp.src(src)
	  .pipe(plugins.preprocess({context: {CLIENT_ID: PROD_CLIENT_ID}}))
    .pipe(plugins.preprocess({context: {API_HTTP: PROD_API_URL}}))
	  .pipe(gulp.dest(APP_DEST));
  };
};
