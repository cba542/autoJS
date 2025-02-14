// Request screen capture permission first
// adb command to setting unit always allow screen capture perssion for autoJS
// adb shell appops set org.autojs.autojs PROJECT_MEDIA allow 
if (!requestScreenCapture()) {
    toastLog("Screen capture permission denied");
    exit();
}

var u = floaty.rawWindow(
    <frame id="view" bg="#00000000" />
);
u.setSize(-1, -1);
setInterval(() => { }, 1000);


var rotation = context.getResources().getConfiguration().orientation;
console.log("rotation: " + rotation);
// 根据旋转角度调整坐标
var adjustCoordinates = function(x, y, width, height) {

    switch(rotation) {
        case 2: // 横屏反转
            return { x: height - y, y: x };
        case 1: // 竖屏
            return { x: x, y: y };
        case 0: // 横屏
            return { x: y, y: width - x };
        default:
            return { x: x, y: y };
    }
};

u.view.setOnTouchListener(function (v, t) {


    if (t.getAction() == t.ACTION_DOWN) {
        // Get coordinates
        var x = Math.floor(t.getRawX());
        var y = Math.floor(t.getRawY());
        
        try {
            // Capture screen to get color at the point
            var screenCapture = captureScreen();
            
            // Validate coordinates
            if (x < 0 || y < 0 || x >= screenCapture.getWidth() || y >= screenCapture.getHeight()) {
                toastLog("Coordinates out of screen bounds: " + x + "," + y);
                console.log("Screen capture Width:" + screenCapture.getWidth() + "Screen capture Height:" + screenCapture.getHeight());
                return true;
            }
            
            //Test1++
            // // 获取屏幕的实际宽高
            // var captureWidth = screenCapture.getWidth();
            // var captureHeight = screenCapture.getHeight();

            // // 如果宽高不符合预期，交换x和y
            // var adjustedX = captureWidth == 1080 ? y : x;
            // var adjustedY = captureWidth == 1080 ? x : y;

            // // 验证调整后的坐标
            // if (adjustedX < 0 || adjustedY < 0 || 
            //     adjustedX >= captureWidth || adjustedY >= captureHeight) {
            //     toastLog("调整后坐标仍然越界: " + adjustedX + "," + adjustedY);
            //     return true;
            // }
            //Test1--

            //Test2++
            // var captureWidth = screenCapture.getWidth();
            // var captureHeight = screenCapture.getHeight();
            
            // var adjusted = adjustCoordinates(x, y, captureWidth, captureHeight);
            
            // // 验证坐标
            // if (adjusted.x < 0 || adjusted.y < 0 || 
            //     adjusted.x >= captureWidth || adjusted.y >= captureHeight) {
            //     toastLog("调整后坐标越界: " + adjusted.x + "," + adjusted.y);
            //     return true;
            // }
            //Test2--
            
            var color = images.pixel(screenCapture, x, y);
            
            // Extract RGB values
            var red = (color >> 16) & 0xFF;
            var green = (color >> 8) & 0xFF;
            var blue = color & 0xFF;
            
            // Log coordinates and RGB values
            toastLog("Coordinates: " + x + "," + y + 
                     "\nColor RGB: (" + red + "," + green + "," + blue + ")");
                
            console.log("Coordinates: " + x + "," + y + 
                    "\nColor RGB: (" + red + "," + green + "," + blue + ")");

        } catch (e) {
            toastLog("Error: " + e);
        }
        
        return true;
    }
    return true;
});

