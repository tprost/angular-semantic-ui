const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const glob = require('glob');
const fs = require('fs');
const _ = require('lodash');

gulp.task('demos:static', function() {
  gulp.src('demos/**/*.js')
    .pipe(gulp.dest('dist/demos'));
});

gulp.task('demos', ['demos:static'], function() {
  gulp.src('demos/**/*.html')
    .pipe(nunjucks.compile(demoData()))
    .pipe(gulp.dest('dist/demos'));
});

gulp.task('docs', function(done) {
  var docgen = require('dgeni-alive')();
  docgen.Package().config(function(log) {
    log.level = 'info';
  });

  var js = configObject().js.src;

  docgen.src(js)
    .dest('dist/docs')
    .generate().then(function(){
      console.log("I'm done!");
      done();
    });

});

// parses config file
function configObject() {
  return JSON.parse(fs.readFileSync('config.json', 'utf8'));
};

// the locals data object to give to nunjucks to compile
// the demo pages
function demoData() {
  var data = {};
  data.js = [];
  var config = configObject();
  var js = _.union(config.js.lib, config.js.src);
  _.each(js, function(globPattern) {
    data.js = _.union(data.js, glob.sync(globPattern));
  });
  console.log(js);
  return data;
};
