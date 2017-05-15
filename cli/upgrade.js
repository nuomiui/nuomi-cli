'use strict';
const child_process = require('child_process');
const exec = child_process.exec;
const execSync = child_process.execSync;
const co = require('co');
const prompt = require('co-prompt');
const config = require('../template');
const chalk = require('chalk');

module.exports = () => {
    co(function *() {
        execSync('rm -rf upgrade');
        let viewName = yield prompt('Input Template Render Technology(输入模板渲染技术)[react|vue]: ');
        let cssName = yield prompt('Input css Technology(输入css技术)[css|less|scss]: ');
        viewName= viewName.trim();
        cssName = cssName.trim();
        let gitUrl = 'https://github.com/nuomiui/nuomi-component.git';
        let branch = `${viewName}-${cssName}`;

        if (!config.js[viewName]) {
            console.log(chalk.red('\n  Template Render not allow(您输入模板引擎技术不在支持列表中)!'));
            process.exit();
        }
        if (!config.css[cssName]) {
            console.log(chalk.red('\n  css technology not support(输入的css技术不在支持列表)!'));
            process.exit();
        }
        let cmdStr = `git clone -b ${branch} ${gitUrl} upgrade`;
        console.log(chalk.white('\n Start upgrade...'));
        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
              console.log(error);
              process.exit();
            }
            let cmdList = ['cp -R upgrade/cli/* ./cli/',
                'cp -R upgrade/audient/* ./audient/',
                'cp -R upgrade/docs/* ./docs/',
                'cp -R upgrade/src/common/libs/* ./src/common/libs/',
                'cp -R upgrade/src/common/util/* ./src/common/util/',
                'rm -rf upgrade'
            ];
            execSync(cmdList.join(' && '));
            console.log(chalk.green('\n √ compeleted upgrade!'));
            console.log(`\n npm install \n`);
            process.exit(0);
        });
    });
}