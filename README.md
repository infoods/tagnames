Food Component Identifiers ([Tagnames]) by International Network of Food Data Systems ([INFOODS]).

```javascript
const tagnames = require('@infoods/tagnames');
// tagnames.corpus: Map {code => {code, name, synonyms, unit, tables, comments, examples}}
// tagnames.load(): true (corpus loaded)
// tagnames.sql([table], [options]): sql commands
// tagnames.csv(): path to csv file
// tagnames(<query>)
// -> [{code, name, synonyms, unit, tables, comments, examples}] for matched tagnames


tagnames.load();
/* load corpus first */

tagnames('vitamin c');
tagnames('c-vitamin');
// [
//   {
//     code: 'VITC',     
//     name: 'vitamin C',
//     synonyms: 'ascorbic acid; ascorbate (Note that these terms are not true synonyms but are often found in food tables to refer to vitamin C.)',
//     unit: 'mg',
//     tables: 'USDA 401, SFK, MW, ETH, IND, NE, EA, PRC, DAN',
//     comments: 'L-ascorbic acid plus L- dehydroascorbic acid.',
//     examples: ''
//   },
//   ...
// ]


tagnames('what is butyric acid?');
tagnames('c4:0 stands for?');
// [  
//   {
//     code: 'F4D0F',
//     name: 'fatty acid 4:0; expressed per quantity of total fatty acids',
//     synonyms: 'butyric acid; tetranoic acid',
//     unit: 'g/100 g fatty acid',
//     tables: 'MW, FRN, DAN, SWD',
//     comments: '',
//     examples: ''
//   },
//   ...
// ]
```


[![](http://www.fao.org/typo3temp/pics/3e0b195db4.jpg) ![](http://www.fao.org/typo3temp/pics/c668f2d5f2.jpg) ![](http://www.fao.org/typo3temp/pics/57695feade.jpg) ![](http://www.fao.org/typo3temp/pics/e4052a2c33.jpg)](https://www.npmjs.com/package/infoods)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[INFOODS]: http://www.fao.org/infoods/infoods/en/
[Tagnames]: https://github.com/infoods/tagnames/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in
