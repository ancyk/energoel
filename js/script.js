(function() {
  var $window = $(window);
  var $htmlBody = $('html, body');
  
  // przejście do góry strony
  $('#logo').on('click', function() {
    $htmlBody.animate({
      scrollTop: 0
    }, 1500, 'swing');
  });
  
  // zachowanie proporcji filmiku
  var iframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i],
    players = /www.youtube.com/;
    if (iframe.src.search(players) > 0) {
      var videoRatio = (iframe.height/iframe.width) * 100;
      
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.width = '100%';
      iframe.height = '100%';

      var wrap = document.createElement('div');
      wrap.className = 'fluid-vids';
      wrap.style.width = '100%';
      wrap.style.position = 'relative';
      wrap.style.paddingTop = videoRatio + '%';
      
      var iframeParent = iframe.parentNode;
      iframeParent.insertBefore(wrap, iframe);
      wrap.appendChild(iframe);
    }
  }
})();