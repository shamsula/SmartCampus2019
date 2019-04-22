/**
 * This is run automatically by react-scripts before tests.
 */

require('jest-localstorage-mock');

global.fetch = require('jest-fetch-mock');
