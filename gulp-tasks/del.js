const del = require("del");

const cleanDist = () => {
    return del(["./dist/*"]);
};

exports.cleanDist = cleanDist;