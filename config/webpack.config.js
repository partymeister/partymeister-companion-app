// Set the `ENV` global variable to be used in the app.
var path = require('path');
var webpack = require('webpack');

var appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR;

var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));

var env = process.env.IONIC_ENV || 'dev';

config.plugins = config.plugins || [];
config.plugins.push(
    config.ionicWebpackFactory.getIonicEnvironmentPlugin(),
    new webpack.EnvironmentPlugin(['IONIC_ENV'])
);

if(env === 'prod') {
    // This helps ensure the builds are consistent if source hasn't changed:
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = config;