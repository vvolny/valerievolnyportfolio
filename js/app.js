$(function() {
  $('#commentform').submit(handleSubmit);
});
unction handleSubmit() {
  var form = $(this);
  var data = {
    "comment_author": form.find('#comment_author').val(),
    "email": form.find('#email').val(),
    "comment": form.find('#comment').val(),
    "comment_post_ID": form.find('#comment_post_ID').val()
  };

  postComment(data);

  return false;
}

function postComment(data) {
  // send the data to the server
}

function postComment(data) {
  $.ajax({
    type: 'POST',
    url: 'post_comment.php',
    data: data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    success: postSuccess,
    error: postError
  });
}

function postSuccess(data, textStatus, jqXHR) {
  // add comment to UI
}

function postError(jqXHR, textStatus, errorThrown) {
  // display error
}

function postSuccess(data, textStatus, jqXHR) {
  $('#commentform').get(0).reset();
  displayComment(data);
}
  
function displayComment(data) {
  var commentHtml = createComment(data);
  var commentEl = $(commentHtml);
  commentEl.hide();
  var postsList = $('#posts-list');
  postsList.addClass('has-comments');
  postsList.prepend(commentEl);
  commentEl.slideDown();
}

function createComment(data) {
  var html = '' +
  '<li><article id="' + data.id + '" class="hentry">' +
    '<footer class="post-info">' +
      '<abbr class="published" title="' + data.date + '">' +
        parseDisplayDate(data.date) +
      '</abbr>' +
      '<address class="vcard author">' +
        'By <a class="url fn" href="#">' + data.comment_author + '</a>' +
      '</address>' +
    '</footer>' +
    '<div class="entry-content">' +
      '<p>' + data.comment + '</p>' +
    '</div>' +
  '</article></li>';

  return html;
}

function parseDisplayDate(date) {
  date = (date instanceof Date? date : new Date( Date.parse(date) ) );
  var display = date.getDate() + ' ' +
                ['January', 'February', 'March',
                 'April', 'May', 'June', 'July',
                 'August', 'September', 'October',
                 'November', 'December'][date.getMonth()] + ' ' +
                date.getFullYear();
  return display;
}