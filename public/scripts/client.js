/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const loadTweets = function(newestOnly) {
    const url = '/tweets';
    const method = 'GET';
    $.ajax({ url, method }).done((tweets) => {
      if (newestOnly) {
        renderTweets(tweets.slice(-1));
        return;
      }
      renderTweets(tweets);
    });
  };
  loadTweets();

  $('form.compose').submit(function(event) {
    event.preventDefault();
    $('#new-tweet').slideToggle();
    $('#new-tweet').find('textarea').focus();
  })
  
  $('#new-tweet form').submit(function(event) {
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

    $.ajax({ url, method, data }).done(() => {
      $textArea.val('').trigger('input');
      loadTweets(true);
    });
  });
});
