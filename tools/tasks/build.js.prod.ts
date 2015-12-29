import {join} from 'path';
import {APP_SRC, TMP_DIR, PROD_CLIENT_ID, PROD_API_URL} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

export = function buildJSDev(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
                join(APP_SRC, '**/*.ts'),
                '!' + join(APP_SRC, '**/*_spec.ts')
              ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
	    .pipe(plugins.preprocess({context: {CLIENT_ID: PROD_CLIENT_ID, API_HTTP: PROD_API_URL}}))
      .pipe(plugins.inlineNg2Template({ base: TMP_DIR }))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(TMP_DIR));
  };
};
