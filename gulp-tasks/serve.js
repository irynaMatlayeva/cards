const gulp = require('gulp')

const {images} = require('./images')
const styles = require('./styles')
const {scripts} = require('./scripts')

const server = require('browser-sync').create()

function readyReload(cb) {
    server.reload()
    cb()
}

module.exports = function serve(cb) {
    server.init({
        server: {
            baseDir: "./",
            build: 'build'
        },
        browser: "",
        notify: false,
        open: true,
        cors: true
    })
    gulp.watch("./index.html", (cb) => {
        server.reload();
        cb();
    });
    gulp.watch('src/images/**/*{gif,png,jpg,svg,webp}', gulp.series(images, readyReload))
    gulp.watch('src/styles/**/*.scss', gulp.series(styles, cb => gulp.src('dist/styles').pipe(server.stream()).on('end', cb)))
    gulp.watch('src/scripts/**/*.js', gulp.series(scripts, readyReload))

    return cb()
}