const fs = require('fs');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

const path = process.argv[2];
cat(path);