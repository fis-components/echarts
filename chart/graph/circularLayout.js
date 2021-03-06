

var circularLayoutHelper = require('./circularLayoutHelper');
module.exports = function (ecModel, api) {
    ecModel.eachSeriesByType('graph', function (seriesModel) {
        if (seriesModel.get('layout') === 'circular') {
            circularLayoutHelper(seriesModel);
        }
    });
} || module.exports;;