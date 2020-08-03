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

  let reloadMessages = function() {
    let last_message_id = $('.chat-message:last').data("message-id") || 0;
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});