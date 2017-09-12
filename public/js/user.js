// Extend apostrophe-pieces with browser side code for imports.

apos.define('apostrophe-pieces', {

  afterConstruct: function(self) {
    self.pubmedImportClickHandlers();
  },

  construct: function(self, options) {

    self.pubmedImportClickHandlers = function() {
      apos.ui.link('apos-pubmed-import', self.name, function($button, _id) {
        self.pubmedImport();
      });
    };

    self.pubmedImport = function() {
      return self.getTool('pubmed-import-modal');
    };

  }
});
