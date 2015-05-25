var gulp = require('gulp');
var gutil = require('gulp-util');
// Getting started with Gulp
// https://markgoodyear.com/2014/01/getting-started-with-gulp/
// File Structure is imitated under Build directory

// Minify HTML
var minifyHTML = require('gulp-minify-html');

// uglify - JS minify
var uglify = require('gulp-uglify');

// // image minify
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');
//
// concat
var concat = require('gulp-concat');
//
// watch
var watch = require('gulp-watch');
//
// Minify Css
var minifyCss = require('gulp-minify-css');
//
// // Empty
// gulp.task('default', function() {
//   // place code for your default task here
//
// });

// Minify HTML
gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('build'));
});

// Uglify Js
gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('build/js'));
});

// // Image-min
// gulp.task('imgmin', function () {
//     return gulp.src('src/images/*')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('build'));
// });

// // Concat
// gulp.task('scripts', function() {
//   return gulp.src('./lib/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('./dist/'));
// });


// Gulp watches and run tasks if needed.
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('css/*.css', ['css']);

  // Watch .js files
  gulp.watch('js/*.js', ['js']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch .html files
  gulp.watch('*.html', ['html']);

});

// // Gulp Watch
// gulp.task('stream', function () {
//     gulp.src('css/**/*.css')
//         .pipe(watch('css/**/*.css'))
//         .pipe(gulp.dest('build'));
// });
// // Gulp Watch 2
// gulp.task('callback', function () {
//     watch('css/**/*.css', function () {
//         gulp.src('css/**/*.css')
//             .pipe(watch('css/**/*.css'));
//     ));
// });

// Copying important files over build folder
gulp.task('packages', function(){
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('build/js'));
  gulp.src('node_modules/knockout/build/output/knockout-latest.js')
    .pipe(gulp.dest('build/js'));
  gulp.src('fonts/**')
    .pipe(gulp.dest('build/fonts'));
});


// Minify CSS
gulp.task('css', function() {
  return gulp.src('css/*.css')
    .pipe(concat('style.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

// default task
gulp.task('default', function(){
  gulp.run('html', 'js', 'css');

  // Watch .scss files
  gulp.watch('css/*.css', ['css']);

  // Watch .js files
  gulp.watch('js/*.js', ['js']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch .html files
  gulp.watch('*.html', ['html']);
});
