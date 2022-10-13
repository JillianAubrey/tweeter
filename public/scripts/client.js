/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const url = '/tweets';
    const method = 'POST';
    $.ajax({ url, method, data, }).done(() => {
      console.log('Form posted!');
    });
  })

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    });
  };

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
   
  renderTweets(data);
});
