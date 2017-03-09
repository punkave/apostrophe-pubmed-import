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
        // full list of keys further down
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

## Example PubMed object
```javascript
{
  "uid": "28265654",
  "pubdate": "2017 Mar 7",
  "epubdate": "",
  "source": "Ann Intern Med",
  "authors": "Briatore L, Pozzi I",
  "lastauthor": "Pozzi I",
  "title": "Annals Graphic Medicine - Something Strange.",
  "sorttitle": "annals graphic medicine something strange",
  "volume": "166",
  "issue": "5",
  "pages": "W5-W6",
  "lang": [
    "eng"
  ],
  "nlmuniqueid": "0372351",
  "issn": "0003-4819",
  "essn": "1539-3704",
  "pubtype": [
    "Journal Article"
  ],
  "recordstatus": "PubMed - in process",
  "pubstatus": "4",
  "articleids": [
    {
      "idtype": "pubmed",
      "idtypen": 1,
      "value": "28265654"
    },
    {
      "idtype": "pii",
      "idtypen": 4,
      "value": "2607783"
    },
    {
      "idtype": "doi",
      "idtypen": 3,
      "value": "10.7326\/G16-0026"
    },
    {
      "idtype": "rid",
      "idtypen": 8,
      "value": "28265654"
    },
    {
      "idtype": "eid",
      "idtypen": 8,
      "value": "28265654"
    }
  ],
  "history": [
    {
      "pubstatus": "entrez",
      "date": "2017\/03\/08 06:00"
    },
    {
      "pubstatus": "pubmed",
      "date": "2017\/03\/08 06:00"
    },
    {
      "pubstatus": "medline",
      "date": "2017\/03\/08 06:00"
    }
  ],
  "references": [
    
  ],
  "attributes": [
    
  ],
  "pmcrefcount": "",
  "fulljournalname": "Annals of internal medicine",
  "elocationid": "doi: 10.7326\/G16-0026",
  "doctype": "citation",
  "srccontriblist": [
    
  ],
  "booktitle": "",
  "medium": "",
  "edition": "",
  "publisherlocation": "",
  "publishername": "",
  "srcdate": "",
  "reportnumber": "",
  "availablefromurl": "",
  "locationlabel": "",
  "doccontriblist": [
    
  ],
  "docdate": "",
  "bookname": "",
  "chapter": "",
  "sortpubdate": "2017\/03\/07 00:00",
  "sortfirstauthor": "Briatore L",
  "vernaculartitle": "",
  "abstract": null,
  "doi": "10.7326\/G16-0026",
  "pmid": 28265654,
  "pubDate": "2017\/03\/07 00:00"
}
```