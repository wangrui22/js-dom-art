
function getProperCellSize() {
    var cellContainerW = document.getElementById('cell-container').offsetWidth;
    // var cellContainerH = document.getElementById('cell-container').offsetHeight;
    var navigatorHeight = document.getElementById('navigator-div').offsetHeight;
    var w = (cellContainerW - 66) / 2;
    var h = (window.innerHeight - navigatorHeight - 90) / 2;
    return {
        width: w,
        height: h
    };
}
function resize(svg, canvas, size) {
    var width = size.width;
    var height = size.height;
    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);
    var top = canvas.offsetTop;
    var left = canvas.offsetLeft;
    var viewBox = left.toString() + ' ' + top + ' ' + Math.floor(width) + ' ' + Math.floor(height);
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('width', Math.floor(width));
    svg.setAttribute('height', Math.floor(height));
    svg.setAttribute('x', left);
    svg.setAttribute('y', top);

}

(function(){

    $('#carousel-155248').carousel('pause');

    document.getElementById('btn-vrt-browser').onclick = function(event) {

    }

    // var myModal = document.getElementById('myModal');
    // myModal.draggable = true;
    //myModal
    // $('#myModal').draggable({
    //     handle: '.modal-header'
    // });

    $("#myModal").draggable({
        handle: ".modal-header"
    });

    $('#myModal').on('show.bs.modal', function () {
        $(this).find('.modal-body').css({
               width:'auto', //probably not needed
               height:'auto', //probably not needed 
               'max-height':'100%'
        });   
    });
    
    var size = getProperCellSize();
    console.log(size);
    resize(document.getElementById('svg0'), document.getElementById('canvas0'), size);
    resize(document.getElementById('svg1'), document.getElementById('canvas1'), size);
    resize(document.getElementById('svg2'), document.getElementById('canvas2'), size);
    resize(document.getElementById('svg3'), document.getElementById('canvas3'), size);

})();
