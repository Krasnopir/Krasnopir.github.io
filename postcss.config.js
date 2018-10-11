/* eslint-disable import/no-commonjs,global-require */
const path = require('path');
const WORK_DIR = '';


module.exports = ({ file, options, env }) => {
    const configFile = path.join(WORK_DIR, '.stylelintrc');
    const plugins = options.plugins ? options.plugins : [].concat(
        [
            require('postcss-nested'),
            require('postcss-color-function'),
        ],

        // dev mode plugins
        env !== 'production' && [
            require('stylelint')({ configFile, syntax: 'scss' }),
            require('postcss-reporter')({ plugins: ['!postcss-extend'] }),
        ]
    );
    return { plugins, parser: file.extname === '.sss' ? 'sugarss' : false };
};
