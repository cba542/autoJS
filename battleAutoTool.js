"auto";

toast("程序Start");

// Enable list controls which gestures are executed
var enableList = [
    0,
    1,
   2,
   3,
  4,
    5,
    6,
    7,
    8,
   9,
];

events.observeKey();// 监听按键事件
var delayBetweenTask = Math.random() * 200;// 任务执行间隔时间，单位为毫秒
var delayBetweenCat = 110 + Math.random() * 20;
var pressTime = 10 * Math.random();

var task = task1;// 默认任务为task1
var isRunning = false; // 当前是否正在执行
var timerId = null; // 定时器ID

// 当音量上键按下时触发回调函数
events.onKeyDown("volume_down", function(event) {
    if (isRunning) {
        // 如果正在运行，暂停
        clearTimeout(timerId);
        isRunning = false;
        toast("已暂停");
    } else {
        // 如果未运行，开始执行
        isRunning = true;
        task();
        toast("开始执行");
    }
});

// 当音量下键按下时触发回调函数
events.onKeyDown("volume_up", function(event) {
    toast("程序结束");
    exit();
});

function task1() {
    if (!isRunning) return;
    
    
    // 将所有坐标点整合到一个数组中
    const gesturesList = [
        [730, 851],
        [957, 843],
        [1198, 847],
        [1422, 841],
        [1632, 830],
        [730, 760 + 166],
        [957, 760 + 166],
        [1198, 760 + 166],
        [1422, 760 + 166],
        [1632, 760 + 166]
    ];

    
    // 创建启用手势的索引数组
    var enabledIndexes = [];
    for(let i=0;i<gesturesList.length;i++) {
        if (enableList.indexOf(i) !== -1) {
            enabledIndexes.push(i);
        }
    }
    
    // 打乱顺序
    //enabledIndexes.sort(() => Math.random() - 0.5);
    
    // 显示当前顺序
    toast("cat order: " + enabledIndexes.join(", "));
    
    // 按随机顺序执行手势
    for(let i=0;i<enabledIndexes.length;i++) {
        if (!isRunning) break;
        let index = enabledIndexes[i];
        click(gesturesList[index][0], gesturesList[index][1]);
        sleep(delayBetweenCat);
    }
    
    if (isRunning) {
        timerId = setTimeout(task, delayBetweenTask);
    }
}

function task2() {
    // 保留task2空实现
}



