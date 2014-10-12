// Load plugins and stuff
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename')
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    spawn = require('child_process').spawn;

// Styles
gulp.task('styles', function() {
  return gulp.src('css/main.styl')
    .pipe(stylus({
      // Follow includes of regular CSS
      'include css': true
    }))
    .pipe(autoprefixer())
    .pipe(rename('build.css'))
    .pipe(gulp.dest('css/'));
});

// Scripts
gulp.task('scripts', function() {
  // Take all JS except js/build.js, concat it and uglify it
  return gulp.src(['js/**/*.js','!js/build.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'));
});

// Images
gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img'));
});

// Clean builds
gulp.task('clean', function(cb) {
    del(['css/build.css', 'js/build.js'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start(['styles','scripts','images','watch']);
});

// Watch
gulp.task('watch', function() {

  // Load Jekyll
  var jekyll = spawn('jekyll', ['serve','--watch']);

  jekyll.stdout.on('data', function (data) {
      console.log('jekyll: ' + data);
  });

  // Watch .styl files
  gulp.watch('css/**/*.styl', ['styles']);

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('img/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any html, css or js files in _site/, reload on change
  gulp.watch(['_site/**/*.css','_site/**/*.js','_site/**/*.html']).on('change', livereload.changed);

});
