// Load plugins
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename')
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    spawn = require('child_process').spawn;

// Styles
gulp.task('styles', function() {
  return gulp.src('css/main.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename('build.css'))
    .pipe(gulp.dest('css/'))
    .pipe(notify({ message: 'Styles compiled' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['js/**/*.js','!js/build.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['css/build.css', 'js/build.js'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('watch');
});

// Watch
gulp.task('watch', function() {

  // Load Jekyll
  var jekyll = spawn('jekyll', ['serve','--watch']);

  jekyll.stdout.on('data', function (data) {
      console.log('jekyll: ' + data);
  });

  // Watch .scss files
  gulp.watch('css/**/*.styl', ['styles']);

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('img/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['_site/**/*.css','_site/**/*.js','_site/**/*.html']).on('change', livereload.changed);

});
