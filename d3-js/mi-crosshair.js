
function Crosshair(svg, cx, cy, line0Para, line1Para) {
    this.svg = svg;
    this.cx = cx;
    this.cy = cy;
    this.line0Para = line0Para;//{a: b:} ax + by = 1
    this.line1Para = line1Para;//{a: b:}

    //svg
    this.line00;
    this.line01;
    this.line10;
    this.line11;
    this.crossUp;
    this.crossDown;
    this.crossLeft;
    this.crossRight;
    this.crossCtrlOverlay;
    this.crossCtrl;

    //TODO
    //ctrl
    // this.line00Move;
    // this.line00Rotate;

    //init
    this.line00 = d3.select(this.svg)
    .append('line')
    .style('stroke-width', this.lineWidth)
    .style('stroke', this.line0Color)
    .style('stroke-opacity', 1.0)

    this.line01 = d3.select(this.svg)
    .append('line')
    .style('stroke-width', this.lineWidth)
    .style('stroke', this.line0Color)
    .style('stroke-opacity', 1.0)

    this.line10 = d3.select(this.svg)
    .append('line')
    .style('stroke-width', this.lineWidth)
    .style('stroke', this.line1Color)
    .style('stroke-opacity', 1.0)

    this.line11 = d3.select(this.svg)
    .append('line')
    .style('stroke-width', this.lineWidth)
    .style('stroke', this.line1Color)
    .style('stroke-opacity', 1.0)

    this.crossUp = d3.select(this.svg)
    .append('line')
    .style('stroke-width', this.crossWidth)
    .style('stroke', this.crossColor)
    .style('stroke-opacity', 1.0)

    this.crossDown = d3.select(this.svg)
    .append('line')
    .style('stroke-width', this.crossWidth)
    .style('stroke', this.crossColor)
    .style('stroke-opacity', 1.0)

    this.crossLeft = d3.select(this.svg)
    .append('line')
    .style('stroke-width', this.crossWidth)
    .style('stroke', this.crossColor)
    .style('stroke-opacity', 1.0)

    this.crossRight = d3.select(this.svg)
    .append('line')
    .style('stroke-width', this.crossWidth)
    .style('stroke', this.crossColor)
    .style('stroke-opacity', 1.0)

    this.crossCtrlOverlay = d3.select(this.svg)
    .append('rect')
    .style('fill', 'white')
    .style('opacity', 0)

    this.crossCtrl = d3.select(this.svg)
    .append('rect')
    .style('fill', 'white')
    .style('opacity', 0)
    .style('cursor', 'move');

    this.setLine(cx, cy, line0Para, line1Para);

    

    //drag crosshair
    this.crossCtrl.call(d3.drag().
    on('drag', (function (d) {
        var x = d3.event.x;
        var y = d3.event.y;
        //calculate new line parameter
        
        if (this.line0Para.a == 0) {
            this.line0Para.b = 1/y;
        } else if (line0Para.b == 0) {
            this.line0Para.a = 1/x;
        } else {

        }

        if (this.line1Para.a == 0) {
            this.line1Para.b = 1/y;
        } else if (line1Para.b == 0) {
            this.line1Para.a = 1/x;
        } else {

        }

        this.setLine(x, y, this.line0Para, this.line1Para);
        console.log(d3.event.x + ' ' + d3.event.y);
    }).bind(this))
    .on('end', (function (d) {
        console.log(d3.event.x + ' ' + d3.event.y);
    }).bind(this)));


    //drag line
    // this.line00.call(d3.drag().
    // on('drag', (function (d) {
    //     var x = d3.event.x;
    //     var y = d3.event.y;
    //     if (this.line0Para.a == 0) {
    //         this.line0Para.b = 1/y;
    //         var l0 = this.calLine(this.cx, this.cy, this.line0Para);
    //         this.line00.attr('x1', l0[0].x)
    //         .attr('y1', l0[0].y)
    //         .attr('x2', l0[1].x)
    //         .attr('y2', l0[1].y);
    //     } else if (line0Para.b == 0) {
    //         this.line0Para.a = 1/x;
    //         var l0 = this.calLine(this.cx, this.cy, this.line0Para);
    //         this.line00.attr('x1', l0[0].x)
    //         .attr('y1', l0[0].y)
    //         .attr('x2', l0[1].x)
    //         .attr('y2', l0[1].y);
    //     } else {

    //     }
    //     console.log(d3.event.x + ' ' + d3.event.y);
    // }).bind(this))
    // .on('end', (function (d) {
    //     console.log(d3.event.x + ' ' + d3.event.y);
    // }).bind(this)));

    // this.line10.call(d3.drag().
    // on('drag', (function (d) {
    //     var x = d3.event.x;
    //     var y = d3.event.y;
    //     if (this.line1Para.a == 0) {
    //         this.line1Para.b = 1/y;
    //         var l0 = this.calLine(this.cx, this.cy, this.line1Para);
    //         this.line10.attr('x1', l0[0].x)
    //         .attr('y1', l0[0].y)
    //         .attr('x2', l0[1].x)
    //         .attr('y2', l0[1].y);
    //     } else if (line1Para.b == 0) {
    //         this.line1Para.a = 1/x;
    //         var l0 = this.calLine(this.cx, this.cy, this.line1Para);
    //         this.line10.attr('x1', l0[0].x)
    //         .attr('y1', l0[0].y)
    //         .attr('x2', l0[1].x)
    //         .attr('y2', l0[1].y);
    //     } else {

    //     }

    //     console.log(d3.event.x + ' ' + d3.event.y);
    // }).bind(this))
    // .on('end', (function (d) {
    //     console.log(d3.event.x + ' ' + d3.event.y);
    // }).bind(this)));
}

