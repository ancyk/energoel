(function(){
  var $window = $(window);
  var $topMenu = $('#top-menu');
  var nr;
  
  
  // ukrycie lub pokazanie menu w zależności
  // od szerokości okna przeglądarki
  function changeMenuDevice() {
    if ($window.outerWidth(true) < 900) {
      $topMenu.hide(); 
      $topMenu.addClass('mobile');
    }
    else {
      $topMenu.show();
      $topMenu.removeClass('mobile');
    } 
  }
  
  changeMenuDevice();
  
  // ukrycie tekstu
  $('.hidden-text').hide();
  
  // reakcja na zmianę rozmiaru okna
  $window.on('resize', function() {
    changeMenuDevice();
  });
  
  // rozwijanie/zwijanie menu mobilnego
  $('#menu-bar').on('click', function() {
    $topMenu.slideToggle();
  });
  
  // zwinięcie menu mobilnego po kliknięciu
  $('nav>a').on('click', function() {
    if ($topMenu.hasClass('mobile') && ($window.outerWidth(true) < 900)) $topMenu.slideUp();
  });
  
  // przejście niżej po kliknięciu strzałki
  $('#arrow').on('click', function() {
    $('html, body').animate({
      scrollTop: $('#ofirmie>h1').offset().top - $('div.navbar').outerHeight(true)
    }, 1000, 'swing');
  });
  
  // rozwijanie dalszej części tekstu
  $('button').on('click', function(e) {
    e.preventDefault();
    nr = (this.id).substring(4,5);
    $('.hidden' + nr).slideToggle();
  });
  
  // przejście do góry po kliknięciu
  $('#hide1').on('click', function(e) {
    e.preventDefault();
    $('.hidden1').slideUp();
    $('html, body').animate({
      scrollTop: $('#show1').offset().top - 100
    }, 500, 'swing')
  });
  
})();