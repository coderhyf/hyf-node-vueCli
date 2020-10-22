#!/usr/bin/env node
const program = require ('commander');
const helpOptions = require ('./lib/core/help');
const createCommands = require('./lib/core/create');
// 将版本号引入
program.version (require ('./package.json').version);
helpOptions ();
createCommands();
// 解析在控制台显示打印什么
program.parse (process.argv);