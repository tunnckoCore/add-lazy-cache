#!/usr/bin/env node
/*!
 * add-lazy-cache <https://github.com/tunnckoCore/add-lazy-cache>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')
var add = require('./index')
var cli = require('minimist')(process.argv.slice(2), {
  alias: {
    help: 'h',
    version: 'v'
  }
})
if (cli.help) {
  console.log('Usage: add-lazy-cache [path/to/dir/with/package.json]')
  process.exit(0)
}
if (cli.version) {
  console.log(require('./package.json').version)
  process.exit(0)
}

var fp = cli._ && cli._.length ? cli._[0] : process.cwd()

add(path.join(fp, 'package.json')
  .then(console.log, console.error)
  .catch(console.error)
