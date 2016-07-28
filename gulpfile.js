const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const glob = require('glob');
const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const livereload = require('express-livereload');

gulp.task('build', function() {

});

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

gulp.task('serve', function() {
  var app = express();



  app.use(express.static('dist'));
  app.use('/bower_components', express.static('bower_components'));
  app.use('/src', express.static('src'));
  app.use('/semantic', express.static('semantic'));

  livereload(app);

  // start server
  var port = process.env.PORT || 3000;
  console.log("server started on port " + port);
  app.listen(port);

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
