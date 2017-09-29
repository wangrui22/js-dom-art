(function(){

    function prepareGallery() {
        if (!document.getElementsByTagName) return false;
        if (!document.getElementById) return false;

        gallery = document.getElementById('gallery');
        if (!gallery) return false;
        var links = document.getElementsByTagName('a');
        for ( var i=0; i < links.length; i++) {
          links[i].onclick = function() {
            return !showPic(this);
          }
          //links[i].onkeypress = links[i].onclick;
        }
      }

      prepareGallery();

      var x = new Cell('hehe',1);
      x.show();

      Client.recvData();

})();


function showPic(pic) {
    if (!document.getElementById('place-holder')) return false;
    var source = pic.getAttribute('href');
    var placeHolder = document.getElementById('place-holder');
    placeHolder.setAttribute('src', source);

    if (document.getElementById('description')) {
        var text = pic.getAttribute('title');
        document.getElementById('description').innerHTML = text;
    }
    return true;
}


