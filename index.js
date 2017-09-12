module.exports = {
  improve: 'apostrophe-pieces',

  modalFields: [
    {
      name: 'googleSpreadsheetId',
      label: 'Google Spreadsheet ID',
      type: 'string',
      help: 'Tips on finding the ID of a spreadsheet http://stackoverflow.com/a/36062068',
    }
  ],

  afterConstruct: function(self, callback) {

    if (!self.options.pubmedImport) {
      return setImmediate(callback);
    }

    self.pubmedImportAddRoutes();
    self.pubmedImportPushAssets();
    self.pubmedImportPushDefineRelatedTypes();
    return setImmediate(callback);
  },

  construct: function(self, options) {

    self.pubmedImportAddRoutes = function() {
      require('./lib/routes.js')(self, options);
    };

    self.pubmedImportPushDefineRelatedTypes = function() {
      self.apos.push.browserMirrorCall('user', self, { 'tool': 'pubmed-import-modal', stop: 'apostrophe-pieces' });
    };

    self.pubmedImportPushAssets = function() {
      self.pushAsset('script', 'pubmed-import-modal', { when: 'user' });
    };

  }
};
