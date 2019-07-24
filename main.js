let status = 0; // 0:待機中 1:作業中 2:休憩中
let minite = 25;
let second = 0;
let pomodoroCount = 0
let settedIntervalTimer
//頭に宣言してる方法は保守上あまりよくない気がする
let startBtn = document.getElementById("startButton");
let timerLabel = document.getElementById('timer');
let statusLabel = document.getElementById('status');

startBtn.onclick = function(){
    switch(status){
        case 0: //待機中から作業中へ
            startBtn.innerText = 'RESET';
            statusLabel.innerText = '作業を行ってください';
            status = 1;
            settedIntervalTimer = setInterval('tiktak()',1000);

            break;
        default: //作業中から待機中へ
            clearInterval(settedIntervalTimer);
            startBtn.innerText = 'START';
            statusLabel.innerText = '待機中...';
            status = 0;
            minite = 25;
            second = 0;
            updateTimerText();
            break;
    }
};

//きたない
let tiktak = function(){
    if (second <= 0) {
        if (minite == 0){
            switchActRest();
        } else {
            minite--;
            second = 59;
        }
    } else {
        second--;
    }
    console.log(minite);
    console.log(second);
    updateTimerText();
}

let switchActRest = function(){
    switch(status){
        case 1: //作業中から休憩へ
            status = 2;
            if (pomodoroCount >= 3){
                minite = 30;
                pomodoroCount = 0;
            } else {
                minite = 5;
                pomodoroCount++;
            }
            statusLabel.innerText = '休憩してください';
            break;
        case 2: //休憩から作業中へ
            status = 1;
            minite = 25;
            statusLabel.innerText = '作業を行ってください';
            break;
    }
}

let zeroPadding = function(num,length){
    return ('0000000000' + num).slice(-length);
}

let updateTimerText = function(){
    timerLabel.innerText = `${zeroPadding(minite,2)}:${zeroPadding(second,2)}`;
}