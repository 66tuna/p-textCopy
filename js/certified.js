var url = "./index.html" // 메인 페지 url
$('.certified>.btn>button').on('click', function(){
    if($('.input-box>input').val() == "peoplecrw!!"){ // 인증코드 peoplecrw!!가 맞으면 메인페이지 이동
        $(location).attr('href', url);
    }else{ //그렇지 않으면 팝업창 띄우기
        $('.pop').fadeIn(800);
        $('.pop').fadeOut(800);
    }
});