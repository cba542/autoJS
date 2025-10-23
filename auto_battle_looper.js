// Request screen capture permission first
if (!requestScreenCapture()) {
    toastLog("Screen capture permission denied");
    exit();
}

var u = floaty.rawWindow(
    <frame id="view" bg="#00000000" />
);

"auto";

toast("程序Start, volumn down 開始運行");

//common variable
events.observeKey();// 监听按键事件
var delayBetweenTask = Math.random() * 200;// 任务执行间隔时间，单位为毫秒
var currentLoopCount = 0;
var task = task1;// 默认任务为task1
var isRunning = false; // 当前是否正在执行
var timerId = null; // 定时器ID

const LEVEL_CONFIGS = {
    "1": {
        name: "item1",
        loopCount: 3,
        enableList: [1, 5, 6],
        delayBetweenCat: 2000,
        upgradeToLevel2: false,
        // battleTime: 50,
        battleTime: 50,
        delayAfterFight: 3000
    },
    "2": {
        name: "item2",
        loopCount: 5,
        enableList: [5],
        delayBetweenCat: 1500,
        upgradeToLevel2: false,
        battleTime: 5,
        delayAfterFight: 3000
    },
    "3": {
        name: "item3",
        loopCount: 9,
        enableList: [5, 6, 7, 8],
        delayBetweenCat: 2000,
        upgradeToLevel2: false,
        battleTime: 60,
        delayAfterFight: 3000
    },
    "4": {
        name: "item4",
        loopCount: 3,
        enableList: [2, 3, 4, 5, 6, 7, 8, 9],
        delayBetweenCat: 1600,
        upgradeToLevel2: true,
        battleTime: 156,
        delayAfterFight: 3000
    },
    "5": {
        name: "item5",
        loopCount: 40,
        enableList: [1, 5, 6],
        delayBetweenCat: 1000,
        upgradeToLevel2: false,
        battleTime: 75,
        delayAfterFight: 3000
    },
    "6": {
        name: "item6",
        loopCount: 10,
        enableList: [1, 3, 4, 5, 6, 7, 8, 9],
        delayBetweenCat: 2000,
        upgradeToLevel2: true,
        battleTime: 190,
        delayAfterFight: 8000,
        recovery: true,
    },
    "7": {
        name: "item7_券",
        loopCount: 10,
        enableList: [5, 6,7, 8, 9],
        delayBetweenCat: 1000,
        upgradeToLevel2: false,
        battleTime: 50,
        delayAfterFight: 3000,
        recovery: true,
    },
    "8": {
        name: "item8",
        loopCount: 3,
        enableList: [2, 3, 4, 5, 6, 7, 8, 9],
        //enableList: [5, 6, 7, 8],
        delayBetweenCat: 2000,
        upgradeToLevel2: true,
        battleTime: 85,
        // battleTime: 15,
        delayAfterFight: 2000,
        recovery: true,
    }    
};

// Select the current level configuration here
const CURRENT_LEVEL = "7"; // 改這裡就可以切換關卡
const config = LEVEL_CONFIGS[CURRENT_LEVEL];

// 当音量上键按下时触发回调函数
events.onKeyDown("volume_down", function(event) {
    if (isRunning) {
        // 如果正在运行，暂停
        clearTimeout(timerId);
        isRunning = false;
        toast("已暂停");
    } else {
        // 如果未运行，开始执行｛
        isRunning = true;
        toast("开始执行");
        task();
    }
});

// 当音量下键按下时触发回调函数
events.onKeyDown("volume_up", function(event) {
    toast("程序结束");
    exit();
});

