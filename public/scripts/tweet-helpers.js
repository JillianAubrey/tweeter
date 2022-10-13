const renderTweets = function(tweets) {
  sortTweets(tweets);
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  });
};

const sortTweets = function(tweets) {
  tweets.sort((a, b) => a.created_at - b.created_at);
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