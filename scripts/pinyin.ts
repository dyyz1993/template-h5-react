import pinyin from 'js-pinyin';
import fs from 'fs';
const json = require('./data.json');

function transform() {
  const obj: any = {};
  json.map((item: any) => {
    item.children.map((ch: any) => {
      // if()
      const char = pinyin
        .getFullChars(item.children.length === 1 ? item.label : ch.label)
        .slice(0, 1);
      if (!obj[char]) {
        obj[char] = [];
      }
      obj[char].push(item.children.length === 1 ? item : ch);
    });

    // item.zimu = pinyin.getFullChars(item.label);

    // return item;
  });
  //   Object.keys()
  console.log(JSON.stringify(obj, null, 2));
  const aaa = Object.fromEntries(Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)));
  fs.writeFileSync('./out.json', JSON.stringify(aaa, null, 2));
}

transform();
