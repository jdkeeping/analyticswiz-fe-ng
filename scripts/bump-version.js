'use strict';
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const replace = require('replace-in-file');
const git = require('simple-git')();

const SEMVER_REGEX = /^(\d+\.)?(\d+\.)?(\*|\d+)$/;

function getSemVer(version) {
  let matches = version ? version.match(SEMVER_REGEX) : null;
  if (!matches || matches.length < 4) {
    return null;
  }
  return {
    major: parseInt(matches[1], 10),
    minor: parseInt(matches[2], 10),
    patch: parseInt(matches[3], 10)
  };
}

const currentVersion = pkg.version;
const semVer = getSemVer(currentVersion);

const newVersion = `${semVer.major}.${semVer.minor}.${semVer.patch}`;

const candidate = 0;

/**
 * Update environment files with new version
 */
const envOptions = {
  files: [
    // path.join(__dirname, '..', '/src/environments/environment.ts'),
    path.join(__dirname, '..', '/src/environments/environment.dev.ts'),
    path.join(__dirname, '..', '/src/environments/environment.local.ts'),
    path.join(__dirname, '..', '/src/environments/environment.prod.ts'),
    path.join(__dirname, '..', '/src/environments/environment.ts'),
  ],
  from: [/APPVERSION: '(\d+\.)?(\d+\.)?(\*|\d+)'/g],
  to: [`APPVERSION: '${newVersion}'`],
  allowEmptyPaths: false
};

try {
  let changedFiles = replace.sync(envOptions);
  console.log('--- Successfully updated files: ');
  console.log(changedFiles);
} catch (error) {
  console.error('Error occurred:', error);
  throw error;
}

console.log('--- [git] staging changes ...');
git.add('.');
console.log('--- [git] committing changes');
git.commit('chore(build): update version');
// console.log('--- [git] pushing to remote');
// git.push();
