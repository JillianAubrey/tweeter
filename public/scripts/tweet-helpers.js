const renderTweets = function(tweets, slideIn) {
  sortTweets(tweets);
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
    if (slideIn) {
      $tweet.hide();
      $tweet.slideDown();
    }
  });

  //attach timeago to tweet times
  $('time.timeago').timeago();
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
  const isoDate = new Date(tweet.created_at).toISOString();
  const $tweetFooter = $(
    `<footer>
      <time class="timeago" datetime="${isoDate}">${isoDate}</time>
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