function task1() {
    console.log("currentLoopCount:"+currentLoopCount)
    console.log("loopCount:"+config.loopCount);
    // if (currentLoopCount == config.loopCount) {
    //     console.log("reach loop count, exit");
    //     exit();
    // };

    //點選開始戰鬥
    //Sleep x second 等待進入戰鬥畫面
    click(1850.875, 700.5);
    sleep(500);

    if (config.recovery) {
        console.log("enable clcik");
        // click(1937,638);
        // sleep(2000);
        click(893,690);
        sleep(500);
        //點選開始戰鬥
        click(1850.875, 700.5);
        sleep(500);
    }
    
    // 開始運行, 宣告計時器 timer = 0
    var timer = 0;
    var startTime = new Date().getTime();

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

    var money10 = [85.5,903.875];
    // var gesturesList = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10];
    // 创建启用手势的索引数组
    var enabledIndexes = [];
    for(let i=0;i<gesturesList.length;i++) {
        if (config.enableList.indexOf(i) !== -1) {
            enabledIndexes.push(i);
        }
    }
    
    itemNumber = enabledIndexes;

    if (config.upgradeToLevel2){
        //升級錢包1
        if (!isRunning) return;
        sleep(9000)
        // gestures.apply(null, money10);
        click(money10[0],money10[1]);
        //升級錢包2
        if (!isRunning) return;
        sleep(6000)
        // gestures.apply(null, money10);
        click(money10[0],money10[1]);
        click(money10[0],money10[1]);//seems there is bug, need this to W/A
    }

    // 按随机顺序执行手势
    while(1){
        // 打乱顺序
        enabledIndexes.sort(() => Math.random() - 0.5);
        
        for(let i=0;i<itemNumber.length;i++) {

            if (!isRunning) break;
            let index = enabledIndexes[i];
            // gestures.apply(null, gesturesList[index]);
            click(gesturesList[index][0], gesturesList[index][1]);
            sleep(100 + Math.random() * 200);
            
        }
        sleep(config.delayBetweenCat);
        // 更新計時器
        timer = (new Date().getTime() - startTime) / 1000;

        // 檢查計時器是否達到x秒
        if (timer >= config.battleTime) {
            break;
        }

        if (!isRunning) return;
        console.log("sec:" + timer +"/"+ config.battleTime + " loop: " + currentLoopCount + "/" + config.loopCount);
        toast("sec:" + timer +"/"+ config.battleTime + " loop: " + currentLoopCount + "/" + config.loopCount);

        // 右下角
        // 00:24:30.400/D: Coordinates: 1981,1010
        // Color RGB: (219,164,13)

        // map color
        // 0:25:10.996/D: Coordinates: 2197,61
        // Color RGB: (184,144,81)

// 18:08:51.013/D: === 點 1 ===
// 坐標: (1981, 1010)
// RGB: (171, 126, 0)
// HEX: #AB7E00
// 18:08:51.531/D: === 點 2 ===
// 坐標: (2197, 61)
// RGB: (186, 138, 48)
// HEX: #BA8A30


        if (screenRecongize(1981, 1010, 171, 126, 0) && screenRecongize(2197, 61, 186, 138, 48)){
            console.log("found RGB");
            toast("found RGB");
            break;
        }
    }

    currentLoopCount = currentLoopCount + 1;
    if (currentLoopCount == config.loopCount) {
        //點選地圖回到開始戰鬥畫面
        // toast("click map");
        console.log("reach loop count, click map and exit")
        click(2209.5, 42.875);
        exit();
    };

    endTask();

    if (isRunning) {
        timerId = setTimeout(task, 1000);
    }
    
}

function task2() {
    // 保留task2空实现
}

function endTask() {
    //開始結束 點選地圖回到畫面

    //等待戰鬥結束
    toast("pedning flight end");
    if (!isRunning) return;
    sleep(config.delayAfterFight);

    //發現道具 點選畫面
    toast("click screen1");
    click(730, 851);
    if (!isRunning) return;
    sleep(1000);

    //如果發現地圖, 再次點選
    toast("click screen2");
    click(730, 851);
    // if (!isRunning) return;
    sleep(1000);

    //點選地圖回到開始戰鬥畫面
    toast("click map");
    click(2209.5, 42.875);
    if (!isRunning) return;
    sleep(2000);

    // if (config.recovery) {
    //     console.log("enable clcik");
    //     click(1937,638);
    //     sleep(2000);
    //     click(893,690);
    // }

}

function screenRecongize(x, y, r, g, b) {
    //TODO
    // 22:58:25.150/D: Coordinates: 2165,38
    // Color RGB: (236,183,18)
    
    // 23:00:28.591/D: Coordinates: 2198,1000
    // Color RGB: (211,159,12)
    
        try {
            // Capture screen to get color at the point
            var screenCapture = captureScreen();
            
            // Validate coordinates
            if (x < 0 || y < 0 || x >= screenCapture.getWidth() || y >= screenCapture.getHeight()) {
                toastLog("Coordinates out of screen bounds: " + x + "," + y);
                return true;
            }
            
            var color = images.pixel(screenCapture, x, y);
            
            // Extract RGB values
            var red = (color >> 16) & 0xFF;
            var green = (color >> 8) & 0xFF;
            var blue = color & 0xFF;
            
            // Log coordinates and RGB values
            // toastLog("Coordinates: " + x + "," + y + 
            //          "\nColor RGB: (" + red + "," + green + "," + blue + ")");
    
            // console.log("Coordinates: " + x + "," + y + 
            // "\nColor RGB: (" + red + "," + green + "," + blue + ")");

        } catch (e) {
            toastLog("Error: " + e);
            console.log("Error: " + e);
        }

        if(red == r && green == g && blue == b){
            // console.log("RGB correct");
            return true;
        }else{
            // console.log("RGB incorrect");
            return false;
        }
    
        
    
}










