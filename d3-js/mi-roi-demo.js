var rois=[];
var roi1;
var roiVisibility = true;

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

    
    roi1 = new ROICircle(1, svg, width/2, height/2, 50);

    var roiVisBtn = document.getElementById('btn-roi-visibility');
    if (roiVisBtn) {
        roiVisBtn.onclick = function() {
            roiVisibility = !roiVisibility;
            roi1.visble(roiVisibility);
        }
    }

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault()});    
})();
