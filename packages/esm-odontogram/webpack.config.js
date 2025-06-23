const path = require('path');
const config = require('openmrs/default-webpack-config');
config.scriptRuleConfig.exclude = /node_modules(?![/\\]@openmrs)/;
config.overrides.resolve = {
  extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss'],
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
};

module.exports = config;
