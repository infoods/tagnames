const fs = require('fs');


var PARTS = 5;
var FIELDS = ['code', 'name', 'synonyms', 'unit', 'tables', 'comments', 'examples'];
var RENAME = new Map([
  ['synonym', 'symonyms'],
  ['table', 'tables'],
  ['comment', 'comments'],
  ['example', 'examples'],
]);

// excess spaces are trimmed from within (autophagy)
function trimWithin(txt) {
  return txt.replace(/[\s\n]+/gm, ' ').replace(/\\n\s?/gm, '\n').trim();
}

// comments start with #
function removeComments(txt) {
  return txt.replace(/^#[^\n]*\n/gm, '');
}

// see what a block looks like, in PARTN.TXT
function readBlock(txt) {
  var m = txt.match(/<(.+)>([\s\S]*?)\n((\s{4,8}|\t)\w+:[\s\S]*)/m);
  if (m == null) console.log(txt);
  var blk = {code: m[1], name: trimWithin(m[2])}, rest = m[3];
  var ms = [...rest.matchAll(/\s{5,7}(\w+):/gm)];
  for (var i=0; i<ms.length; i++) {
    var key = ms[i][1].toLowerCase();
    var bgn = ms[i].index + ms[i][0].length;
    var end = i+1 === ms.length? rest.length : ms[i+1].index;
    var val = rest.substring(bgn, end);
    if (RENAME.has(key)) key = RENAME.get(key);
    blk[key] = trimWithin(val);
  }
  return blk;
}

// entire PARTN.TXT is read -> array of blocks
function readBlocks(txt) {
  var blks = [];
  txt = removeComments(txt);
  var ms = [...txt.matchAll(/^<.+>|\n<\w+>/gm)];
  for (var i=0; i<ms.length; i++) {
    var bgn = ms[i].index;
    var end = i+1 === ms.length? txt.length : ms[i+1].index;
    var blk = txt.substring(bgn, end);
    blks.push(readBlock(blk));
  }
  return blks;
}

// the generated csv looks like this:
// field names
// " quoted values ...
function writeCsv(blks) {
  var s = FIELDS.join()+'\n';
  for (var blk of blks) {
    for(var f of FIELDS) {
      val = blk[f]||'';
      val = val.replace(/\n/gm, '\\n');
      s += `"${val}",`;
    }
    s = s.substring(0, s.length-1)+'\n';
  }
  return s;
}


function main() {
  for (var n=1; n<=PARTS; n++) {
    console.log(`writing csv for part${n}`);
    var txt = fs.readFileSync(`sources/PART${n}.TXT`, 'utf8');
    var blks = readBlocks(txt);
    var csv = writeCsv(blks);
    fs.writeFileSync(`assets/part${n}.csv`, csv);
  }
}
main();
