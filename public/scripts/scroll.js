$(() => {
  $(document).on('scroll', function(event) {
    const headerBottom = $('.page-header').height();
    const $scrollToTop = $('.scroll-to-top');
    if ($(document).scrollTop() > headerBottom) {
      $scrollToTop.show();
      return;
    }
    $scrollToTop.hide();
  })

  $('.scroll-to-top').on('click', function (event) {
    event.preventDefault();
    $(document).scrollTop(0);
  })
})