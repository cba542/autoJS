"auto";
events.observeKey();// 监听按键事件
var interval = 5000;// 任务执行间隔时间，单位为毫秒
var task = task1;// 默认任务为task1
// 当音量上键按下时触发回调函数
events.onKeyDown("volume_up", function(event) {
    if (task == task1) {
        task = task2;
    } else {
        task = task1;
    }
    toast("任务已切换");
});
// 当音量下键按下时触发回调函数
events.onKeyDown("volume_down", function(event) {
    toast("程序结束");
    exit();
});
task();
function task1() {
    toast("任务1运行中，音量下键结束，音量上键切换任务");
    var gesturesAry=[[[0,51,[150,421],[150,421]]],[[0,51,[413,397],[413,397]]]];
    for(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(400);}
    setTimeout(task, interval);
}
function task2() {
    toast("任务2运行中，音量下键结束，音量上键切换任务");
    var gesturesAry=[[[0,51,[150,421],[150,421]]],[[0,51,[413,397],[413,397]]]];
    for(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(400);}
    setTimeout(task, interval);
}