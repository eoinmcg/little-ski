import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");
const { zip } = require('zip-a-folder');
const cheerio = require("cheerio");
const colors = require('colors');

const p = require('../package.json');

console.log('\n');
console.log('-----------------------'.yellow);
console.log('\n');

let src = `window.BUILD="[v${p.version}]-${new Date()}" \n`;

let files = [
  'node_modules/littlejsengine/dist/littlejs.min.js',
  'dist/index.js' // created by vite build
];
files.forEach((file) => {
  src += fs.readFileSync(file, 'UTF8');
});
console.log(' - Merging JS files'.yellow);


// this section does the following
// - duplicates ./index.html
// - removes script tags
// - adds the minified js inline
const buffer = fs.readFileSync('index.html');
const $ = cheerio.loadBuffer(buffer);
$("script").remove();
$('body').append(`<script>${src}</script>`)

fs.writeFileSync('dist/index.html', $.html());
console.log(' - Generated HTML'.yellow);


// removes unused index.js in preparation for creating zip
fs.unlink('dist/index.js', () => {
  console.log(' - Removed dist/index.js'.yellow)
});

// creates a zip and places it in the ./dist dir
const zipName = 'game.zip';
zipIt(zipName).then(() => {
    fs.rename(zipName, `dist/${zipName}`, function (err) {
      if (err) throw err
      console.log(` - Created dist/${zipName}`.yellow)
      console.log('\n');
      console.log('Finished!'.green);
      console.log('\n');
    });
  });


async function zipIt(zipName) {
  await zip('dist', zipName);
}
