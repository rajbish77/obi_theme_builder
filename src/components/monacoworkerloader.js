/* eslint-disable no-restricted-globals */

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    if (label === 'json') {
      return './json.worker.js';
    }
    if (label === 'css') {
      return './css.worker.js';
    }
    if (label === 'html') {
      return './html.worker.js';
    }
    return './editor.worker.js';
  }
};

/* eslint-enable no-restricted-globals */
