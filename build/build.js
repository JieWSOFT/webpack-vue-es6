var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config/index.js');
var webpackConfig = require('./webpack.config.js');

var spinner = ora('building for production...');
spinner.start();

rm(config.build.dist_path, err => {
    if (err) throw err;
    webpack(webpackConfig, function (err, stats) {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + "\n\n");
        console.log(chalk.cyan('Build complete.\n')); 
    })
});