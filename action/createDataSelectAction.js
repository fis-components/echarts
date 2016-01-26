

var echarts = require('../echarts');
var zrUtil = require('zrender/core/util');
module.exports = function (seriesType, actionInfos) {
    zrUtil.each(actionInfos, function (actionInfo) {
        actionInfo.update = 'updateView';
        /**
             * @payload
             * @property {string} seriesName
             * @property {string} name
             */
        echarts.registerAction(actionInfo, function (payload, ecModel) {
            var selected = {};
            ecModel.eachComponent({
                mainType: 'series',
                subType: seriesType,
                query: payload
            }, function (seriesModel) {
                if (seriesModel[actionInfo.method]) {
                    seriesModel[actionInfo.method](payload.name);
                }
                var data = seriesModel.getData();
                // Create selected map
                data.each(function (idx) {
                    var name = data.getName(idx);
                    selected[name] = seriesModel.isSelected(name) || false;
                });
            });
            return {
                name: payload.name,
                selected: selected
            };
        });
    });
} || module.exports;;