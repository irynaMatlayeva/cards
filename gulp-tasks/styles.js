const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

module.exports = function styles () {
    return src('./src/styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({overrideBrowserslist: ['last 2 versions'],
                cascade: false
            }
        ))
        .pipe(cleanCSS({ compatibility: '*'}))
        .pipe(concat('style.min.css'))
        .pipe(dest('./dist/styles'));
}