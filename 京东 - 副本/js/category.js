window.onload = function () {
    // 获取左侧栏
    var ct_cLeft = document.querySelector(".ct_cLeft");
    // 获取左侧栏的高度
    var leftH = ct_cLeft.offsetHeight;
    // 获取用来滑动的列表
    var ulBox = ct_cLeft.querySelector("ul:first-of-type");
    var ulBoxH = ulBox.offsetHeight;

    // 获取所有li
    var lis = ulBox.querySelectorAll("li");
    // 设置静止状态下的最大top值
    var maxTop = 0;
    // 设置静止状态下的最小top值
    var minTop = leftH - ulBoxH;
    // 设置滑动状态下的最大top值
    var maxBounceTop = maxTop + 100;
    // 设置滑动状态下的最小top值
    var minBounceTop = minTop - 100;

    // 实现滑动
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    // 记录当前元素滑动到的位置
    var currentY = 0;
    // 添加滑动事件
    ulBox.addEventListener("touchstart", function (e) {
        // 获取手指的起始坐标
        startY = e.targetTouches[0].clientY;
    });
    ulBox.addEventListener("touchmove", function (e) {
        moveY = e.targetTouches[0].clientY;
        // 计算距离的差异
        distanceY = moveY - startY;
        // 判断滑动的时候是否超出当前指定的滑动区间
        if (currentY + distanceY > maxBounceTop || currentY + distanceY < minBounceTop) {
            return;
        }
        // 先将之前可能添加的过渡效果清除
        ulBox.style.transition = "none";
        // 实现偏移操作:应该在之前的滑动距离的基础上再进行滑动
        ulBox.style.top = (currentY + distanceY) + "px";
    });
    ulBox.addEventListener("touchend", function (e) {
        // 判断当前滑动的距离是否在静止状态和滑动状态下的最小TOP值之间
        if (currentY + distanceY < minTop) {
            currentY = minTop;
            // 回到minTop的位置
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = minTop + "px";
        }
        else if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            // 回到maxTop的位置
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = maxTop + "px";
        }
        else {
            // 记录当前滑动的距离
            currentY += distanceY;
        }

    });
    // 为每一个li元素设置添加一个索引值
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
    }
    // 绑定移动端的tap事件
    /*itcast.tap(ulBox, function (e) {
        // 1.修改LI的样式
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        // 为当前被单击的li元素添加样式
        var li = e.target.parentNode;
        var liH = li.offsetHeight;
        li.classList.add("active");
        // 2.移动当前li到父容器的最顶部,但是不能超出之前设定了静止状态下的最小top值
        // 1.获取当前li的索引值
        var index = li.index;
        // 开启过渡
        ulBox.style.transition = "top .5s";
        // 设置偏移
        if (-index * liH < minTop) {
            // 只能偏移到MinTop位置
            ulBox.style.top = minTop + "px";
            currentY = minTop;
        }
        else {
            ulBox.style.top = -index * liH + "px";
            currentY = -index * liH;
        }
    });*/

    /*$(ulBox).on("tap", function (e) {
        console.log("tap");

        // 1.修改LI的样式
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        // 为当前被单击的li元素添加样式
        var li = e.target.parentNode;
        var liH = li.offsetHeight;
        li.classList.add("active");
        // 2.移动当前li到父容器的最顶部,但是不能超出之前设定了静止状态下的最小top值
        // 1.获取当前li的索引值
        var index = li.index;
        // 开启过渡
        ulBox.style.transition = "top .5s";
        // 设置偏移
        if (-index * liH < minTop) {
            // 只能偏移到MinTop位置
            ulBox.style.top = minTop + "px";
            currentY = minTop;
        }
        else {
            ulBox.style.top = -index * liH + "px";
            currentY = -index * liH;
        }
    })*/

    // 绑定FASTCLICK
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }
    // fastclick使用的时候就是来绑定添加click事件
    ulBox.addEventListener("click", function (e) {
        // 1.修改LI的样式
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        // 为当前被单击的li元素添加样式
        var li = e.target.parentNode;
        var liH = li.offsetHeight;
        li.classList.add("active");
        // 2.移动当前li到父容器的最顶部,但是不能超出之前设定了静止状态下的最小top值
        // 1.获取当前li的索引值
        var index = li.index;
        // 开启过渡
        ulBox.style.transition = "top .5s";
        // 设置偏移
        if (-index * liH < minTop) {
            // 只能偏移到MinTop位置
            ulBox.style.top = minTop + "px";
            currentY = minTop;
        }
        else {
            ulBox.style.top = -index * liH + "px";
            currentY = -index * liH;
        }
    })
}