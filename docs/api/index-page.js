'use strict';

var _ = require('lodash');

/**
 * @dgProcessor generateIndexPagesProcessor
 * @description
 * This processor creates docs that will be rendered as the index page for the app
 */
module.exports = function generateIndexPagesProcessor() {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: function(docs) {
      var indexDoc = _.defaults({
        docType: 'indexPage'
      }, {});

      indexDoc.id = 'index';

      docs.push(indexDoc);
    }
  };
};
