/**
 * Legend component entry file8
 */


require('./legend/LegendModel');
require('./legend/legendAction');
require('./legend/LegendView');
var echarts = require('../echarts');
// Series Filter
echarts.registerProcessor('filter', require('./legend/legendFilter'));;