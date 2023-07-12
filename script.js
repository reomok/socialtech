$(function() {
  $('.button-more').on('mouseover', function(){
    $(this).animate({
      opacity:0.5,
      marginLeft: 20,
    }, 100);
  });
  $('.button-more').on('mouseout', function() {
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0,
    }, 100);
  });

  // カルーセル
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });
// AjaxでSTATIC FORMSにデータを送信
$('#submit').on('click', function(event){

  event.preventDefault();

  let result = inputCheck();

  // エラー判定とメッセージを取得
  let error = result.error;
  let message = result.message;

  // エラーがなかったらフォームを送信する
  if (error == false) {

    $.ajax({
      url: 'https://api.staticforms.xyz/submit',
      type: 'POST',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function (result) {
        alert('お問い合わせを送信しました。')
      },
      error: function (xhr, resp, text) {
        alert('お問い合わせを送信できませんでした。')
      }
    })
  } else {
    alert(message);
  }
});
 
$('#name').blur(function(){
  inputCheck();
});

$('#furigana').blur(function(){
  inputCheck();
});

$('#email').blur(function(){
  inputCheck();
});

$('#phone').blur(function(){
  inputCheck();
});

$('#message').blur(function(){
  inputCheck();
});

$('#agree').click(function(){
  inputCheck();
});

  // お問い合わせフォームの入力チェック
  function inputCheck() {
    // エラーのチェック結果
    let result;
    // エラーメッセージのテキスト
    let message = '';

    // エラーがなければfalse,エラーがあればtrue
    let error = false;

    // お名前のチェック
    if　($('#name').val() == '') {

      // エラーあり
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      // エラーなし

      $('#name').css('background-color', '#fafafa');
        }

        // ふりがなのチェック
        if($('#furigana').val() == ''){

          $('#furigana').css('background-color', '#f79999');
          error = true;
          message += 'フリガナを入力してください。\n';
        } else {
          $('#furigana').css('background-color', '#fafafa');
        }

        if($('#message').val() == ''){

          $('#message').css('background-color', '#f79999');
          error = true;
          message += 'お問い合わせを入力してください。\n';
        } else {
          $('#message').css('background-color', '#fafafa');
        }

        // メールアドレスのチェック
        if($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {

          $('#email').css('background-color', '#f79999');
          error = true;
          message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
        } else {
          $('#email').css('background-color', '#fafafa');
        }

        // 電話番号のチェック（未入力はOK、未入力でない場合は-が必要）
     if ($('#phone').val() != '' && $('#phone').val().indexOf('-') == -1) {
      // エラーあり
      $('#phone').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      // エラーなし
      $('#phone').css('background-color', '#fafafa');
    }

    // 個人情報のチェック
    if($('#agree').prop('checked') == false) {
      error = true;
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    // エラーの有無で送信ボタンを切り替え
    if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    // オブジェクトでエラー判定とメッセージを返す
    result = {
      error: error,
      message: message
    }

    // 戻り値としてエラーがあるかどうかを返す
    return result;
  }
});