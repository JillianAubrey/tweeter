/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const loadTweets = function() {
    const url = '/tweets';
    const method = 'GET';
    $.ajax({ url, method }).done((tweets) => {
      renderTweets(tweets);
    })
  }
  loadTweets();
  
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const url = '/tweets';
    const method = 'POST';
    const tweetText = data.slice('text='.length);
    const maxTweetLength = 140;
    if (!tweetText){
      return alert('Tweet cannot be empty!');
    }
    if (tweetText.length > maxTweetLength) {
      return alert(`Tweet cannot be more than ${maxTweetLength} characters!`);
    }
    $.ajax({ url, method, data }).done(() => {
      $(this)[0].reset();
      $('#tweets-container').text('');
      loadTweets();
    });
  })

  const renderTweets = function(tweets) {
    sortTweets(tweets);
    tweets.forEach(tweet => {
      $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    });
  };

  const sortTweets = function(tweets) {
    tweets.sort((a, b) => b.created_at - a.created_at)
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
