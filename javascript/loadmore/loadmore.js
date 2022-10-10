$(function () {
  var content = $('.content');
  var loadMoreBtn = $('#loadMore');
  var backToTopBtn = $('a[href="#top"]');

  content.addClass('contentHide');
  content.slice(0, 4).show();

  loadMoreBtn.on('click', function (e) {
    var contentHide = $(".content:hidden");
    e.preventDefault();
    contentHide.slice(0, 4).slideDown();

    if (contentHide.length === 0) {
      loadMoreBtn.fadeOut('slow');
    }

    $('html,body').animate({
      scrollTop: $(this).offset().top
    }, 1000);

  });

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.totop a').fadeIn();
    } else {
      $('.totop a').fadeOut();
    }

  });

  backToTopBtn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 300);
  });

});
