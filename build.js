const fs = require('fs');


function trimWithin(txt) {
  return txt.replace(/[\s\n]+/gm, ' ').replace(/\\n\s?/gm, '\n').trim();
}

function parseBlock(txt) {
  var m = txt.match(/<(.+)>([\s\S]*?)\n((\s{5,8}|\t)\w+:[\s\S]*)/m);
  var blk = {code: m[1], name: trimWithin(m[2])}, rest = m[3];
  var ms = [...rest.matchAll(/\s{5,7}(\w+):/gm)];
  for (var i=0; i<ms.length; i++) {
    var key = ms[i][1].toLowerCase();
    var bgn = ms[i].index + ms[i][0].length;
    var end = i+1 === ms.length? rest.length : ms[i+1].index;
    var val = rest.substring(bgn, end);
    blk[key] = trimWithin(val);
  }
  return blk;
}

function parseBlocks(txt) {
  var blks = [];
  var ms = [...txt.matchAll(/^<.+>|\n<\w+>/gm)];
  for (var i=0; i<ms.length; i++) {
    var bgn = ms[i].index;
    var end = i+1 === ms.length? txt.length : ms[i+1].index;
    var blk = txt.substring(bgn, end);
    blks.push(parseBlock(blk));
  }
  return blks;
}


function main() {
  var part1 = fs.readFileSync('assets/PART1.TXT', 'utf8');
  console.log(parseBlocks(part1));
}
main();
