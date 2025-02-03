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
    // var gesturesAry=[[[0,51,[150,421],[150,421]]],[[0,51,[413,397],[413,397]]]];
    // for(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(400);}

    // var gesturesAry=[ [[0,101,[730,851],[730,851],[730,851]]],[[0,101,[957,843],[957,843],[957,843]]],[[0,101,[1198,847],[1198,847],[1198,847]]],[[0,101,[1422,841],[1422,841],[1422,841]]],[[0,101,[1632,830],[1632,830],[1632,830]]],[[0,101,[740,685],[740,685],[740,685]]]];
    // for(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(400);}
    var cat1 = [[0,101,[730,851],[730,851],[730,851]]];
    var cat2 = [[0,101,[957,843],[957,843],[957,843]]];
    var cat3 = [[0,101,[1198,847],[1198,847],[1198,847]]];
    var cat4 = [[0,101,[1422,841],[1422,841],[1422,841]]];
    var cat5 = [[0,101,[1632,830],[1632,830],[1632,830]]];
    var cat6 = [[0,101,[730,851+166],[730,851+166],[730,851+166]]];
    var cat7 = [[0,101,[957,843+166],[957,843+166],[957,843+166]]];
    var cat8 = [[0,101,[1198,847+166],[1198,847+166],[1198,847+166]]];
    var cat9 = [[0,101,[1422,841+166],[1422,841+166],[1422,841+166]]];
    var cat10 = [[0,101,[1632,830+166],[1632,830+166],[1632,830+166]]];
    
    var gesturesList = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10];
    for(let i=0;i<gesturesList.length;i++){gestures.apply(null, gesturesList[i]);sleep(200 + Math.random() * 400);}
    setTimeout(task, interval);
}
function task2() {
    toast("任务2运行中，音量下键结束，音量上键切换任务");
    // var gesturesAry=[[[0,51,[150,421],[150,421]]],[[0,51,[413,397],[413,397]]]];
    // for(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(400);}
    var cat1 = [[0,101,[730,851],[730,851],[730,851]]];
    var cat2 = [[0,101,[957,843],[957,843],[957,843]]];
    var cat3 = [[0,101,[1198,847],[1198,847],[1198,847]]];
    var cat4 = [[0,101,[1422,841],[1422,841],[1422,841]]];
    var cat5 = [[0,101,[1632,830],[1632,830],[1632,830]]];
    var cat6 = [[0,101,[730,851+166],[730,851+166],[730,851+166]]];
    var cat7 = [[0,101,[957,843+166],[957,843+166],[957,843+166]]];
    var cat8 = [[0,101,[1198,847+166],[1198,847+166],[1198,847+166]]];
    var cat9 = [[0,101,[1422,841+166],[1422,841+166],[1422,841+166]]];
    var cat10 = [[0,101,[1632,830+166],[1632,830+166],[1632,830+166]]];
    
    var gesturesList = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10];
    for(let i=0;i<gesturesList.length;i++){gestures.apply(null, gesturesList[i]);sleep(200 + Math.random() * 400);}
    setTimeout(task, interval);
}
