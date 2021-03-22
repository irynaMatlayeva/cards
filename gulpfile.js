const {parallel, series} = require("gulp");
const {cleanDist} = require("./gulp-tasks/del");
const serve = require("./gulp-tasks/serve");
const {scripts} = require("./gulp-tasks/scripts");
const styles = require("./gulp-tasks/styles");
const {images} = require("./gulp-tasks/images");


exports.dev = series(serve, cleanDist, parallel(styles, scripts, images))
exports.build = series(cleanDist, styles, scripts, images);