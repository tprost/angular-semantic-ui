const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const glob = require('glob');
const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const livereload = require('express-livereload');
const watch = require('gulp-watch');

var Dgeni = require('dgeni');

gulp.task('build', function() {

});

// render documentation HTML snippets that we can use in the demo pages
gulp.task('docs:api', function() {
  try {
    var dgeni = new Dgeni([require('./docs/api/dgeni-conf')]);
    return dgeni.generate();
  } catch(x) {
    console.log(x.stack);
    throw x;
  }
});

gulp.task('docs:demos:static', function() {
  gulp.src('docs/demos/**/*.!(html)')
    .pipe(gulp.dest('dist/demos'));
});

gulp.task('docs:api:static', function() {
  gulp.src('docs/**/*.!(html)')
    .pipe(gulp.dest('dist'));
});

gulp.task('docs:api:dgeni', function() {
  try {
    var dgeni = new Dgeni([require('./docs/api/dgeni-conf')]);
    return dgeni.generate();
  } catch(x) {
    console.log(x.stack);
    throw x;
  }
});

gulp.task('docs:demos:nunjucks', function() {
  gulp.src('docs/demos/**/!(_)*.html')
    .pipe(nunjucks.compile(demoData()))
    .pipe(gulp.dest('dist/demos'));
});

gulp.task('docs:demos', ['docs:demos:nunjucks']);

gulp.task('docs:api', ['docs:api:dgeni', 'docs:api:static']);
  // 'docs:demos:nunjucks']);

gulp.task('docs', ['docs:demos', 'docs:api'], function() {

});

gulp.task('serve', function() {
  var app = express();

  app.use(express.static('dist'));
  app.use('/bower_components', express.static('bower_components'));
  app.use('/src', express.static('src'));
  app.use('/api', express.static('dist/api'));
  app.use('/images', express.static('docs/images'));
  app.use('/semantic', express.static('semantic'));

  livereload(app);

  // start server
  var port = process.env.PORT || 3000;
  console.log("server started on port " + port);
  app.listen(port);

});

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', 'docs/**/*'], ['docs:demos']);
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
