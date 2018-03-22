var tplEjs = require('./index.html.ejs');

const DLL_SRC = '../dll/'+(require('./manifest.json'))['name']+'.js';

var config = {
  dllSrc: DLL_SRC,
};


module.exports = tplEjs(config);
