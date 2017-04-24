var path = require('path');
var root_path = path.resolve(__dirname);
module.exports = {
    build: {
        env: require('./prod.env.js'),
        main_path: path.resolve(root_path, '../src/main.js'),
        dist_path: path.resolve(root_path, '../dist'),
    },
    dev: {
        env: require('./dev.env.js'),
        $this: this,
        root_path: path.resolve(__dirname),
        main_path: path.resolve(root_path, '../src/main.js'),
        dist_path: path.resolve(root_path, '../dist'),
    }
}