// 가로 모드
$(function () {
    $(window).resize(function () {
        var wrapHeight = window.innerHeight;
        if (wrapHeight <= 300) { // 브라우저가 높이 300이하면 안의 기능들이 가로 정렬
            $('#wrap').addClass('cli-height')
            $('.carList, .tool, .carControll').addClass('borderNone');
            $('.carControll').addClass('carControllCenter')
        } else { // 그렇지 않으면 세로 정렬
            $('#wrap').removeClass('cli-height')
            $('.carList, .tool, .carControll').removeClass('borderNone');
        }
    })
})

function reservation() { // 차량번호 예약 함수
    // var carList = new Array();

    var carTextList = $('#carList').val(); // 차량 리스트 텍스트 전부 가져오기
    var carAs = carTextList.split('\n') // 줄바꿈 될때마다 배열에 추가
    console.log("carAs: " + carAs);
    var carList = new Array(); // json으로 바꿔줄 배열
    for (let i = 0; i < carAs.length; i++) {
        var data = new Object();
        data.carNum = carAs[i]

        carList.push(data) // carAs의 배열을 carList배열로 추가
    }
    console.log("carList: " + carList);
    carList = carList.filter(function (item) { //배열에 공백이 있으면 삭제
        console.log(item);
        return item !== null && item !== undefined && item !== '';
    })

    var jsonData = JSON.stringify(carList); //carList의 배열을 json으로 변환
    console.log(jsonData);

    $('#carList').val('')
}

// 텍스트 복사하기
function copy() {
    var text = $('#text'); //해당 텍스트 가져오기 (textarea)
    const pop = $('.pop'); // 복사 완료 알림창
    let content = text.val(); // textarea text가져오기

    // 텍스트가 300글자를 넘기면 복사가 안되게 한다
    if (content.length > 300) {/* 최대 글자수인 300을 넘겼을때 실행 */
        pop.find('p').text('텍스트가 300글자를 넘겼습니다') // 텍스트가 300글자가 넘어갔다고 팝업창으로 알려준다
        pop.stop().stop().stop().fadeIn(500)
    } else if (text.val().trim() == "") { // input창이 비어있는지 확인
        pop.find('p').text('텍스트를 작성하세요') // pop창 글자 변경
        pop.stop().stop().stop().fadeIn(500)
    } else {
        pop.find('p').text('클립보드에 저장됐습니다')
        text.select(); // textarea에 있는 text들을 가져오기
        document.execCommand('copy'); // 클립보드에 저장
        pop.stop().stop().stop().fadeIn(500); // 복사 완료 알림창
    }

    pop.fadeOut(500)
}

// textarea 공백 제거
function trimDel() {
    var text = $('#text').val().toString(); // 해당 텍스트 가져오기
    // text.trim();
    var newText = text.replace(/\s/g, ''); // textarea안에 있는 공백 없애기
    $('#text').val(newText) // 공백 없는 텍스트로 바꾸기

}

const color = $('.count>p').css('color', '#a7d0f6'); // 글자 수 색깔 지정

//공백 제거시 글자 수 실시간으로 바꾸기
function clickCount() {
    let content = $('#text').val(); // textarea text가져오기
    var content_len = content.length;

    var rbyte = 0;
    var one_char = "";

    for (var i = 0; i < content_len; i++) {
        one_char = content.charAt(i); // 한글이랑 그외 언어 글자 수(한글: 2, 그 외: 1)
        if (escape(one_char).length > 4) {
            rbyte += 2;
        } else {
            rbyte++;
        }
    }

    if (rbyte == 0 || content == '') { // 텍스트가 없을때
        $('.count>p>span').text('0자');
        $('.count>p').css('color', '#a7d0f6');
    } else if (rbyte > 300) {// 최대 글자수인 300을 넘겼을때 실행
        $('.count>p').css('color', 'red')
        $('.count>p>span').text(rbyte + '자');
    } else {
        $('.count>p>span').text(rbyte + '자');
        $('.count>p').css('color', '#a7d0f6');
    }
}

// 차량 반납 장소 입력창
function completion() {
    var pop = $('.pop')
    var carPop = $('.carControllPop') // 차량 반납 장소 입력 팝업창
    var carNum = $('#carNum').val();
    // console.log(carNum);
    if (carNum.length <= 3) { // 3자리 이하의 차량번호면 팝업창 띄우기
        pop.find('p').text("잘못된 차량 번호입니다");
        pop.stop().stop().stop().fadeIn(500);
    } else { // 잘 들어갔으면 아래 팝업창 띄우기
        carPop.find('p').text(carNum + "의 운행이 종료됩니다")
        carPop.show();
    }

    pop.fadeOut(500)

    $('#carNum').val('');
}
function isCarNumClose(){
    var pop = $('.pop')
    var carNum = $('#carNum').val();
    if (carNum.length <= 3) { // 3자리 이하의 차량번호면 팝업창 띄우기
        pop.find('p').text("잘못된 차량 번호입니다");
        pop.stop().stop().stop().fadeIn(500);
    }else{
        pop.find('p').text(carNum+"의 문이 닫힙니다.");
        pop.stop().stop().stop().fadeIn(500);
    }
    pop.fadeOut(500)
}
function isCarNumOpen() { // 문열기 차량 확인 함수
    var pop = $('.pop')
    var carNum = $('#carNum').val();
    if (carNum.length <= 3) { // 3자리 이하의 차량번호면 팝업창 띄우기
        pop.find('p').text("잘못된 차량 번호입니다");
        pop.stop().stop().stop().fadeIn(500);
    }else{
        pop.find('p').text(carNum+"의 문이 열립니다.");
        pop.stop().stop().stop().fadeIn(500);
    }
    pop.fadeOut(500)
}

function carCtrBtn() {
    var spotText = $('.carControllPop>input');
    var spotSendText = spotText.val();

    $(spotText).val('')
    console.log(spotSendText);
}

// 차량 팝업창 닫기 버튼 클릭시 이벤트
$('.carControllPop>a').on('click', function () {
    $(this).parent('.carControllPop').hide();
})

//textarea 내용 초기화
function Reset() {
    $('#text').val('');
}