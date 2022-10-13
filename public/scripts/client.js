/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const loadTweets = function() {
    const url = '/tweets';
    const method = 'GET';
    $.ajax({ url, method }).done((tweets) => {
      sortTweets(tweets);
      renderTweets(tweets);
    });
  };
  loadTweets();

  $('form.compose').on('submit', function(event) {
    event.preventDefault();
    const $newTweet = $('#new-tweet');
    const $textArea = $('#new-tweet').find('textarea');
    const headerBottom = $('.page-header').height();

    if ($(document).scrollTop() > headerBottom) {
      $(document).scrollTop(headerBottom);
      $newTweet.slideDown();
      $textArea.trigger('focus');
      return;
    }
    if ($newTweet.is(':visible')) {
      $newTweet.slideUp();
      $textArea.trigger('blur');
      return;
    }
    $newTweet.slideDown();
    $textArea.trigger('focus');
  });

  $('#tweeter-logo').on('click', function(event) {
    event.preventDefault();
    location.reload();
  })
  
  $('#new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const $errorMessage = $(this).parent().children('.error-message');

    const data = $(this).serialize();
    const url = '/tweets';
    const method = 'POST';

    const $textArea = $(this).find('textarea');
    const tweetLen = $textArea.val().length;
    const maxTweetLength = 140;

    $errorMessage.slideUp(100);

    if (!tweetLen) {
      $errorMessage.text('Tweet cannot be empty!');
      $errorMessage.slideDown();
      return;
    }
    if (tweetLen > maxTweetLength) {
      $errorMessage.text(`Tweet cannot be more than ${maxTweetLength} characters!`);
      $errorMessage.slideDown();
      return;
    }

    $.ajax({ url, method, data }).done(tweet => {
      $textArea.val('').trigger('input');
      renderTweets([tweet], true);
    });
  });
});
