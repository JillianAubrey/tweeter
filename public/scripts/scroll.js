$(() => {
  // Listener for document scroll shows/hides the scroll-to-top button
  $(document).on('scroll', function(event) {
    const mainTop = $('main').offset().top;
    const navHeight = $('nav').height();
    const $scrollToTop = $('.scroll-to-top');
    if ($(document).scrollTop() + navHeight > mainTop) {
      $scrollToTop.show();
      return;
    }
    $scrollToTop.hide();
  });

  // Click action for the scroll-to-top button
  $('.scroll-to-top').on('click', function(event) {
    event.preventDefault();
    $(document).scrollTop(0);
  });
});