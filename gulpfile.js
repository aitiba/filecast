var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject');

    // Search on styles and javascript folder to inject on index.html
    gulp.task('inject', function() {
      var sources = gulp.src(['./public/*.js','./public/javascripts/*.js', './public/javascripts/controllers/*.min.js','./public/javascripts/controllers/*.js', './public/stylesheets/*.css']);
      gulp.src('index.html', {cwd: './public'})
        .pipe(inject(sources, {
          ignorePath: '/public'
        }))
        .pipe(gulp.dest('./public'));
    });

    // Inject via bower installed libraries
    gulp.task('wiredep', function () {
      gulp.src('index.html', {cwd: './public'})
        .pipe(wiredep({
          directory: './public/javascripts/bower_components'
        }))
        .pipe(gulp.dest('./public'));
    });


gulp.task('wiredep-step', ['wiredep']);
gulp.task('inject-step', ['inject']);
