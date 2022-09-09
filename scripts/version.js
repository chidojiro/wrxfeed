/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const filePath = '../public/version.txt';

const versionTxt = fs.readFileSync(path.resolve(__dirname, filePath));
const version = +versionTxt;

fs.writeFileSync(path.resolve(__dirname, filePath), (version + 1).toString());
