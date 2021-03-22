const {src, dest} = require("gulp");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const images = () => {
    return src("./src/images/**/*")
        .pipe(imagemin(
            pngquant({progressive: true}))
            .pipe(dest("./dist/images/")));
};

exports.images = images;