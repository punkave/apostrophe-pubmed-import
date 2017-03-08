var async = require('async');
var importer = require('./import.js');

module.exports = function(self, options) {
	// modal editor
  self.route('post', 'pubmed-import-modal', function(req, res) {
  	
  	// if dev provided a default googlespreadsheet, provide it as help text
  	if (self.options.pubmedImport.googleSpreadsheetId) {
  		self.options.modalFields.forEach(function(field) {
  			if (field.name === 'googleSpreadsheetId') {
  				field.help = self.options.pubmedImport.googleSpreadsheetId
  			}
  		});
  	}

    return res.send(self.render(req, 'importModal', {
      options: {
        label: self.label,
        pluralLabel: self.pluralLabel,
        name: self.name,
        fields: self.options.modalFields
      }
    }));
  });

  // start import
  self.route('get', 'import', function(req, res) {
  	var options = req.query;
  	options.mapFields = self.options.pubmedImport.mapFields;
  	options.self = self;
    var error;

    if (!options.mapFields) { error += "developer must configure an import map. " }
    if (!options.googleSpreadsheetId) { error += "user must provide a google spreadsheet. " }

    if (error) {
    	console.log(error)
    	return res.send({ status: 'error', msg: error })
    }	

		async.waterfall([
	    async.constant(options),
	    importer.getGoogleSpreadsheet,
	    importer.getPublications,
	    importer.createAndInsertPieces
		], function (err, importCount) {
	    if (err) {
	    	res.send(err);
	    } else {
	    	res.send({ status: 'okay', msg: 'Successfully imported ' + importCount + ' records.' });
	    }
		});
  });

}