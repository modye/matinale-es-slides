var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var del = require('del');

var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var uglifySaveLicense = require('uglify-save-license');

var $ = require('gulp-load-plugins')();

var paths = {
  src: 'src/slides',
  style: 'src/css/source/**/*.scss',
  template: 'src/templates/index.html',
  dist: 'output/dist',
  tmp: '.tmp',
  images: 'src/resources/images',
  fonts: 'src/resources/fonts',
  'bower': 'bower_components'
}

/* *** Template *** */
gulp.task('template', function() {
  var slides = JSON.parse(fs.readFileSync(path.join(paths.src, 'list.json')));
  var sectionTemplate = fs.readFileSync('src/templates/_section.html');
  var templatingData = {
    slides: slides,
    section: function(slide, isTitle) {
      var cpte = _.template(sectionTemplate.toString())({slide: slide, isTitle: !!isTitle});
      return cpte;
    }
  };

  return gulp.src(paths.template)
  .pipe($.template(templatingData))
  .pipe(gulp.dest(paths.tmp))
  .pipe($.size({title: path.join(paths.tmp, '/'), showFiles: true}));

});

/* *** Style *** */
gulp.task('style', function() {
  return gulp.src(paths.style)
  .pipe($.sass().on('error', $.sass.logError))
  .pipe(gulp.dest(paths.tmp))
  .pipe(browserSync.stream({match: '**/*.css'}));
});

/* *** Watch *** */
gulp.task('watch', function() {
  gulp.watch(paths.style, ['style']);
  gulp.watch(path.join(paths.src, '**/*.{md,json}'), ['template']).on('change', browserSync.reload);
});

/* *** Copy *** */
gulp.task('copy:images', function() {
  return gulp.src(path.join(paths.images, '/**/*.*'))
  .pipe(gulp.dest(path.join(paths.dist, 'images')))
  .pipe($.size({title: path.join(paths.dist, '/images'), showFiles: true}));
});

gulp.task('copy:md', function() {
  return gulp.src(path.join(paths.src, '/**/*.md'))
  .pipe(gulp.dest(path.join(paths.dist, 'slides')))
  .pipe($.size({title: path.join(paths.dist, '/slides'), showFiles: true}));
});

gulp.task('copy:fonts', function() {
  return gulp.src([
    path.join(paths.bower, 'mdi/fonts/**/*.{eot,svg,otf,ttf,woff,woff2}'),
    path.join(paths.fonts, '**/*.{eot,svg,otf,ttf,woff,woff2}'),
    path.join(paths.bower, 'font-source-sans-pro/**/*.{eot,svg,otf,ttf,woff,woff2}')
  ])
  .pipe(gulp.dest(path.join(paths.dist, 'fonts')))
  .pipe($.size({title: 'Fonts', showFiles: true}));
})

/* *** Browser sync *** */
gulp.task('serve', function() {
  serve(paths.tmp);
});

gulp.task('serve:dist', function() {
  serve(paths.dist);
});

function serve(baseDir) {
  browserSync.init({
    server: {
      baseDir: baseDir,
      routes: {
        '/bower_components': 'bower_components',
        '/slides': paths.src,
        '/images': paths.images,
        '/fonts': paths.fonts,
        '/fonts/materialdesignicons-webfont.woff2': paths.bower + '/mdi/fonts/materialdesignicons-webfont.woff2',
        '/fonts/materialdesignicons-webfont.woff': paths.bower + '/mdi/fonts/materialdesignicons-webfont.woff',
        '/fonts/WOFF': paths.bower + '/font-source-sans-pro/WOFF',
      }
    },
    online: false
  });
};

/* *** Build *** */
gulp.task('html', function() {

  const jsFilter = $.filter('**/*.js', {restore: true});
  const cssFilter = $.filter('**/*.css', {restore: true});
  const htmlFilter = $.filter('*.html', {restore: true});

  return gulp.src(path.join(paths.tmp, '/*.html'))
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.uglify({preserveComments: uglifySaveLicense})).on('error', errorHandler('Uglify'))
    .pipe($.rev())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.minifyCss({compatibility: '*'}))
    .pipe($.rev())
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({conditionals: true, loose: true}))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(paths.dist, '/')))
    .pipe($.size({title: path.join(paths.dist, '/'), showFiles: true}));
});

gulp.task('clean', function() {
  return del([path.join(paths.dist, '/'), path.join(paths.tmp, '/')]);
});

gulp.task('default', function(done) {
  runSequence(
    ['style', 'template'],
    ['watch', 'serve'],
    done);
});

gulp.task('test:dist', function(done) {
  runSequence(
    'clean',
    ['style', 'template'],
    'html',
    'serve:dist',
    done);
});

gulp.task('build', function(done) {
  runSequence(
    'clean',
    ['style', 'copy:images', 'copy:md', 'copy:fonts', 'template'],
    'html',
    done);
});


var errorHandler = function(title) {
  'use strict';

  return function(err) {
    $.util.log($.util.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
