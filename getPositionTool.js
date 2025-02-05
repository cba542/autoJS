var u = floaty.rawWindow(
    <frame id="view" bg="#00000000" />
);
u.setSize(-1, -1);
setInterval(() => { }, 1000);
u.view.setOnTouchListener(function (v, t) {
    if (t.getAction() == t.ACTION_DOWN) {
        toastLog("当前点击的坐标为：" + t.getRawX() + "," + t.getRawY());
        return true;
    }
    return true;
});
