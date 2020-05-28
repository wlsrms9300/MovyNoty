//이파일에서만 esling옵션 비활성화
//eslint-disable no-global-assign

require = require('esm')(module);
module.exports = require('./main.js');


