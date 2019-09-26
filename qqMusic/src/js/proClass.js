//控制进度条模块，主要要完善的功能有，
// 1.渲染当前时间和总时间
//2.拖动改变进度

//仿写jquery暴露接口
(function ($, root) {
    var frameId;
    var duration;
    var startTime;
    var preTime = 0;//上一次拖动状态


    function renderAllTime(time) {
        duration = time;
        time = format(time);
        $('.endTime').html(time);
        console.log(time, "渲染全部时间")
    }


    //格式化处理时间
    function format(t) {
        console.log(t, 9999)
        var m = Math.floor(t / 60);
        var s = t % 60;

        var timeString = (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s)
        return timeString
    }

    //进度条开始函数
    function start(p) {
        cancelAnimationFrame(frameId);

        //函数可以是传值或者不传，拖动进度条时候传值(传百分比)
        // 内部函数调用渲染的时候不传

        p = p == undefined ? preTime : p;
        startTime = new Date().getTime();
        console.log("上次拖动时间", preTime, p)

        //创建一个函数和屏幕同时刷新，并且监控
        function frame() {
            console.log("开始渲染时间")
            var nowTime = new Date().getTime();

            //求出百分比，然后直接去乘以总时间
            // 已经走的百分比+(当前时间减去开始时间)/持续时间*1000为单位换算
            var per = (p * 1000 + (nowTime - startTime)) / (duration * 1000);
            preTime = per * duration
            console.log('这是进度百分比' + p, nowTime - startTime, duration, "上次暂停时间", preTime);
            //如果当前的百分比超过1，则取消监控刷新，否则更新进度条

            if (per > 1) {
                cancelAnimationFrame(frameId);
            } else {

                update(per)
            }
            //设置一个全局id，后面取消时候有地方找
            frameId = requestAnimationFrame(frame)
        }

        //初次调用
        frame();

    }

    //按下暂停的一瞬间
    function stop() {

        //取消屏幕刷新
        cancelAnimationFrame(frameId);
        //暂停时候更新已经走过的时间
        // console.log(startTime, preTime, frameId)
        preTime = new Date().getTime() - startTime + preTime;
        console.log("暂停时间", new Date().getTime(), "开始播放时间", startTime, "暂停前时间", preTime, frameId, "进度暂停"
        )
    }

    //进度条更新函数
    function update(per) {
        console.log(per)
        var time = Math.round(per * duration);


        console.log("当前进度百分比", per)
        time = format(time)
        console.log(per, "渲染到页面的时间:" + time, duration)
        $('.curTime').html(time)

        //更新进度条
        $('#spot').css({
            left: per * 100 + '%'
        })
        $('.cur-progress').css({
            'transform': 'translateX(' + (per * 100 - 100) + '%)'
        })


    }

    //重置函数，在切换下一首和上一首的时候调用
    function reset() {
        stop()
        preTime = 0;//上一次拖动状态
        update(0);
    }

    function changePreTime(pretime) {
        preTime = pretime
        console.log(preTime, "yui")
    }

    //以对象形式暴露接口，使得在全局可以找得到
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        reset: reset,
        update: update,
        changePreTime: changePreTime,
        preTime: preTime
    }

})(window.Zepto, window.player || (window.player = {}))
