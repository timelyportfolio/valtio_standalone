//import * as valtio from 'valtio/vanilla';
var valtio = require('valtio/vanilla');
var valtio_utils = require('valtio/vanilla/utils');

//export { valtio as default };
module.exports = {
  ...valtio,
  ...valtio_utils
};