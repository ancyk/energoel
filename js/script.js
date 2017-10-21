(function(){
  var $window = $(window);
  var $topMenu = $('#top-menu');
  var $htmlBody = $('html, body');
  var $showMobile = $('#show-mobile');
  var $hideMobile = $('#hide-mobile');
  var $hiddenTextMobile = $('.hidden-text-mobile');
  var $productContent = $('#product-content');
  var $images = $('.parallax');
  var nrOffer, nrProduct, menuSrc, $winScroll, $imgOffset, $imgHeight, zebatki, zebatkiHr;
  
  
  // ukrycie tekstu oraz przycisków
  $('.hidden-text').hide(); 
  $showMobile.hide();
  $hideMobile.hide();
  $productContent.hide();
  
  
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
      $htmlBody.animate({
        scrollTop: $showMobile.offset().top - 80
      });
    });
  }
  
  // wyświetlenie poszczególnego produktu
  function hideProducts(nr) {
    for (var i = 1; i <= $('#product-content').children().length; i++) {
      if (i != nr) $('#product' + i).hide();
      else {
        $('#product' + i).slideDown();
        $productContent.show();
      }
    }
  }
  
  // zmiana stylu menu
  function changeMenuStyle() {
    if ($winScroll >= 300)
      $('.navbar').addClass('scroll-menu');
    else
      $('.navbar').removeClass('scroll-menu');
  }
  
  // efekt parallax
  function parallaxEffect() {
    $images.each(function() {
      $imgOffset = $(this).offset().top;
      $imgHeight = $(this).height();

      if ($window.width() < 780) {
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

      if (($winScroll >= ($('.bg5').offset().top - 300)) && ($winScroll < $('footer').offset().top)) { $('a[href="#kontakt"]').addClass('current'); } else { $('a[href="#kontakt"]').removeClass('current'); }
    } else {
      $('.top-menu a').each(function() {
        $(this).removeClass('current');
      });
    }
  }
  
  changeMenuDevice();
  changeMenuStyle();
  if ($window.outerWidth(true) < 900) {
    offerShow(); 
    zebatki = document.getElementById('zebatki');
    zebatkiHr = document.querySelector('#zebatki > hr');
    zebatki.removeChild(zebatkiHr);
    document.querySelector('#show7 + .hidden7').appendChild(zebatki);
  }
  hideProducts();

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
  $('#logo').on('click', function() {
    $htmlBody.animate({
      scrollTop: 0
    }, 1500, 'swing');
  });
  
  // pokazywanie opisu produktu
  $('.product-hover').on('click', function() {
    nrProduct = parseInt((this.id).slice(-1));
    hideProducts(nrProduct);
    $htmlBody.animate({
      scrollTop: $('#product-content').offset().top - 80
    }, 500, 'swing');
  });
  
  // zwinięcie opisu produktu
  $('.btn-product').on('click', function(e) {
    e.preventDefault();
    $productContent.slideUp();
  });
  
  // efekt przejścia w menu
  $('#top-menu').on('click', 'a', function(e) {
    e.preventDefault();
    menuSrc = this.getAttribute('href');
    $htmlBody.animate({
      scrollTop: $(menuSrc + ' h1').offset().top - 80
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