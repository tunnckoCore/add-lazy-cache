/*!
 * add-lazy-cache <https://github.com/tunnckoCore/add-lazy-cache>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var redolent = require('redolent')
var readFile = redolent(fs.readFile)

module.exports = function addLazyCache (fp) {
  return readFile(fp, 'utf8')
    .then(JSON.parse)
    .then(function (data) {
      var deps = ''
      var str = [
        '\/* jshint asi:true *\/',
        '',
        "'use strict'",
        '',
        '/**',
        ' * Lazily required module dependencies',
        ' */',
        '',
        "var utils = require('lazy-cache')(require) // eslint-disable-line no-undef, no-native-reassign",
        'var fn = require',
        '',
        'require = utils // eslint-disable-line no-undef, no-native-reassign',
        '',
        '{{dependencies}}',
        'require = fn // eslint-disable-line no-undef, no-native-reassign',
        '',
        '/**',
        ' * Expose `utils` modules',
        ' */',
        '',
        'module.exports = utils'
      ]
      Object.keys(data.dependencies).forEach(function (dep) {
        deps += "require('" + dep + "')\n"
      })
      return str.join('\n').replace('{{dependencies}}', deps)
    })
}