function distance(p0, p1) {
    return Math.sqrt((p0.x - p1.x)*(p0.x - p1.x) + (p0.y - p1.y)*(p0.y - p1.y));
}

Crosshair.prototype.lineWidth = 1.5;
Crosshair.prototype.line0Color ='red';
Crosshair.prototype.line1Color = 'yellow';
Crosshair.prototype.crossColor = 'blue';
Crosshair.prototype.crossSize = 20;
Crosshair.prototype.crossCtrlSize = 7;

Crosshair.prototype.calLine = function(cx, cy, para) {
    var width = $(this.svg).attr('width');
    var height = $(this.svg).attr('height');

    //cross 4 border
    var res = [];
    var x0 = 0;
    var y0 = (1 - para.a * x0) / para.b;
    if (y0 >= 0 && y0 <= height - 1) { res.push({x:x0, y:y0});}
    var x1 = width - 1;
    var y1 = (1 - para.a * x1) / para.b;
    if (y1 >= 0 && y1 <= height - 1) { res.push({x:x1, y:y1});}
    var y2 = 0;
    var x2 = (1 - para.b * y2) / para.a;
    if (x2 >= 0 && x2 <= width - 1) { res.push({x:x2, y:y2});}
    var y3 = height - 1;
    var x3 = (1 - para.b * y3) / para.a;
    if (x3 >= 0 && x3 <= width - 1) { res.push({x:x3, y:y3});}
    if (res.length != 2)  {
        return [{x:0, y:0}, {x:0,y:0}, {x:0, y:0}, {x:0,y:0}];
    }

    var ab = Math.sqrt(para.a*para.a + para.b*para.b);
    var dx = para.b/ab;
    var dy = para.a/ab;
    var p0 = {x:cx - this.crossSize*dx, y:cy - this.crossSize*dy};
    var p1 = {x:cx + this.crossSize*dx, y:cy + this.crossSize*dy};

    if (distance(res[0], p0) <= distance(res[0], {x:this.cx, y:this.cy})) {
        return [res[0], p0, res[1], p1];
    } else {
        return [res[0], p1, res[1], p0];
    }
}

Crosshair.prototype.setLine = function(cx, cy, para0, para1) {
    this.cx = cx;
    this.cy = cy;
    this.line0Para = para0;//{a: b:} ax + by = 1
    this.line1Para = para1;//{a: b:}

    var l0 = this.calLine(this.cx, this.cy, this.line0Para);
    this.line00
    .attr('x1', l0[0].x)
    .attr('y1', l0[0].y)
    .attr('x2', l0[1].x)
    .attr('y2', l0[1].y);

    this.line01
    .attr('x1', l0[2].x)
    .attr('y1', l0[2].y)
    .attr('x2', l0[3].x)
    .attr('y2', l0[3].y);

    var l1 = this.calLine(this.cx, this.cy, this.line1Para);
    this.line10
    .attr('x1', l1[0].x)
    .attr('y1', l1[0].y)
    .attr('x2', l1[1].x)
    .attr('y2', l1[1].y);

    this.line11
    .attr('x1', l1[2].x)
    .attr('y1', l1[2].y)
    .attr('x2', l1[3].x)
    .attr('y2', l1[3].y);

    this.crossLeft
    .attr('x1', this.cx)
    .attr('y1', this.cy)
    .attr('x2', this.cx - this.crossSize/2)
    .attr('y2', this.cy);

    this.crossRight
    .attr('x1', this.cx)
    .attr('y1', this.cy)
    .attr('x2', this.cx + this.crossSize/2)
    .attr('y2', this.cy);

    this.crossUp
    .attr('x1', this.cx)
    .attr('y1', this.cy)
    .attr('x2', this.cx)
    .attr('y2', this.cy - this.crossSize/2);

    this.crossDown
    .attr('x1', this.cx)
    .attr('y1', this.cy)
    .attr('x2', this.cx)
    .attr('y2', this.cy + this.crossSize/2);

    this.crossCtrlOverlay
    .attr('x', cx - this.crossSize/2)
    .attr('y', cy - this.crossSize/2)
    .attr('width', this.crossSize)
    .attr('height', this.crossSize);

    this.crossCtrl
    .attr('x', cx - this.crossCtrlSize/2)
    .attr('y', cy - this.crossCtrlSize/2)
    .attr('width', this.crossCtrlSize)
    .attr('height', this.crossCtrlSize);
}
