// Request screen capture permission first
if (!requestScreenCapture()) {
    toastLog("Screen capture permission denied");
    exit();
}

var u = floaty.rawWindow(
    <frame id="view" bg="#00000000" />
);
u.setSize(-1, -1);
setInterval(() => { }, 1000);

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
                return true;
            }
            
            var color = images.pixel(screenCapture, x, y);
            
            // Extract RGB values
            var red = (color >> 16) & 0xFF;
            var green = (color >> 8) & 0xFF;
            var blue = color & 0xFF;
            
            // Log coordinates and RGB values
            toastLog("Coordinates: " + x + "," + y + 
                     "\nColor RGB: (" + red + "," + green + "," + blue + ")");
        } catch (e) {
            toastLog("Error: " + e);
        }
        
        return true;
    }
    return true;
});

//TODO
//2173,35
//243,190,26