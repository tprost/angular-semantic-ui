// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Package = require('dgeni').Package;


module.exports = new Package('dgeni-example', [
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks')
])
  .processor(require('./index-page.js'))
  .processor(require('./pages-data.js'))

  .config(function(log, readFilesProcessor, writeFilesProcessor) {

    log.level = 'info';

    readFilesProcessor.basePath = path.resolve(__dirname, '../..');
    readFilesProcessor.sourceFiles = [
      { include: 'src/**/*.js', basePath: 'src' },
      { include: 'docs/src/**/*.ngdoc', basePath: 'docs/src' }
    ];

    writeFilesProcessor.outputFolder  = 'dist/api';

  })

  .config(function(computePathsProcessor, computeIdsProcessor, getAliases) {

    computePathsProcessor.pathTemplates.push({
      docTypes: ['overview', 'tutorial'],
      getPath: function(doc) {
        var docPath = path.dirname(doc.fileInfo.relativePath);
        if (doc.fileInfo.baseName !== 'index') {
          docPath = path.join(docPath, doc.fileInfo.baseName);
        } else {
          docPath = "index";
        }
        return docPath;
      },
      outputPathTemplate: 'partials/${path}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['controller'],
      getPath: function(doc) {
        var docPath = path.dirname(doc.fileInfo.relativePath);
        if (doc.fileInfo.baseName !== 'index') {
          docPath = path.join(docPath, doc.fileInfo.baseName);
        } else {
          docPath = "index";
        }
        return docPath;
      },
      outputPathTemplate: 'partials/${path}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['indexPage'],
      pathTemplate: '.',
      outputPathTemplate: '${id}.html',
      getPath: function(doc) {















        console.log(doc);
        return "index.html";
      }
    });

    computeIdsProcessor.idTemplates.push({
      docTypes: ['overview', 'tutorial', 'e2e-test', 'indexPage'],
      getId: function(doc) {
        return doc.fileInfo.baseName;
      },
      getAliases: function(doc) { return [doc.id]; }
    });

    computeIdsProcessor.idTemplates.push({
      docTypes: ['controller'],
      idTemplate: 'module:${module}.${docType}:${name}',
      getAliases: getAliases,
      pathTemplate: '${area}/${module}/${docType}/${name}',
      outputPathTemplate: 'partials/${area}/${module}/${docType}/${name}.html',
      getPath: function() {
        return "path motehrfucker";
      }
    });

    computeIdsProcessor.idTemplates.push({
      docTypes: ['module' ],
      idTemplate: 'moduleeee:${name}',
      getAliases: function() {
        return [];
      }
    });

  })


  .config(function(templateFinder, templateEngine) {

    // Nunjucks and Angular conflict in their template bindings so change the Nunjucks
    templateEngine.config.tags = {
      variableStart: '{$',
      variableEnd: '$}'
    };

    console.log(templateEngine.getRenderer());

    // templateFinder.templateFolders
    //     .unshift(path.resolve(__dirname, 'dgeni/templates'));



    // templateFinder.templateFolders
    //   .unshift(path.resolve(__dirname, '../../docs/ngdoc/templates/api'));

    // templateFinder.templateFolders
    //   .unshift(path.resolve(__dirname, '../../docs/ngdoc/templates'));

    templateFinder.templateFolders
      .unshift(path.resolve(__dirname, 'config/templates'));

    templateFinder.templateFolders
      .unshift(path.resolve(__dirname, 'config/templates/api'));

    // templateFinder.templatePatterns = [
    //   '${ doc.template }',
    //   '${ doc.id }.${ doc.docType }.template.html',
    //   '${ doc.id }.template.html',
    //   '${ doc.docType }.template.html',
    //   'common.template.html'
    // ];
  })


  .config(function(getLinkInfo) {
    getLinkInfo.relativeLinks = true;
  });
