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
    })
  }
  loadTweets();
  
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const $errorMessage = $(this).parent().children('.error-message');

    const data = $(this).serialize();
    const url = '/tweets';
    const method = 'POST';

    const tweetText = data.slice('text='.length);
    const maxTweetLength = 140;

    $errorMessage.slideUp(100);

    if (!tweetText){
      $errorMessage.text('Tweet cannot be empty!');
      $errorMessage.slideDown();
      return;
    }
    if (tweetText.length > maxTweetLength) {
      $errorMessage.text(`Tweet cannot be more than ${maxTweetLength} characters!`);
      $errorMessage.slideDown();
      return;
    }

    $.ajax({ url, method, data }).done(() => {
      $(this)[0].reset();
      loadTweets(true);
    });
  })

  const renderTweets = function(tweets) {
    sortTweets(tweets);
    tweets.forEach(tweet => {
      $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
  };

  const sortTweets = function(tweets) {
    tweets.sort((a, b) => a.created_at - b.created_at)
  }

  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class='tweet'>`);
    const $tweetHeader = $(
      `<header>
        <div class="user">
          <img src="${tweet.user.avatars}">
          <p>${tweet.user.name}</p>
        </div>
        <p class="handle">${tweet.user.handle}</p>
      </header>`
    );
    const $tweetContent = $(`<p>`);
    $tweetContent.text(tweet.content.text);
    const $tweetFooter = $(
      `<footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <div class="likes">
            <i class="fa-solid fa-heart"></i>
            <p>1</p>
          </div>
        </div>
      </footer>`
    );
    
    $tweet.append($tweetHeader);
    $tweet.append($tweetContent);
    $tweet.append($tweetFooter);

    return $tweet;
  };
});
