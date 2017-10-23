(function() {
  var $productContent = $('#product-content');
  var nrProduct;
  $productContent.hide();
  
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
  
  // pokazywanie opisu produktu
  $('.product-hover').on('click', function() {
    nrProduct = parseInt((this.id).slice(-1));
    hideProducts(nrProduct);
    $('html, body').animate({
      scrollTop: $('#product' + nrProduct).offset().top - 80
    }, 500, 'swing');
  });
  
  // zwinięcie opisu produktu
  $('.btn-product').on('click', function(e) {
    e.preventDefault();
    $productContent.slideUp();
    $('html, body').animate({
      scrollTop: 0
    }, 500, 'swing');
  });

  hideProducts();
  if ($(window).outerWidth(true) < 900)
    $productContent.prepend('<br><br>');
  
})();