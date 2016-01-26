

var List = require('../../data/List');
var Graph = require('../../data/Graph');
var linkList = require('../../data/helper/linkList');
var completeDimensions = require('../../data/helper/completeDimensions');
var zrUtil = require('zrender/core/util');
module.exports = function (nodes, matrix, hostModel, directed) {
    var graph = new Graph(directed);
    for (var i = 0; i < nodes.length; i++) {
        graph.addNode(zrUtil.retrieve(// Id, name, dataIndex
        nodes[i].id, nodes[i].name, i), i);
    }
    var size = matrix.length;
    var links = [];
    var linkCount = 0;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var val = matrix[i][j];
            if (val === 0) {
                continue;
            }
            var n1 = graph.nodes[i];
            var n2 = graph.nodes[j];
            var edge = graph.addEdge(n1, n2, linkCount);
            if (edge) {
                linkCount++;
                links.push({ value: val });
            }
        }
    }
    // FIXME
    var dimensionNames = completeDimensions(['value'], nodes);
    var nodeData = new List(dimensionNames, hostModel);
    var edgeData = new List(['value'], hostModel);
    nodeData.initData(nodes);
    edgeData.initData(links);
    graph.setEdgeData(edgeData);
    linkList.linkToGraph(nodeData, graph);
    // Update dataIndex of nodes and edges because invalid edge may be removed
    graph.update();
    return graph;
} || module.exports;;