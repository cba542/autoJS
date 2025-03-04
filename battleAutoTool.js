// 請求無障礙服務權限
auto.waitFor();

var w = floaty.rawWindow(
    <frame bg="#FFFFFF" w="400" h="80" id="action" borderWidth="5dp" backgroundTint="#F44366">
        <vertical padding="1">
            <vertical>
                <horizontal>
                    <checkbox id="cb1" text="1"/>
                    <checkbox id="cb2" text="2"/>
                    <checkbox id="cb3" text="3"/>
                    <checkbox id="cb4" text="4"/>
                    <checkbox id="cb5" text="5"/>
                    <checkbox id="start" text="start"/>
                    <checkbox id="random" text="random"/>
                </horizontal>
                <horizontal>
                    <checkbox id="cb6" text="6"/>
                    <checkbox id="cb7" text="7"/>
                    <checkbox id="cb8" text="8"/>
                    <checkbox id="cb9" text="9"/>
                    <checkbox id="cb10" text="10"/>
                    <button id="exit" text="exit" w="60" h="40"/>
                </horizontal>
            </vertical>
        </vertical>
    </frame>
);

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

// 定義一個變量來存儲定時器
var checkTimer = null;

// 添加一個標誌來追踪是否正在執行點擊序列
var isClickingInProgress = false;

// 修改performSequentialClicks函數
function performSequentialClicks(enabledItems) {
    return new Promise((resolve) => {
        let i = 0;
        
        function clickNext() {
            if (i >= enabledItems.length) {
                isClickingInProgress = false;
                resolve();
                return;
            }
            
            let index = enabledItems[i];
            var startTime = new Date().getTime();
            console.log("index " + i + ", getTime: " + startTime);
            console.log("click x: " + gesturesList[index][0] + " click y: " + gesturesList[index][1]);
            
            click(gesturesList[index][0], gesturesList[index][1]);
            
            setTimeout(() => {
                i++;
                clickNext();
            }, 200 + Math.random() * 50);
        }
        
        clickNext();
    });
}

// 添加start checkbox的監聽事件
w.start.on("check", function(checked) {
    if (checked) {
        // 如果start被勾選，開始定時檢查
        checkTimer = setInterval(function() {

            // 如果正在執行點擊序列，則跳過這次檢查
            if (isClickingInProgress) {
                console.log("Previous click sequence still in progress, skipping...");
                return;
            }


            var enabledItems = [];
            
            // 檢查所有checkbox（1-10）
            for (var i = 1; i <= 10; i++) {
                if (w['cb' + i].checked) {

                    enabledItems.push(i-1); // 注意：數組索引從0開始，所以要減1
                }
            }
            
            // 如果有勾選的項目，則輸出
            if (enabledItems.length > 0) {
                if (w['random'].checked) {
                    enabledItems.sort(() => Math.random() - 0.5);
                }
                // 顯示當前順序
                toast("cat order: " + enabledItems.map(x => x+1).join(", "));
                
                // 設置標誌表示開始執行點擊序列
                isClickingInProgress = true;

                // 使用線程執行點擊序列
                threads.start(function() {
                    performSequentialClicks(enabledItems).then(() => {
                        console.log("All clicks completed");
                        isClickingInProgress = false;
                    });
                });

                console.log("item " + enabledItems.map(x => x+1).join(" ") + " enable");
            }
        }, (2000 + Math.random() * 200)); // 每2秒執行一次
    } else {
        // 如果start取消勾選，停止定時檢查
        if (checkTimer) {
            clearInterval(checkTimer);
            checkTimer = null;
        }
    }
});

// 添加exit按鈕的點擊事件處理
w.exit.click(function() {
    // 清除定時器
    if (checkTimer) {
        clearInterval(checkTimer);
    }
    // 關閉懸浮窗
    w.close();
    // 退出腳本
    exit();
});

// 設置懸浮窗可調整位置
w.setPosition(100, 100);

// 保持腳本運行
setInterval(() => {}, 1000);


//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

w.action.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = w.getX();
            windowY = w.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            w.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 2000) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
               // w.setAdjustEnabled(!w.isAdjustEnabled());
                if (windowX < 0) {
                    w.setPosition(0, windowY);
                }
                if (windowY < 0) {
                    w.setPosition(windowX, 0);
                }
            }
            return true;
    }
    return true;
});