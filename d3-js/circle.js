const CTRL_COLOR = 'white';
const CTRL_SIZE = 8;
const HIGHLIGHT_COLOR = 'yellow';

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

    
    roi1 = new ROICircle(svg, width/2, height/2, 50);

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

function ROICircle(svg, cx, cy, r){
    this.svg = svg;
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.roiMain = null;
    this.roiCtrlLT = null;
    this.roiCtrlLB = null;
    this.roiCtrlRT = null;
    this.roiCtrlRB = null;
    this.roiCtrlMove = null;
    this.moveCallback = null;
    this.stretchCallback = null;

    //ROI main
    this.roiMain = d3.select(svg).append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', r)
    //.style('fill-opacity', 0.0) //热点是整个圆
    .style('fill', 'none')//热点是圆圈
    .style('stroke', 'white')
    .style('stroke-opacity', 1.0)
    .style('stroke-width', 2)

    //ROI raidus ctrl 
    this.roiCtrlLT = d3.select(svg).append('circle')
    .attr('cx', Math.floor(cx - 0.707*r))
    .attr('cy', Math.floor(cy - 0.707*r))
    .attr('r', CTRL_SIZE)
    .style('fill', CTRL_COLOR) //热点是整个圆
    .style('cursor', 'move');

    this.roiCtrlLB = d3.select(svg).append('circle')
    .attr('cx', Math.floor(cx - 0.707*r))
    .attr('cy', Math.floor(cy + 0.707*r))
    .attr('r', CTRL_SIZE)
    .style('fill', CTRL_COLOR) //热点是整个圆
    .style('cursor', 'move');

    this.roiCtrlRT = d3.select(svg).append('circle')
    .attr('cx', Math.floor(cx + 0.707*r))
    .attr('cy', Math.floor(cy - 0.707*r))
    .attr('r', CTRL_SIZE)
    .style('fill', CTRL_COLOR) //热点是整个圆
    .style('cursor', 'move');

    this.roiCtrlRB = d3.select(svg).append('circle')
    .attr('cx', Math.floor(cx + 0.707*r))
    .attr('cy', Math.floor(cy + 0.707*r))
    .attr('r', CTRL_SIZE)
    .style('fill', CTRL_COLOR) //热点是整个圆
    .style('cursor', 'move');

    this.roiCtrlMove = d3.select(svg).append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', CTRL_SIZE)
    .style('fill-opacity', 0.0) //热点是整个圆
    .style('stroke', CTRL_COLOR)
    .style('stroke-opacity', 1.0)
    .style('stroke-width', 3)
    .style('cursor', 'move');

    //dragger
    // var dragCtrlMove = (function(d) {
    //     this.move(d3.event.x, d3.event.y)
    // }).bind(this);
    this.roiCtrlMove.call(d3.drag().on('drag' , (function(d) {
        this.move(d3.event.x, d3.event.y);
    }).bind(this)));

    var dragCtrlStretch = (function(d) {
        let cx = this.roiMain.attr('cx');
        let cy = this.roiMain.attr('cy');
        let r = Math.sqrt((d3.event.x - cx)*(d3.event.x - cx) + (d3.event.y - cy)*(d3.event.y - cy));
        this.stretch(Math.floor(r));
    }).bind(this);
    this.roiCtrlLT.call(d3.drag().on('drag' ,dragCtrlStretch));
    this.roiCtrlLB.call(d3.drag().on('drag' ,dragCtrlStretch));
    this.roiCtrlRT.call(d3.drag().on('drag' ,dragCtrlStretch));
    this.roiCtrlRB.call(d3.drag().on('drag' ,dragCtrlStretch));
}

ROICircle.prototype.move = function(cx, cy) {
    let r = parseFloat(this.roiMain.attr('r'));
    this.roiMain
    .attr('cx', cx)
    .attr('cy', cy);
    this.roiCtrlLT
    .attr('cx', Math.floor(cx - 0.707*r))
    .attr('cy', Math.floor(cy - 0.707*r));
    this.roiCtrlLB
    .attr('cx', Math.floor(cx - 0.707*r))
    .attr('cy', Math.floor(cy + 0.707*r));
    this.roiCtrlRT
    .attr('cx', Math.floor(cx + 0.707*r))
    .attr('cy', Math.floor(cy - 0.707*r));
    this.roiCtrlRB
    .attr('cx', Math.floor(cx + 0.707*r))
    .attr('cy', Math.floor(cy + 0.707*r));
    this.roiCtrlMove
    .attr('cx', cx)
    .attr('cy', cy);

    if(this.movecallBack) {
        this.movecallBack();
    }
}

ROICircle.prototype.stretch = function(r) {
    let cx = parseFloat(this.roiMain.attr('cx'));
    let cy = parseFloat(this.roiMain.attr('cy'));
    this.roiMain
    .attr('r', r);
    this.roiCtrlLT
    .attr('cx', Math.floor(cx - 0.707*r))
    .attr('cy', Math.floor(cy - 0.707*r));
    this.roiCtrlLB
    .attr('cx', Math.floor(cx - 0.707*r))
    .attr('cy', Math.floor(cy + 0.707*r));
    this.roiCtrlRT
    .attr('cx', Math.floor(cx + 0.707*r))
    .attr('cy', Math.floor(cy - 0.707*r));
    this.roiCtrlRB
    .attr('cx', Math.floor(cx + 0.707*r))
    .attr('cy', Math.floor(cy + 0.707*r));
    this.roiCtrlMove
    .attr('cx', cx)
    .attr('cy', cy);

    // console.log('LT:' + this.roiCtrlLT.attr('cx') + ' ' + this.roiCtrlLT.attr('cy'));
    // console.log('LB:' + this.roiCtrlLB.attr('cx') + ' ' + this.roiCtrlLB.attr('cy'));
    // console.log('RT:' + this.roiCtrlRT.attr('cx') + ' ' + this.roiCtrlRT.attr('cy'));
    // console.log('RB:' + this.roiCtrlRB.attr('cx') + ' ' + this.roiCtrlRB.attr('cy'));
    // console.log('');

    if(this.stretchCallback) {
        this.stretchCallback();
    }
}

ROICircle.prototype.visble = function(flag) {
    if( flag === true) {
        var vis = 'inline';
    } else {
        var vis = 'none';
    }

    this.roiMain.style('display', vis);
    this.roiCtrlLT.style('display', vis);
    this.roiCtrlLB.style('display', vis);
    this.roiCtrlRT.style('display', vis);
    this.roiCtrlRB.style('display', vis);
    this.roiCtrlMove.style('display', vis);
} 



