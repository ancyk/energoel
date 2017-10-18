(function(){
  var $window = $(window);
  var $topMenu = $('#top-menu');
  var $showMobile = $('#show-mobile');
  var $hideMobile = $('#hide-mobile');
  var $hiddenTextMobile = $('.hidden-text-mobile');
  var nrOffer, nrProduct;
  
  
  // ukrycie tekstu oraz przycisków
  $('.hidden-text').hide(); 
  $showMobile.hide();
  $hideMobile.hide();
  
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
  
  function offerShow() {
    if ($window.outerWidth(true) < 900) {
      $showMobile.show();
      $hiddenTextMobile.hide();
      $showMobile.on('click', function(e){
        e.preventDefault();
        $hiddenTextMobile.slideDown();
        $showMobile.hide();
        $hideMobile.show();
      });
      $hideMobile.on('click', function(e) {
        e.preventDefault();
        $hiddenTextMobile.slideUp();
        $showMobile.show();
        $('html, body').animate({
          scrollTop: $showMobile.offset().top - 100
        });
      });
    } else {
      $showMobile.hide();
      $hideMobile.hide();
      $hiddenTextMobile.show();
    }
  }
  
  function hideProducts(nr) {
    for (var i = 1; i <= $('#product-content').children().length; i++) {
      if (i != nr) $('#product' + i).hide();
      else $('#product' + i).slideDown();
    }
  }
  
  changeMenuDevice();
  offerShow(); 
  hideProducts();

  // reakcja na zmianę rozmiaru okna
  $window.on('resize', function() {
    changeMenuDevice();
    offerShow();
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
    nrOffer = (this.id).substring(4,5);
    $('.hidden' + nrOffer).slideToggle();
  });
  
  // przejście do góry po kliknięciu
  $('#hide1').on('click', function(e) {
    e.preventDefault();
    $('.hidden1').slideUp();
    $('html, body').animate({
      scrollTop: $('#show1').offset().top - 100
    }, 500, 'swing');
  });
  
  // pokazywanie opisu produktu
  $('.product-hover').on('click', function() {
    nrProduct = parseInt((this.id).slice(-1));
    hideProducts(nrProduct);
  });
  
})();