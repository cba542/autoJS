// Request Accessibility
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

// Coordinates
const gesturesList = [
    [730, 851],
    [957, 843],
    [1198, 847],
    [1422, 841],
    [1632, 830],
    [730, 926],
    [957, 926],
    [1198, 926],
    [1422, 926],
    [1632, 926]
];

// Timing parameters (tweak here if still miss)
const CLICK_DOWN_MS_MIN = 80;    // press hold duration min
const CLICK_DOWN_MS_MAX = 120;   // press hold duration max
const BETWEEN_CLICKS_MS_MIN = 160; // delay between single clicks min
const BETWEEN_CLICKS_MS_MAX = 240; // delay between single clicks max
const BETWEEN_CYCLES_MS = 600;     // delay between full cycles

var worker = null;
var stopRequested = false;

// Safe random int
function randInt(a, b) {
    return Math.floor(a + Math.random() * (b - a + 1));
}

// Read UI state safely from UI thread
function getSnapshot() {
    var CountDownLatch = java.util.concurrent.CountDownLatch;
    var latch = new CountDownLatch(1);
    var snapshot = { items: [], random: false, startChecked: false };

    ui.run(function () {
        try {
            var items = [];
            for (var i = 1; i <= 10; i++) {
                if (w["cb" + i].checked) items.push(i - 1);
            }
            snapshot.items = items;
            snapshot.random = w.random.checked;
            snapshot.startChecked = w.start.checked;
        } finally {
            latch.countDown();
        }
    });

    latch.await();
    return snapshot;
}

// Toggle floaty touchable to avoid intercept during clicking
function setWindowTouchable(touchable) {
    ui.run(function () {
        try { w.setTouchable(touchable); } catch (e) { /* ignore */ }
    });
}

// Perform one full pass of clicks (synchronous, in worker thread)
function performSequentialClicksSync(enabledItems) {
    for (var i = 0; i < enabledItems.length; i++) {
        if (stopRequested) return;
        var idx = enabledItems[i];
        var x = gesturesList[idx][0];
        var y = gesturesList[idx][1];

        console.log("Press index " + (idx + 1) + " at (" + x + ", " + y + ")");
        // Use press with a short hold to increase reliability vs click()
        press(x, y, randInt(CLICK_DOWN_MS_MIN, CLICK_DOWN_MS_MAX));

        sleep(randInt(BETWEEN_CLICKS_MS_MIN, BETWEEN_CLICKS_MS_MAX));
    }
}

// Main loop running in a single worker thread
function startWorkerLoop() {
    if (worker && worker.isAlive()) {
        console.log("Worker already running.");
        return;
    }
    stopRequested = false;

    worker = threads.start(function () {
        console.log("Worker started.");
        while (!stopRequested) {
            var snap = getSnapshot();
            if (!snap.startChecked) {
                // Not started, wait and check again
                sleep(400);
                continue;
            }

            var items = snap.items.slice();
            if (items.length === 0) {
                // Nothing selected
                sleep(400);
                continue;
            }

            if (snap.random) {
                // Fisher-Yates shuffle
                for (var i = items.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var tmp = items[i];
                    items[i] = items[j];
                    items[j] = tmp;
                }
            }

            console.log("Cycle order: " + items.map(function (v) { return v + 1; }).join(", "));

            // Avoid floaty intercept during press
            setWindowTouchable(false);
            try {
                performSequentialClicksSync(items);
            } finally {
                setWindowTouchable(true);
            }

            if (stopRequested) break;
            sleep(BETWEEN_CYCLES_MS);
        }
        console.log("Worker stopped.");
    });
}

// Start checkbox handler
w.start.on("check", function (checked) {
    if (checked) {
        startWorkerLoop();
    } else {
        stopRequested = true;
    }
});

// Exit button
w.exit.click(function () {
    stopRequested = true;
    try { if (worker) worker.interrupt(); } catch (e) {}
    w.close();
    exit();
});

// Allow moving the floaty window
w.setPosition(100, 100);
setInterval(function () {}, 100);

// Drag to move / long-press to exit
var x = 0, y = 0, windowX, windowY, downTime;
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
            w.setPosition(windowX + (event.getRawX() - x), windowY + (event.getRawY() - y));
            if (new Date().getTime() - downTime > 2000) exit();
            return true;
        case event.ACTION_UP:
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                if (windowX < 0) w.setPosition(0, windowY);
                if (windowY < 0) w.setPosition(windowX, 0);
            }
            return true;
    }
    return true;
});
