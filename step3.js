const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, writeToFile = null) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    if (writeToFile) {
      writeFile(writeToFile, data);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url, writeToFile = null) {
  try {
    const response = await axios.get(url);
    if (writeToFile) {
      writeFile(writeToFile, response.data);
    } else {
      console.log(response.data);
    }
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

function writeFile(filePath, data) {
  fs.writeFile(filePath, data, 'utf8', (err) => {
    if (err) {
      console.error(`Couldn't write ${filePath}:\n  ${err}`);
      process.exit(1);
    }
  });
}

let pathOrUrl;
let outFile = null;

if (process.argv[2] === '--out') {
  outFile = process.argv[3];
  pathOrUrl = process.argv[4];
} else {
  pathOrUrl = process.argv[2];
}

if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
  webCat(pathOrUrl, outFile);
} else {
  cat(pathOrUrl, outFile);
}
