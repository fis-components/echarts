

module.exports = function (delta, handleEnds, extent, mode, handleIndex) {
    if (!delta) {
        return handleEnds;
    }
    if (mode === 'rigid') {
        delta = getRealDelta(delta, handleEnds, extent);
        handleEnds[0] += delta;
        handleEnds[1] += delta;
    } else {
        delta = getRealDelta(delta, handleEnds[handleIndex], extent);
        handleEnds[handleIndex] += delta;
        if (mode === 'push' && handleEnds[0] > handleEnds[1]) {
            handleEnds[1 - handleIndex] = handleEnds[handleIndex];
        }
    }
    return handleEnds;
    function getRealDelta(delta, handleEnds, extent) {
        var handleMinMax = !handleEnds.length ? [
            handleEnds,
            handleEnds
        ] : handleEnds.slice();
        handleEnds[0] > handleEnds[1] && handleMinMax.reverse();
        if (delta < 0 && handleMinMax[0] + delta < extent[0]) {
            delta = extent[0] - handleMinMax[0];
        }
        if (delta > 0 && handleMinMax[1] + delta > extent[1]) {
            delta = extent[1] - handleMinMax[1];
        }
        return delta;
    }
} || module.exports;;