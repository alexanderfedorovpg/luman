'use strict';

// This is example of task function

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const cache = tars.packages.cache;
const notifier = tars.helpers.notifier;
const postcss = tars.packages.postcss;
const gulpif = tars.packages.gulpif;
const scssSyntax = require('postcss-scss');

const tarsConfig = tars.config;
// Include browserSync, if you need to reload browser:
// const browserSync = tars.packages.browserSync;

/**
 * Task description
 */
module.exports = function () {
    let plugins = [];

    if (tarsConfig.postscss && tarsConfig.postscss.length) {
        tarsConfig.postscss.forEach(postProcessor => {
            plugins.push(require(postProcessor.name)(postProcessor.options));
        });
    }

    return gulp.task('css:post-scss', function () {
        return gulp.src([`markup/${tars.config.fs.componentsFolderName}/**/*.scss`], {base: './'})
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while something.', error);
                }
            }))
            .pipe(cache('postscss'))
            .pipe(gulpif(plugins.length, postcss(plugins, { syntax: scssSyntax })))
            .pipe(gulp.dest('./'))
            .pipe(
                notifier.success('css:post-scss task has been finished')
            );
    });
};
