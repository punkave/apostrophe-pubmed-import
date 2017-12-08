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
      // Import field map
      mapFields: {
        // Include a key/value pair for each field importing. This will likely
        // match the `pubmed.map` object in your piece module, with the id added.
        // `key` is the piece fieldname, `value` is pubmed document key.
        // Full list of keys further down.
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

The import configuration modal requires you to enter the ID of a PUBLIC Google Spreadsheet. The spreadsheet must be public itself, but also published to the web using the user interface: `File > Publish to the web`. The ID of the "published to the web" version may be different from the ID of the spreadsheet itself. Use the ID from the spreadsheet.

For example, if your spreadsheet URL is https://docs.google.com/spreadsheets/d/2ZVD4_gysdJ0CJ0w5Dq-x9bZmL28OT0Ox_TY8Kn5K41w/edit#gid=0, your ID is `2ZVD4_gysdJ0CJ0w5Dq-x9bZmL28OT0Ox_TY8Kn5K41w`.

Right now the spreadsheet format just cares about a column titled `id` with a list of PMID's. An example spreadsheet can be seen at https://docs.google.com/spreadsheets/d/1HuAxHijAFAzz-XFa5FGRTF6AdJ-HLJuHSCDBSDqr4Xc/pubhtml

## Example PubMed object
```javascript
{ uid: '28277220',
  pubdate: '2017 Mar 2',
  epubdate: '',
  source: 'Euro Surveill',
  authors: 'Peters T, Bertrand S, Björkman JT, Brandal LT, Brown DJ, Erdõsi T, Heck M, Ibrahem S, Johansson K, Kornschober C, Kotila SM, Le Hello S, Lienemann T, Mattheus W, Nielsen EM, Ragimbeau C, Rumore J, Sabol A, Torpdahl M, Trees E, Tuohy A, de Pinna E',
  lastauthor: 'de Pinna E',
  title: 'Multi-laboratory validation study of multilocus variable-number tandem repeat analysis (MLVA) for Salmonella enterica serovar Enteritidis, 2015.',
  sorttitle: 'multi laboratory validation study of multilocus variable number tandem repeat analysis mlva for salmonella enterica serovar enteritidis 2015',
  volume: '22',
  issue: '9',
  pages: '',
  lang: [ 'eng' ],
  nlmuniqueid: '100887452',
  issn: '1025-496X',
  essn: '1560-7917',
  pubtype: [ 'Journal Article' ],
  recordstatus: 'PubMed - in process',
  pubstatus: '4',
  articleids:
   [ { idtype: 'pubmed', idtypen: 1, value: '28277220' },
     { idtype: 'doi',
       idtypen: 3,
       value: '10.2807/1560-7917.ES.2017.22.9.30477' },
     { idtype: 'pii', idtypen: 4, value: '30477' },
     { idtype: 'rid', idtypen: 8, value: '28277220' },
     { idtype: 'eid', idtypen: 8, value: '28277220' } ],
  history:
   [ { pubstatus: 'received', date: '2016/01/14 00:00' },
     { pubstatus: 'accepted', date: '2016/05/10 00:00' },
     { pubstatus: 'entrez', date: '2017/03/10 06:00' },
     { pubstatus: 'pubmed', date: '2017/03/10 06:00' },
     { pubstatus: 'medline', date: '2017/03/10 06:00' } ],
  references: [],
  attributes: [ 'Has Abstract' ],
  pmcrefcount: '',
  fulljournalname: 'Euro surveillance : bulletin Europeen sur les maladies transmissibles = European communicable disease bulletin',
  elocationid: 'pii: 30477. doi: 10.2807/1560-7917.ES.2017.22.9.30477',
  doctype: 'citation',
  srccontriblist: [],
  booktitle: '',
  medium: '',
  edition: '',
  publisherlocation: '',
  publishername: '',
  srcdate: '',
  reportnumber: '',
  availablefromurl: '',
  locationlabel: '',
  doccontriblist: [],
  docdate: '',
  bookname: '',
  chapter: '',
  sortpubdate: '2017/03/02 00:00',
  sortfirstauthor: 'Peters T',
  vernaculartitle: '',
  abstract: 'Multilocus variable-number tandem repeat analysis (MLVA) is a rapid and reproducible typing method that is an important tool for investigation, as well as detection, of national and multinational outbreaks of a range of food-borne pathogens. Salmonella enterica serovar Enteritidis is the most common Salmonella serovar associated with human salmonellosis in the European Union/European Economic Area and North America. Fourteen laboratories from 13 countries in Europe and North America participated in a validation study for MLVA of S. Enteritidis targeting five loci. Following normalisation of fragment sizes using a set of reference strains, a blinded set of 24 strains with known allele sizes was analysed by each participant. The S. Enteritidis 5-loci MLVA protocol was shown to produce internationally comparable results as more than 90% of the participants reported less than 5% discrepant MLVA profiles. All 14 participating laboratories performed well, even those where experience with this typing method was limited. The raw fragment length data were consistent throughout, and the inter-laboratory validation helped to standardise the conversion of raw data to repeat numbers with at least two countries updating their internal procedures. However, differences in assigned MLVA profiles remain between well-established protocols and should be taken into account when exchanging data.',
  doi: '10.2807/1560-7917.ES.2017.22.9.30477',
  pmid: 28277220,
  pubDate: '2017/03/02 00:00',
  pubmedLink: 'https://www.ncbi.nlm.nih.gov/pubmed/28277220',
  year: '2017',
  published: 'March 2, 2017' }
```
