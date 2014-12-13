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

// Zoom function
var CONST_ZOOM_AMOUNT = 0.05;
var zoomCustom = function(time, delay2) {
    var previousPercentage = 1 + CONST_ZOOM_AMOUNT * previousZoomLevel;
    var percentage = 1 + CONST_ZOOM_AMOUNT * zoomLevel;

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

// handler for buttonIn
$('#zoomInBtn').click(function(evt) {
    zoomLevel = 10;
    zoomCustom(400, 100);
});

// handler for buttonOut
$('#zoomOutBtn').click(function(evt) {
    zoomLevel = 0;
    zoomCustom(400, 100);
});

// MOBILE
// logger
var showLog = function(textInput) {
    $('#infoBoard').text(textInput);
}

// bind touch event
var myElement = document.getElementById('train-map');
var mjolnir = new Hammer(myElement)

// the distance moved in X and Y axes
var currentDeltaX = 0;
var currentDeltaY = 0;

mjolnir.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});

// reset the distance in the beginning of panning
mjolnir.on('panstart', function(e) {
    currentDeltaX = 0;
    currentDeltaY = 0;
});

// callback according to time of moving 1 finger
mjolnir.on('panmove', function(e) {

    // the absolute distances moved
    var deltaX = parseInt(e.deltaX);
    var deltaY = parseInt(e.deltaY);

    // the raw x coordinate (distance moved from 0 of X axis)
    var rawTransitionX = $('#canvas').css('x');
    // the raw y coordinate (distance moved from 0 of Y axis)
    var rawTransitionY = $('#canvas').css('y');

    // the x coordinate (distance moved from 0 of X axis)
    var transitionX;
    if (typeof(rawTransitionX) === 'string') {
        transitionX = parseInt(rawTransitionX.substring(0, rawTransitionX.length - 2));
    } else if (typeof(rawTransitionX) === 'number') {
        transitionX = rawTransitionX;
    }

    // the y coordinate (distance moved from 0 of Y axis)
    var transitionY;
    if (typeof(rawTransitionY) === 'string') {
        transitionY = parseInt(rawTransitionY.substring(0, rawTransitionY.length - 2));
    } else if (typeof(rawTransitionY) === 'number') {
        transitionY = rawTransitionY;
    }

    var percentage = 1 + CONST_ZOOM_AMOUNT * zoomLevel;

    // origin height and width
    var originHeight = $('#canvas img').height();
    var originWidth = $('#canvas img').width();

    // viewport height and width (or coordinates)
    var viewportHeight = $('#train-map').height();
    var viewportWidth = $('#train-map').width();

    // shift distances for transition (after scaling)
    var shiftX = originWidth * (percentage - 1) / 2;
    var shiftY = originHeight * (percentage - 1) / 2;


    // TODO reduce floating point imprecision
    /*  

       O----------> + x
        |    
        |    
        |    
        |    
        | + y   


                        b  
        /////////////////////////////////////
        //     O                           //
        //      //////////                 //
        //    c //      //                 //
      a //      //////////                 //
        //          d                      //
        //                                 //
        //                                 //
        /////////////////////////////////////
    */

    // height and width after scaling
    var a = originHeight * percentage;
    var b = originWidth * percentage;

    // just trivial things
    var c = viewportHeight;
    var d = viewportWidth;

    // the distance moved between 2 panmove callback
    var accelDeltaX = 0;

    var upperBoundaryX = 0;
    var lowerBoundaryX = -(b - d);

    // showLog('panmove ' + (transitionX - shiftX) + ' ' + (upperBoundaryX));

    // TODO neccessary?
    if (Math.floor(transitionX - shiftX) <= upperBoundaryX + 10 && Math.ceil(transitionX - shiftX) >= lowerBoundaryX - 10) {
        var temp = deltaX - currentDeltaX;
        // normalization
        if (transitionX + temp - shiftX > upperBoundaryX) {
            deltaX = upperBoundaryX - transitionX + shiftX + currentDeltaX;
        } else if (transitionX + temp - shiftX < lowerBoundaryX) {
            deltaX = lowerBoundaryX - transitionX + shiftX + currentDeltaX;
        }
        accelDeltaX = deltaX - currentDeltaX;
        currentDeltaX = deltaX;
    }

    var accelDeltaY = 0;

    var upperBoundaryY = 0;
    var lowerBoundaryY = -(a - c);

    showLog('panmove ' + (transitionY - shiftY) + ' ' + (upperBoundaryY));

    // TODO neccessary?
    if (Math.floor(transitionY - shiftY) <= upperBoundaryY + 10 && Math.ceil(transitionY - shiftY) >= lowerBoundaryY - 10) {
        var temp = deltaY - currentDeltaY;
        // normalization
        if (transitionY + temp - shiftY > upperBoundaryY) {
            deltaY = upperBoundaryY - transitionY + shiftY + currentDeltaY;
        } else if (transitionY + temp - shiftY < lowerBoundaryY) {
            deltaY = lowerBoundaryY - transitionY + shiftY + currentDeltaY;
        }
        accelDeltaY = deltaY - currentDeltaY;
        currentDeltaY = deltaY;
    }

    $('#canvas').transition({
        x: '+=' + Math.floor(accelDeltaX),
        y: '+=' + Math.floor(accelDeltaY)
    }, 0, 'linear');
});

// enable pinch (zoom)
mjolnir.get('pinch').set({
    enable: true
});

var previousZoomLevel = 0;
var zoomLevel = 0;
var CONST_MAX_ZOOM = 20;
var CONST_MIN_ZOOM = 0;

// counter for distance moved, increase when 2 fingers travel a specific distance
var distanceCounter = 0;


// reset on start and end
mjolnir.on('pinchstart', function(e) {
    distanceCounter = 0;
});

mjolnir.on('pinchend', function(e) {
    distanceCounter = 0;
});

// calculate zoom level
mjolnir.on('pinchout', function(e) {
    showLog('pinchout' + Math.floor(e.distance / 10));

    if (Math.floor(e.distance / 5) > distanceCounter) {
        zoomLevel++;
        if (zoomLevel > CONST_MAX_ZOOM) {
            zoomLevel = CONST_MAX_ZOOM;
        } else {
            previousZoomLevel = zoomLevel - 1;
            zoomCustom(200, 0);
        }
        distanceCounter++;
    }
});

mjolnir.on('pinchin', function(e) {
    showLog('pinchin' + Math.floor(e.distance / 10));

    if (Math.floor(e.distance / 5) > distanceCounter) {
        zoomLevel--;
        if (zoomLevel < CONST_MIN_ZOOM) {
            zoomLevel = CONST_MIN_ZOOM;
        } else {
            previousZoomLevel = zoomLevel + 1;
            zoomCustom(200, 0);
        }
        distanceCounter++;
    }
});