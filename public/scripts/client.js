$(() => {
  // Loads tweets from server, called immediately after declaration
  const loadTweets = function() {
    const url = '/tweets';
    const method = 'GET';
    $.ajax({ url, method })
      .done(tweets => {
        sortTweets(tweets);
        renderTweets(tweets);
      })
      .catch(error => console.log(error));
  };
  loadTweets();

  // Submit action for compose button in nav bar, hides/unhides new-tweet form
  $('form.compose').on('submit', function(event) {
    event.preventDefault();
    const $newTweet = $('#new-tweet');
    const $textArea = $('#new-tweet').find('textarea');
    const mainTop = $('main').offset().top;
    const navHeight = $('nav').height();

    if ($(document).scrollTop() + navHeight > mainTop) {
      $(document).scrollTop(mainTop - navHeight);
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

  // Click action for tweeter-logo, refreshses the page
  $('#tweeter-logo').on('click', function(event) {
    event.preventDefault();
    location.reload();
  });
  
  // Click action for new-tweet form. Checks for valid input, posts to server, then renders new tweet
  $('#new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const $errorMessage = $(this).parent().children('.error-message');

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

    const data = $(this).serialize();
    const url = '/tweets';
    const method = 'POST';

    $.ajax({ url, method, data })
      .done(tweet => {
        $textArea.val('').trigger('input');
        renderTweets([tweet], true);
      })
      .catch(error => console.log(error));
  });
});
