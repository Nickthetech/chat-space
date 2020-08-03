$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-message" data-message-id=${message.id}>
          <div class="chat-message-top">
            <div class="chat-message-top__name">
              ${message.user_name}
            </div>
            <div class="chat-message-top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-message-bottom">
            <p class="chat-message-bottom__content">
              ${message.content}
            </p>
            <img class="chat-message-bottom__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="chat-message" data-message-id=${message.id}>
          <div class="chat-message-top">
            <div class="chat-message-top__name">
              ${message.user_name}
            </div>
            <div class="chat-message-top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-message-bottom">
            <p class="chat-message-bottom__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  
  $(".Form").on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.Form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});