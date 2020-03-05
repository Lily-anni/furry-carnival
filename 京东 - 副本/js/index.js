window.onload = function () {
    bannerOpacity();
    timeBack();
    bannerEffect();
}
function bannerOpacity() {
    // 头部搜索块的js效果
    // 1.获取当前banner的高度
    var banner = document.querySelector(".jd_banner");
    var bannerH = banner.offsetHeight;
    // 获取header搜索块
    var search = document.querySelector(".jd_search");
    // 2.获取当前屏幕滚动时，banner滚出屏幕的距离
    window.onscroll = function () {
        var offetTop = banner.scrollTop;
        console.log(offetTop);

        // 3.计算比例值为透明度
        var opacity = 0;
        if (offetTop < bannerH) {
            opacity = offetTop / bannerH;
            // 设置样式
            search.style.backgroundColor = "rgba(0,0,0," + opacity + ")";
        }
        else { }
    }

}
function timeBack() {
    //1. 获取用于展示事件的span
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    // 2.设置初始的倒计时时间，以秒为单位
    var totalTime = 3700;
    // 3.开启定时器
    var timerId = setInterval(function () {
        totalTime--;
        if (totalTime < 0) {
            // 清除时钟
            clearInterval(timerId);
            return;
        }
        var hour = Math.floor(totalTime / 3600);
        var minutes = Math.floor(totalTime % 3600 / 60);
        var second = Math.floor(totalTime % 60);
        // 赋值，将时间填充到span中
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);

        spans[3].innerHTML = Math.floor(minutes / 10);
        spans[4].innerHTML = Math.floor(minutes % 10);

        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);
    }, 1000);
}
// 轮播图
function bannerEffect() {
    // 1.设置修改轮播图页面结构   在开始位置添加最后一张，在最后添加第一张
    // 获取轮播图结构
    var banner = document.querySelector(".jd_banner");
    // 获取图片容器
    var imgBox = banner.querySelector("ul:first-of-type");
    // 获取原始的第一张图片
    var first = imgBox.querySelector("li:first-of-type");
    // 获取原始的最后一张图
    var last = imgBox.querySelector("li:last-of-type");
    // 在首尾插入图片
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);
    // 2.设置对应样式
    // 获取所有li
    var lis = imgBox.querySelectorAll("li");
    // 获取li的数量
    var count = lis.length;
    // 获取banner的宽度
    var bannerWidth = banner.offsetWidth;
    // 设置图片盒子的宽度
    imgBox.style.width = count * bannerWidth + "px";
    // 设置每一个li元素(图片)的宽度
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = bannerWidth + "px";
    }
    // 定义图片索引:图片已经有一个宽度的默认偏移
    var index = 1;
    // 3.设置默认偏移
    imgBox.style.left = -bannerWidth + "px";
    // 4.当屏幕发生变化时,重新计算宽度
    window.onresize = function () {
        // 获取banner的宽度,并覆盖全局的宽度值
        bannerWidth = banner.offsetWidth;
        // 设置图片盒子的宽度
        imgBox.style.width = count * bannerWidth + "px";
        // 设置每一个li元素(图片)的宽度
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = bannerWidth + "px";
        }
        //设置默认偏移
        imgBox.style.left = -index * bannerWidth + "px";
    }
    // 实现点标记
    var setdian = function (index) {
        var dians = banner.querySelector("ul:last-of-type").querySelectorAll("li");
        // 清除其他li元素的active样式
        for (i = 0; i < dians.length; i++) {
            dians[i].classList.remove("active");
        }
        // 为当前li元素添加active样式
        dians[index - 1].classList.add("active");
    }
    // 5.实现自动轮播
    var timerId;
    var startTime = function () {
        timerId = setInterval(function () {
            // 变换索引
            index++;
            // 添加过渡效果
            imgBox.style.transition = "left 0.5s";
            // 设置偏移
            imgBox.style.left = (-index * bannerWidth) + "px";
            // 判断是否到最后一张,如果是则
            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    // 清除过渡效果
                    imgBox.style.transition = "none";
                    // 偏移到指定位置
                    imgBox.style.left = (-index * bannerWidth) + "px";
                }
            }, 500);
        }, 2000);
    }
    startTime();
    // 6.实现手动轮播
    var startX, moveX, distanceX;
    // 标记当前过渡效果是否已经执行完毕
    var isEnd = true;
    // 为图片添加触摸事件---触摸开始
    imgBox.addEventListener("touchstart", function (e) {
        // 清除定时器
        clearInterval(timerId);
        // 获取手指初始位置
        startX = e.targetTouches[0].clientX;
    });
    // 为图片添加触摸事件---滑动过程
    imgBox.addEventListener("touchmove", function (e) {
        if (isEnd == true) {
            // 记录手指在滑动过程中的位置
            moveX = e.targetTouches[0].clientX;
            // 计算坐标的差异
            distanceX = moveX - startX;
            // 为了保证效果正常，将之前添加过的过渡样式清除
            imgBox.style.transition = "none";
            // 实现元素的偏移  left参照最原始的坐标
            // 重大细节：本次的滑动应该基于之前轮播图已经偏移的距离
            imgBox.style.left = (-index * bannerWidth + distanceX) + "px";
        }
    });
    // 为图片添加触摸事件---触摸结束  松开手指触发
    imgBox.addEventListener("touchend", function (e) {
        // 松开手指，标记当前过渡效果正在执行
        isEnd = false;
        // 获取当前滑动的距离，判断是否超出指定的范围
        if (Math.abs(distanceX) > 100) {
            // 判断滑动的方向
            if (distanceX > 0) {//上一张
                index--;
            }
            else {//下一张
                index++;
            }
            // 翻页
            imgBox.style.transition = "left 0.5s";
            imgBox.style.left = -index * bannerWidth + "px";
        }
        else if (Math.abs(distanceX) > 0) {//用户确实进行过滑动操作
            // 回弹 
            imgBox.style.transition = "left 0.5s";
            imgBox.style.left = -index * bannerWidth + "px";
        }
        // 将上一次move所产生的数据重置为0
        startX = 0;
        moveX = 0;
        distanceX = 0;

    });
    // webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素过渡效果执行完毕，就会触发这个事件
    imgBox.addEventListener("webkitTransitionEnd", function () {
        // 如果到了最后一张（count-1）,回到索引1
        // 如果到了第一张（0）,回到索引count-2
        if (index == count - 1) {
            index = 1;
            // 清除过渡
            imgBox.style.transition = "none";
            // 设置偏移
            imgBox.style.left = -index * bannerWidth + "px";
        }
        else if (index == 0) {
            index = count - 2;
            // 清除过渡
            imgBox.style.transition = "none";
            // 设置偏移
            imgBox.style.left = -index * bannerWidth + "px";
        }
        setdian(index);
        setTimeout(function () {
            isEnd = true;
            // 清除之前的定时器
            clearInterval(timerId);
            // 重新开启定时器
            startTime();
        }, 500);
    });
}