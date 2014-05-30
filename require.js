function require(path) {
  var xhr = new XMLHttpRequest();

  if (path[0] === '.') {
    path = path.substr(2);
  }

  path += '.js';

  var module = {
    exports: {}
  };

  xhr.open('GET', path, false); // sync
  xhr.send();

  var code = xhr.responseText;

  if (code.indexOf('//# sourceURL') === -1) {
    code += '\n\n//# sourceURL=' + path;
  }

  eval(code);

  return module.exports;
}