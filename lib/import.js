var gsjson = require('google-spreadsheet-to-json');
var _ = require('lodash');
var ncbi = require('node-ncbi');
var async = require('async');

module.exports = {
	// get a google spreadsheet as JSON
	getGoogleSpreadsheet: function(options, callback) {
    gsjson({ spreadsheetId: options.googleSpreadsheetId })
    .then(function(result) {
      // we just want an array of the ids
      var ids = [];
      result.forEach(function(row) {
        ids.push(row.id)
      })
      return callback(null, ids, options);
    })
    .catch(function(error) {
    	if (error) {
    		return callback({ status: 'error', msg: 'Error retrieving spreadsheet' })
    	}
    });
  },

  getPublications: function(ids, options, callback) {
  	var db = ncbi.pubmed;
  	var docs = [];
		async.each(ids, function(id, callback) {
			var doc;
	  	db.summary(id).then((summary) => {
	  		doc = summary;
				db.abstract(id).then((abstract) => {
          // node-ncbi gives us a really stripped down version of the document
          // but includes the raw one as its own object
          // lets combine the best of both of these
          var full = doc.raw;
          full.authors = doc.authors;
          full.abstract = abstract;
          full.doi = doc.doi;
          full.pmid = doc.pmid;
          full.pubDate = doc.pubDate;
          full.pubmedLink = 'https://www.ncbi.nlm.nih.gov/pubmed/' + doc.pmid;
          full.year = moment(new Date(full.pubDate)).format('YYYY');
          full.published = moment(new Date(full.pubDate)).format('LL');
		  		callback();
				});
			});
		}, function(err) {
		    if( err ) {
	    		return callback({ status: 'error', msg: 'Error in communicating with PubMed api' })
		    } else {
		      return callback(null, docs, options);
		    }
		});
  },

  createAndInsertPieces: function(docs, options, callback) {
  	if (docs.length === 0) {
  		return callback({ status: 'warning', msg: 'No documents retrieved, check for vaild PMIDs in spreadsheet' })
  	}

  	var importCount = 0;

		async.each(docs, function(doc, callback) {
			var piece = options.self.newInstance();
			var req = options.self.apos.tasks.getReq();

			Object.keys(options.mapFields).map(function (key) {
				piece[key] = doc[options.mapFields[key]]
			});

			if (!piece.slug) {
				piece.slug = options.self.apos.utils.slugify(piece.title)
			}

			if (piece.title && piece.slug) {
				importCount++;
				return options.self.insert(req, piece, callback);
			} else {
				return setImmediate(callback);
			}
			
		}, function(err) {
	    if( err ) {
	      return callback({ status: 'error', msg: err })
	    } else {
	      return callback(null, importCount);
	    }
		});
  }
}