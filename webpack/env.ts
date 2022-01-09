const path = require('path');

const IS_DEV = process.env.NODE_ENV !== 'production';
const ROOT_DIR = path.join(__dirname, '../');
const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');
const SERVER_DIR = path.join(__dirname, '../server');

export { IS_DEV, ROOT_DIR, SRC_DIR, DIST_DIR, SERVER_DIR };
