class Font {
    constructor(svg, info, x, y) {
        this.svg = svg;
        this.info = info;
        this.x = x;
        this.y = y;

        //shadow 可以用css的
        //https://bl.ocks.org/d3noob/aa55e2004abba3c503116b103a1f0ff2
        this.text = d3.select(this.svg).append('text')
        .attr('x', x)
        .attr('y', y)
        .attr("font-family", "Monospace")
        .style("font-size", "24px")
        .attr("fill", "white")
        .text(info)
        .attr("class", "shadow")	
        
    }

}