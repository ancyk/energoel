(function(){
  var $window = $(window);
  var $topMenu = $('#top-menu');
  var nr;
  
  
  
  
  function changeMenuDevice() {
    if ($window.outerWidth(true) < 900) {
      $topMenu.slideUp(); 
      $topMenu.addClass('mobile');
      $('nav').on('click', function() {
        $topMenu.slideUp();
      });
    }
    else {
      $topMenu.slideDown();
      $topMenu.removeClass('mobile');
      $('nav').off('click', function() {
        $topMenu.slideUp();
      });
    } 
  }
  
  changeMenuDevice();
  
  $window.on('resize', function() {
    changeMenuDevice();
  });
  
  
  
  
  $('.hidden-text').slideUp();
  
  $('#arrow').on('click', function() {
    $('html, body').animate({
      scrollTop: $('#ofirmie>h1').offset().top - $('div.navbar').outerHeight(true)
    }, 1000, 'swing');
  });
  
  $('#menu-bar').on('click', function() {
    $topMenu.slideToggle();
  });
  
  $('button').on('click', function(e) {
    e.preventDefault();
    nr = (this.id).substring(4,5);
    $('.hidden' + nr).slideToggle();
  });
  
  $('#hide1').on('click', function(e) {
    e.preventDefault();
    $('.hidden1').slideUp();
    $('html, body').animate({
      scrollTop: $('#show1').offset().top - 100
    }, 500, 'swing')
  });
  
})();