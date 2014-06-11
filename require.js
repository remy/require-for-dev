window.require = function (path) {
  'use strict';
  var xhr = new XMLHttpRequest();
  var root = location.pathname.split('/').slice(1, -1).join('/') + '/';

  // TODO support real path nativgation

  // if './my-module' turn the path in to a relative URI
  if (path.slice(0, 2) === './') {
    path = path.substr(2);
  }

  if (path[0] !== '/') {
    path = root + path;
  }

  path += '.js';

  // try to return the cache
  var frame = document.getElementById(path);
  if (frame) {
    return frame.contentWindow.module.exports;
  }

  // TODO support require index.js resolution - for now: supports named modules
  xhr.open('GET', path, false); // sync
  xhr.send();

  var code = xhr.responseText;

  if (code.indexOf('//# sourceURL') === -1) {
    code += '\n\n//# sourceURL=' + location.protocol + '//' + location.host + path;
  }

  // http://lists.whatwg.org/htdig.cgi/whatwg-whatwg.org/2013-October/041171.html
  // about:blank is evaluated synchronously so we have access to the
  // frame.contentWindow right after attaching it to the DOM!
  frame = document.createElement('iframe');

  frame.id = path;

  document.documentElement.appendChild(frame);
  frame.setAttribute('style', 'display: none !important');

  var module = { exports : {} };

  // assign module globals to the empty iframe
  frame.contentWindow.require = require;
  frame.contentWindow.module = module;
  frame.contentWindow.exports = module.exports;

  // evaluate the code in the new iframe
  frame.contentWindow.eval(code); // jshint ignore:line

  // Note: we don't remove the iframe for two important reasons:
  // 1. Because removing the iframe strips running JavaScript from memory,
  //    so function references we passed out via `exports` are losts.
  // 2. Benefit of a cache: if the iframe exists, we just send back the exports.

  return module.exports;
};