# apostrophe-pubmed-import

This module adds an optional import from PubMed feature to all `apostrophe-pieces` in an [Apostrophe](http://apostrophecms.org) project.

In it's current state it blindly writes new pieces on each import, it does not check for duplicate PubMed docs. This would be a cool feature to throw in the config modal though

## in app.js

```javascript
modules: {
  'apostrophe-pubmed-import': {},
  // other modules...
  'my-module-that-extends-pieces': {
    pubmedImport: {
      googleSpreadsheetId: 'o4nfowuenf', // optional, include a spreadsheet ID in the help text
      mapFields: { 
        // import map, key is Piece fieldname, value is pubmed document key
        // optionally, the full pubmed doc is available as `raw`
        // pubmed keys are `abstract`, `authors`, `doi`, `pmid`, `pubDate`, `title`, `raw`
        'pubmedId' : 'pmid',
      }
    }
  }
}
```

## In the `views/` folder of your module that extends pieces

```markup
{%- extends "managerModalBase.html" -%}
{%- import "piecesMacros.html" as pieces with context -%}
{%- import 'apostrophe-ui:components/buttons.html' as buttons with context -%}

{%- block controls -%}
  {{ buttons.minor('Import from PubMed', { action: 'pubmed-import-' + data.options.name }) }}
  {{ pieces.manageControls() }}
{%- endblock -%}
```

## The Google Spreadsheet

The import configuration modal requires you to enter the ID of a PUBLIC Google Spreadsheet.

Right now the spreadsheet format just cares about a column titled `id` with a list of PMID's. An example spreadsheet can be seen at https://docs.google.com/spreadsheets/d/1HuAxHijAFAzz-XFa5FGRTF6AdJ-HLJuHSCDBSDqr4Xc/pubhtml

