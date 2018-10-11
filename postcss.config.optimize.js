/* POSTCSS config for optimization css files from modules build */

const postcss = require('postcss');

module.exports = (css) => {
    const resultCss = postcss([
        require('postcss-discard-comments'),
        require('postcss-discard-empty'),
        require('postcss-normalize-whitespace'),
        require('autoprefixer')({ browsers: ['last 3 versions'] }),
        require('css-mqpacker')({ sort: true }),
    ]).process(css, {from: undefined});

    return resultCss;
};
