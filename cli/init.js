'use strict'
const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt');
const config = require('../template');
const chalk = require('chalk');

module.exports = () => {
    co(function *() {
        let projectName = yield prompt('Input Project name(输入项目名称): ');
        let viewName = yield prompt('Input Template Render Technology(输入模板渲染技术)[react|vue]: ');
        let cssName = yield prompt('Input css Technology(输入css技术)[css|less|scss]: ');

        let gitUrl = 'https://github.com/nuomiui/nuomi-component.git';
        let branch = `${viewName}-${cssName}`;

        if (!config.js[viewName]) {
            console.log(chalk.red('\n  Template Render not allow(您输入模板引擎技术不在支持列表中)!'))
            process.exit()
        }
        if (!config.css[cssName]) {
            console.log(chalk.red('\n  css technology not support(输入的css技术不在支持列表)!'))
            process.exit()
        }
        let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`;
        console.log(chalk.white('\n Start generating...'));

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
              console.log(error)
              process.exit()
            }
            console.log(chalk.green('\n √ Generation completed!'))
            console.log(`\n cd ${projectName} && npm install \n`)
            process.exit()
        });
    });
}