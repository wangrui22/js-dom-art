
const LINE_WIDTH = 1;
const LINE_COLOR = 'red'
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

    //TODO
    //ctrl
    // this.line00Move;
    // this.line00Rotate;

    //init
    var l0 = this.calLine(cx, cy, line0Para);
    this.line00 = d3.select(this.svg)
    .append('line')
    .attr('x1', l0[0].x)
    .attr('y1', l0[0].y)
    .attr('x2', l0[1].x)
    .attr('y2', l0[1].y)
    .style('stroke-width', LINE_WIDTH)
    .style('stroke', LINE_COLOR)
    .style('stroke-opacity', 1.0)
    .style('cursor', 'move');

    var l1 = this.calLine(cx, cy, line1Para);
    this.line10 = d3.select(this.svg)
    .append('line')
    .attr('x1', l1[0].x)
    .attr('y1', l1[0].y)
    .attr('x2', l1[1].x)
    .attr('y2', l1[1].y)
    .style('stroke-width', LINE_WIDTH)
    .style('stroke', LINE_COLOR)
    .style('stroke-opacity', 1.0)
    .style('cursor', 'move');

    //drag line
    this.line00.call(d3.drag().
    on('drag', (function (d) {
        var x = d3.event.x;
        var y = d3.event.y;
        if (this.line0Para.a == 0) {
            this.line0Para.b = 1/y;
            var l0 = this.calLine(this.cx, this.cy, this.line0Para);
            this.line00.attr('x1', l0[0].x)
            .attr('y1', l0[0].y)
            .attr('x2', l0[1].x)
            .attr('y2', l0[1].y);
        } else if (line0Para.b == 0) {
            this.line0Para.a = 1/x;
            var l0 = this.calLine(this.cx, this.cy, this.line0Para);
            this.line00.attr('x1', l0[0].x)
            .attr('y1', l0[0].y)
            .attr('x2', l0[1].x)
            .attr('y2', l0[1].y);
        } else {

        }

        console.log(d3.event.x + ' ' + d3.event.y);
    }).bind(this))
    .on('end', (function (d) {
        console.log(d3.event.x + ' ' + d3.event.y);
    }).bind(this)));

    this.line10.call(d3.drag().
    on('drag', (function (d) {
        var x = d3.event.x;
        var y = d3.event.y;
        if (this.line1Para.a == 0) {
            this.line1Para.b = 1/y;
            var l0 = this.calLine(this.cx, this.cy, this.line1Para);
            this.line10.attr('x1', l0[0].x)
            .attr('y1', l0[0].y)
            .attr('x2', l0[1].x)
            .attr('y2', l0[1].y);
        } else if (line1Para.b == 0) {
            this.line1Para.a = 1/x;
            var l0 = this.calLine(this.cx, this.cy, this.line1Para);
            this.line10.attr('x1', l0[0].x)
            .attr('y1', l0[0].y)
            .attr('x2', l0[1].x)
            .attr('y2', l0[1].y);
        } else {

        }

        console.log(d3.event.x + ' ' + d3.event.y);
    }).bind(this))
    .on('end', (function (d) {
        console.log(d3.event.x + ' ' + d3.event.y);
    }).bind(this)));
}

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
        return [{x:0, y:0}, {x:0,y:0}];
    } else {
        return res;
    }
}
// Crosshair.prototype.setLine = function(cx, cy, line0, line1) {
//     this.cx = cx;
//     this.cy = cy;
//     this.line0 = line0;//{dx: dy:}
//     this.line1 = line1;//{dx: dy:}


// }
