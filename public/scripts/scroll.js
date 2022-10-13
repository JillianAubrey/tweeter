$(() => {
  $(document).on('scroll', function(event) {
    const mainTop = $('main').offset().top;
    const $scrollToTop = $('.scroll-to-top');
    if ($(document).scrollTop() > mainTop) {
      $scrollToTop.show();
      return;
    }
    $scrollToTop.hide();
  });

  $('.scroll-to-top').on('click', function(event) {
    event.preventDefault();
    $(document).scrollTop(0);
  });
});