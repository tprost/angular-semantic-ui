var fs = require('fs-extra');
var path = require('path');
var nunjucks = require('nunjucks');
var _ = require('lodash');
var glob = require("glob");
var mkdirp = require('mkdirp');

var options = {};
var locals = {};
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var root = path.resolve(__dirname, '..');

// fill locals object with paths to js and css files
locals.js = [];

_.each(config.js.src, function(jsFile) {
  _.each(jsFile, function(globPattern) {
    var files = glob.sync(globPattern);
    locals.js = _.union(locals.js, files);
  });
});

locals.css = ['/css/stylesheet.css'];

// // copy the whole demos directory to dist
// // var demoDirectories = glob.sync('src/demos/*');
// // fs.copySync('src/demos', 'dist/demos');
// fs.copySync('src/test', 'dist/test');

// render all index.html files under src/demos
var demoPages = glob.sync('demos/**/!(_)*.html');

console.log(demoPages);

_.each(demoPages, function(pathToPage) {

  // normalize path so that we know it uses `path.sep` as the separator
  pathToPage = path.normalize(pathToPage);

  var res = nunjucks.render(pathToPage, locals);
  var dest = path.normalize('dist' + path.sep + pathToPage);
  fs.mkdirsSync(path.dirname(dest));
  fs.writeFileSync(dest, res);
  console.log('wrote ' + dest);
});
