// Load all needed modules
var gulp = require('gulp'),
    copy = require('gulp-copy'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    server = require('gulp-server-livereload');

// Copy Font Awesome font files
gulp.task('copy', function() {
    gulp.src([
        './node_modules/font-awesome/fonts/*.*'
    ])
        .pipe(copy('assets/dist/fonts/', {"prefix": 10}));
});

// Compress JS files
gulp.task('compress-js', function() {
    gulp.src([
        'assets/src/js/app.js'
    ])
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest('assets/build/js/'))
});

// Combine JS files
gulp.task('combine-js', function() {
    gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/popper.js/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './assets/build/js/app.min.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('assets/dist/js/'));
});

// Compile SASS / SCSS
gulp.task('scss', function() {
    gulp.src('assets/src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(
            {
                "outputStyle": "compressed"
            }
        ).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/dist/css/'))
});

// Run local webserver with live-reloading
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

// Remove .gitignore files for "dist" on setup
gulp.task('cleanup', function() {
    gulp.src('assets/dist/**/.gitignore', { read: false }) // much faster
        .pipe(rimraf());
});

// Setup task for a new project
gulp.task('setup', ['copy', 'compress-js', 'combine-js', 'scss', 'cleanup']);

// Watcher task to look for file changes
gulp.task('watch', function() {
    gulp.watch('assets/src/scss/**/*.scss', ['scss']);
    gulp.watch('assets/src/js/*.js', ['compress-js', 'combine-js'])
    gulp.run('webserver');
});