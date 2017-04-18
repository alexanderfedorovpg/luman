'use strict';

// This is example of task function

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const rename = tars.packages.rename;
const del = tars.packages.del;

/**
 * Rename all .jade files to .pug
 */
module.exports = function () {

    return gulp.task('switch-to-jade', function () {
        return gulp.src(['./markup/**/*.pug'])
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while switch to pug.', error);
                }
            }))
            .pipe(rename(function (path) {
                path.extname = '.jade';
                console.log(path.dirname + '/' + path.basename + path.extname + '\n');
            }))
            .pipe(gulp.dest('./markup/'))
            .on('end', function () {
                del(['./markup/**/*.pug']).then(function () {
                    notifier.success('Switch-to-jade task has been finished');
                });
            });
    });
};
