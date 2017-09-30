var rois=[];
var roiVisibility = true;
var cell;
var curAction = ACTION_ID_NONE;

(function() {

    var canvas = document.getElementById('cell-0');
    var cxt = canvas.getContext('2d');
    cxt.fillStyle='#000000';
    cxt.fillRect(0,0,canvas.width,canvas.height);

    var svg = document.getElementById('svg-0');

    var width = canvas.width;
    var height = canvas.height;
    var top = canvas.offsetTop;
    var left = canvas.offsetLeft;
    var viewBox = left.toString() + ' ' + top + ' ' + width + ' ' + height; 
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('x', left);
    svg.setAttribute('y', top);

    cell = new Cell('roi-cell', 0, canvas, svg);
    
    //rois = [ new ROICircle(1, svg, width/2, height/2, 50) ];

    var roiVisBtn = document.getElementById('btn-roi-visibility');
    if (roiVisBtn) {
        roiVisBtn.onclick = function() {
            roiVisibility = !roiVisibility;
            rois[0].visble(roiVisibility);
        }
    }

    var roiAddCircleBtn = document.getElementById('btn-roi-add-circle');
    if (roiAddCircleBtn) {
        roiAddCircleBtn.onclick = function() {
            // if(curAction == ACTION_ID_NONE) {
            //     curAction = ACTION_ID_ADD_ROI_CIRCLE;
            // } else {
            //     curAction = ACTION_ID_NONE;
            // }
            rois.push(new ROICircle(rois.length, svg, width/2, height/2, 50));
        }
    }

    var roiAddCircleBtn = document.getElementById('btn-roi-delete-circle');
    if (roiAddCircleBtn) {
        roiAddCircleBtn.onclick = function() {
            // if(curAction == ACTION_ID_NONE) {
            //     curAction = ACTION_ID_ADD_ROI_CIRCLE;
            // } else {
            //     curAction = ACTION_ID_NONE;
            // }
            if(rois.length > 0) {
                rois[rois.length-1].release();
                rois.pop();    
            }
        }
    }

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault()});    
})();
