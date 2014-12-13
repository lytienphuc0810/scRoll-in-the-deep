// var clicked = false,
//     clickY = 0,
//     clickX = 0;

// $('#train-map').on({
//     'mousemove': function(e) {
//         if (clicked) {
//             updateScrollPos(e);
//             clickX = e.pageX;
//             clickY = e.pageY;
//         }
//     },
//     'mousedown': function(e) {
//         clicked = true;
//         clickX = e.pageX;
//         clickY = e.pageY;
//     },
//     'mouseup': function() {
//         clicked = false;
//     },
//     'mouseleave': function() {
//         clicked = false;
//     }
// });

// var updateScrollPos = function(e) {
//     // var deltaX = parseInt(clickX) - parseInt(e.pageX);
//     // var deltaY = parseInt(clickY) - parseInt(e.pageY);

//     // $('#canvas').transition({
//     //     x: deltaX + 'px',
//     //     y: deltaY + 'px'
//     // }, 0, 'linear');
// }

var zoomCustom = function(time, delay2) {
    var previousPercentage = 1 + 0.05 * previousZoomLevel;
    var percentage = 1 + 0.05 * zoomLevel;

    var originHeight = $('#canvas img').height();
    var originWidth = $('#canvas img').width();
    var shiftX = originWidth * (percentage - 1) / 2;
    var shiftY = originHeight * (percentage - 1) / 2;

    $('#scaleWrapper').height(originHeight * percentage);
    $('#scaleWrapper').width(originWidth * percentage);


    $('#canvas').transition({
        x: shiftX + 'px',
        y: shiftY + 'px',
        scale: percentage,
        delay: delay2
    }, time, 'linear');
}

$('#zoomInBtn').click(function(evt) {
    zoomLevel = 10;
    zoomCustom(400, 100);
});

$('#zoomOutBtn').click(function(evt) {
    zoomLevel = 0;
    zoomCustom(400, 100);
});

// MOBILE
var showLog = function(textInput) {
    $('#infoBoard').text(textInput);
}

var myElement = document.getElementById('train-map');
var hammertime = new Hammer(myElement)

hammertime.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});

var currentDeltaX = 0;
var currentDeltaY = 0;

hammertime.on('panstart', function(e) {
    currentDeltaX = 0;
    currentDeltaY = 0;
});

hammertime.on('panmove', function(e) {
    showLog('panmove ' + $('#canvas').css('x') + ' ' + $('#canvas').css('y'));

    var deltaX = parseInt(e.deltaX);
    var deltaY = parseInt(e.deltaY);

    var rawCoordinateX = $('#canvas').css('x');
    var currentCoordinateX;
    if (typeof(rawCoordinateX) === 'string') {
        currentCoordinateX = parseInt(rawCoordinateX.substring(0, rawCoordinateX.length - 2));
    } else if (typeof(rawCoordinateX) === 'number') {
        currentCoordinateX = rawCoordinateX;
    }

    var rawCoordinateY = $('#canvas').css('y');
    var currentCoordinateY;
    if (typeof(rawCoordinateY) === 'string') {
        currentCoordinateY = parseInt(rawCoordinateY.substring(0, rawCoordinateY.length - 2));
    } else if (typeof(rawCoordinateY) === 'number') {
        currentCoordinateY = rawCoordinateY;
    }

    var percentage = 1 + 0.05 * zoomLevel;
    var originHeight = $('#canvas img').height();
    var originWidth = $('#canvas img').width();
    var viewportHeight = $('#train-map').height();
    var viewportWidth = $('#train-map').width();
    var shiftX = originWidth * (percentage - 1) / 2;
    var shiftY = originHeight * (percentage - 1) / 2;


    var b = originWidth * percentage;
    var d = viewportWidth;
    var accelDeltaX = 0;
    if (currentCoordinateX <= 0 + shiftX && currentCoordinateX >= -(b - d) + shiftX) {
        if (currentCoordinateX + deltaX - currentDeltaX > 0 + shiftX) {
            deltaX = currentDeltaX - currentCoordinateX + shiftX;
        } else if (currentCoordinateX + deltaX - currentDeltaX < -(b - d) + shiftX) {
            deltaX = currentDeltaX - currentCoordinateX - (b - d) + shiftX;
        }
        accelDeltaX = deltaX - currentDeltaX;
        currentDeltaX = deltaX;
    }

    var a = originHeight * percentage;
    var c = viewportHeight;
    var accelDeltaY = 0;
    if (currentCoordinateY <= 0 + shiftY && currentCoordinateY >= -(a - c) + shiftY) {
        if (currentCoordinateY + deltaY - currentDeltaY > 0 + shiftY) {
            deltaY = currentDeltaY - currentCoordinateY + shiftY;
        } else if (currentCoordinateY + deltaY - currentDeltaY < -(a - c) + shiftY) {
            deltaY = currentDeltaY - currentCoordinateY - (a - c) + shiftY;
        }
        accelDeltaY = deltaY - currentDeltaY;
        currentDeltaY = deltaY;
    }

    $('#canvas').transition({
        // x: '+=' + accelDeltaX
        y: '+=' + accelDeltaY
    }, 0, 'linear');
});

hammertime.get('pinch').set({
    enable: true
});

var previousZoomLevel = 0;
var zoomLevel = 0;
var MAX_ZOOM = 20;
var distanceCounter = 0;


hammertime.on('pinchstart', function(e) {
    distanceCounter = 0;
});

hammertime.on('pinchend', function(e) {
    distanceCounter = 0;
});

hammertime.on('pinchout', function(e) {
    showLog('pinchout' + Math.floor(e.distance / 10));

    if (Math.floor(e.distance / 5) > distanceCounter) {
        zoomLevel++;
        if (zoomLevel > MAX_ZOOM) {
            zoomLevel = MAX_ZOOM;
        } else {
            previousZoomLevel = zoomLevel - 1;
            zoomCustom(100, 0);
        }
        distanceCounter++;
    }
});

hammertime.on('pinchin', function(e) {
    showLog('pinchin' + Math.floor(e.distance / 10));

    if (Math.floor(e.distance / 5) > distanceCounter) {
        zoomLevel--;
        if (zoomLevel < 0) {
            zoomLevel = 0;
        } else {
            previousZoomLevel = zoomLevel + 1;
            zoomCustom(200, 0);
        }
        distanceCounter++;
    }
});