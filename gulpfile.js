var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject'),
    gls = require('gulp-live-server'),
    gulpNgConfig = require('gulp-ng-config'),

    gulp.task('serve', function() {
      var server = gls('app.js', {env: {NODE_ENV: 'development'}});
      server.start();

      //use gulp.watch to trigger server actions(notify, start or stop)
      gulp.watch(['./public/index.html', './public/templates/*.html', './public/*.js','./public/javascripts/*.js', './public/javascripts/controllers/*.js', './public/javascripts/services/*.js', './public/stylesheets/*.css'], function (file) {
        server.notify.apply(server, [file]);
      });
    });

    // Search on styles and javascript folder to inject on index.html
    gulp.task('inject', function() {
      var sources = gulp.src(['./public/*.js','./public/javascripts/*.js', './public/javascripts/controllers/*.js', './public/javascripts/services/*.js', './public/stylesheets/*.css']);
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
          directory: './public/javascripts/bower_components',
          devDependencies: true
        }))
        .pipe(gulp.dest('./public'));
    });

    gulp.task('config', function () {
      return gulp.src('./prod-config.json')
        .pipe(gulpNgConfig('app.config'))
        .pipe(gulp.dest('./public'));
    });


gulp.task('wiredep-step', ['config', 'wiredep']);
gulp.task('inject-step', ['inject']);
