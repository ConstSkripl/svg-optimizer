#!/usr/bin/env node

const { optimizeSVGs } = require('../src/optimizer');
const directory = process.argv[2];

if (!directory) {
  console.error('Please provide a directory');
  process.exit(1);
}

optimizeSVGs(directory)
  .then(() => console.log('SVG optimization complete'))
  .catch(err => {
    console.error(`Error optimizing SVGs: ${err.message}`);
    process.exit(1);
  });