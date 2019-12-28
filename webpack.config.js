/* eslint-disable import/no-dynamic-require */
/* eslint-disable linebreak-style */
const merge = require('webpack-merge');
const commonConfig = require('./build-utils/webpack.common');

module.exports = (env) => {
  const envConfig = require(`./build-utils/webpack.${env.mode}`);
  return merge({ mode: env.mode }, commonConfig, envConfig);
};
