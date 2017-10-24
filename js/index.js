(function(){
  var $window = $(window);
  var $htmlBody = $('html, body');
  var $topMenu = $('#top-menu');
  var $showMobile = $('#show-mobile');
  var $hideMobile = $('#hide-mobile');
  var $hiddenTextMobile = $('.hidden-text-mobile');
  var $images = $('.parallax');
  var $logoImg = $('#logo');
  var nrOffer, menuSrc, $winScroll, $imgOffset, $imgHeight, zebatki, zebatkiHr;
  
  
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
  
  // ukrycie lub pokazanie ofert
  function offerShow() {
    $showMobile.show();
    $hiddenTextMobile.hide();
    $showMobile.on('click', function(e){
      e.preventDefault();
      $hiddenTextMobile.slideDown();
      $showMobile.hide();
      $hideMobile.show();
      $hiddenTextMobile.addClass('mobile');
    });
    $hideMobile.on('click', function(e) {
      e.preventDefault();
      $hiddenTextMobile.slideUp();
      $showMobile.show();
      $hiddenTextMobile.removeClass('mobile');
    });
  }
  
  // zmiana stylu menu
  function changeMenuStyle() {
    if ($winScroll >= 300) {
      $('.navbar').addClass('scroll-menu');
      if ($window.outerWidth(true) < 900) {
        $logoImg.fadeIn(500);
      }
    }
    else {
      $('.navbar').removeClass('scroll-menu');
      if ($window.outerWidth(true) < 900) {
        $logoImg.fadeOut(0);
      }
    }
  }
  
  // efekt parallax
  function parallaxEffect() {
    $images.each(function() {
      $imgOffset = $(this).offset().top;
      $imgHeight = $(this).height();

      if ($window.outerWidth(true) < 700) {
        $(this).css('backgroundSize', '250%');
      } else {
        $(this).css('backgroundSize', 'cover');
      }
            
      $(this).css({
        backgroundPosition: '50%' + ' ' + (Math.round(($imgOffset - $winScroll)*3/8)-120) + 'px'
      });
    });
  }
  
  // aktywny element menu
  function activeElement() {
    if ($window.width() > 900) {
      if (($winScroll > ($('.bg-header').offset().top + 300)) && ($winScroll < ($('.bg2').offset().top - 300))) { $('a[href="#ofirmie"]').addClass('current'); } else { $('a[href="#ofirmie"]').removeClass('current'); }    

      if (($winScroll >= ($('.bg2').offset().top - 300)) && ($winScroll < ($('.bg3').offset().top - 300))) { $('a[href="#produkty"]').addClass('current'); } else { $('a[href="#produkty"]').removeClass('current'); }

      if (($winScroll >= ($('.bg3').offset().top - 300)) && ($winScroll < ($('.bg4').offset().top - 300))) { $('a[href="#oferta"]').addClass('current'); } else { $('a[href="#oferta"]').removeClass('current'); }

      if (($winScroll >= ($('.bg4').offset().top - 300)) && ($winScroll < ($('.bg5').offset().top - 300))) { $('a[href="#technologie"]').addClass('current'); } else { $('a[href="#technologie"]').removeClass('current'); }

      if (($winScroll >= ($('.bg6').offset().top - 300)) && ($winScroll < $('footer').offset().top)) { $('a[href="#kontakt"]').addClass('current'); } else { $('a[href="#kontakt"]').removeClass('current'); }
    } else {
      $('.top-menu a').each(function() {
        $(this).removeClass('current');
      });
    }
  }
  
  // wywołania funkcji przy wczytaniu strony
  changeMenuDevice();
  changeMenuStyle();
  if ($window.outerWidth(true) < 900) {
    offerShow(); 
    zebatki = document.getElementById('zebatki');
    zebatkiHr = document.querySelector('#zebatki > hr');
    zebatki.removeChild(zebatkiHr);
    document.querySelector('#show7 + .hidden7').appendChild(zebatki);
  }

  // reakcja na zmianę rozmiaru okna
  $window.on('resize', function() {
    changeMenuDevice();
    activeElement();
    if (($window.outerWidth(true) < 900) && (!$hiddenTextMobile.hasClass('mobile'))) offerShow();
    else if ($window.outerWidth(true) >= 900) {
      $showMobile.hide();
      $hideMobile.hide();
      $hiddenTextMobile.show();
      $hiddenTextMobile.removeClass('mobile');
    }
  });
  
  // reakcja na scrollowanie
  $window.on('scroll', function() {
    $winScroll = $window.scrollTop();
    
    changeMenuStyle();
    parallaxEffect();
    activeElement();
  });
  
  // rozwijanie/zwijanie menu mobilnego
  $('#menu-bar').on('click', function() {
    $topMenu.slideToggle();
    $('#menu-bar i').toggleClass('fa-bars');
    $('#menu-bar i').toggleClass('fa-times');
  });
  
  // zwinięcie menu mobilnego po kliknięciu
  $('nav>a').on('click', function() {
    if ($topMenu.hasClass('mobile') && ($window.outerWidth(true) < 900)) {
      $topMenu.slideUp();
      $('#menu-bar i').toggleClass('fa-bars');
      $('#menu-bar i').toggleClass('fa-times');
    }
  });
  
  // przejście niżej po kliknięciu strzałki
  $('#arrow').on('click', function() {
    $htmlBody.animate({
      scrollTop: $('#ofirmie > h1').offset().top - 80
    }, 1000, 'swing');
  });
  
  // rozwijanie dalszej części tekstu
  $('button').on('click', function(e) {
    e.preventDefault();
    nrOffer = (this.id).substring(4,5);
    $('.hidden' + nrOffer).slideToggle();
  });
  
  // przejście do góry po kliknięciu opisu
  $('#hide1').on('click', function(e) {
    e.preventDefault();
    $('.hidden1').slideUp();
    $htmlBody.animate({
      scrollTop: $('#show1').offset().top - 80
    }, 500, 'swing');
  });
  
  // przejście do góry strony
  $logoImg.on('click', function() {
    $htmlBody.animate({
      scrollTop: 0
    }, 1500, 'swing');
  });
  
  // efekt przejścia w menu
  $('#top-menu').on('click', 'a', function(e) {
    e.preventDefault();
    menuSrc = this.getAttribute('href');
    $htmlBody.animate({
      scrollTop: $(menuSrc + ' h1').offset().top - 80
    }, 1500, 'swing');
  });
  
})();