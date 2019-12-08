const Sql = require('sql-extra');
const lunr = require('lunr');
const path = require('path');

var corpus = new Map();
var index = null;
var ready = false;


function loadCorpus() {
  for(var [k, v] of require('./corpus'))
    corpus.set(k, v);
};

function setupIndex() {
  index = lunr(function() {
    this.ref('code');
    this.field('code', {boost: 3});
    this.field('name', {boost: 2});
    this.field('synonyms', {boost: 2});
    // this.pipeline.remove(lunr.stopWordFilter);
    for(var {code, name, synonyms} of corpus.values())
      this.add({code, name: name.replace(/\W/g, ' '), synonyms: synonyms.replace(/\W/g, ' ')});
  });
};

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='tagnames', opt={}) {
  return Sql.setupTable(tab, {
    code: 'TEXT', name: 'TEXT', synonyms: 'TEXT', unit: 'TEXT',
    tables: 'TEXT', comments: 'TEXT', examples: 'TEXT'}, require('./corpus').values(),
    Object.assign({pk: 'code', index: true, tsvector: {code: 'A', name: 'B', synonyms: 'C'}}, opt));
};

function load() {
  if(ready) return true;
  loadCorpus(); setupIndex();
  return ready = true;
};

function tagnames(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
tagnames.csv = csv;
tagnames.sql = sql;
tagnames.load = load;
tagnames.corpus = corpus;
module.exports = tagnames;
