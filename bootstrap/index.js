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

})();
