$(document).ready(function() {
  // Updates tweet character counter when user inputs into new-tweet form
  const maxTweetLen = 140;
  $('#tweet-text').on('input', function() {
    const tweetLen = $(this).val().length;
    const $counter = $(this).parent().find('output');
    $counter.text(maxTweetLen - tweetLen);
    if (tweetLen > maxTweetLen) {
      return $counter.addClass('negative');
    }
    $counter.removeClass('negative');
  });
});