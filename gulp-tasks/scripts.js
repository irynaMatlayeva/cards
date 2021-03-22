const { src, dest } = require("gulp");
// const jsMinify = require("gulp-js-minify");
// const concat = require('gulp-concat');
// const babel = require("gulp-babel");


const scripts = () => {
    return src("./src/scripts/**/*.js")
        // .pipe(jsMinify())
        // .pipe(babel({presets: ['@babel/env']}))
        // .pipe(concat('scripts.min.js'))
        .pipe(dest("./dist/scripts/"));
};

exports.scripts = scripts;