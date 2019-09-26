(function ($, root) {
    //将音频分离于主页面代码
    /*音频部分由这部分控制，包含的功能有
    * 1.播放暂停
    *2.控制进度
    * */
    var $W = $(document.body);

    function audioControl() {
        /*这里的audio要绑定在this上面，不然找不到*/
        this.audio = new Audio();

        /*因为音频不好获取当前是播放状态还是暂停状态，所以自定义一个对象上的 方法来监听*/
        this.audio.status = 'pause';

    }


    audioControl.prototype.bindEvent = function () {
        /*当当前歌曲播放完后触发点击下一首的事件*/
        $(this.audio).on('ended', function () {
            console.log("播放下一首")
            $W.find('.next').trigger('click');
        })
    }

    /**/
    audioControl.prototype.play = function () {
        // console.log(this.audio, "播放")

        this.audio.play();
        this.audio.status = 'play';

    }

    audioControl.prototype.pause = function () {
        console.log("暂停")
        this.audio.pause();
        this.audio.status = 'pause';
    }

    audioControl.prototype.setSource = function (src) {
        console.log("设置音频源")
        var status = this.audio.status;
        this.audio.src = src;

        /*重载音频后会将当前函数设置成全新，所以要保存重载前的状态*/
        this.audio.load();
        this.audio.status = status;
    }
    audioControl.prototype.playTo = function (curTime) {
        console.log("拉动进度条", curTime)
        this.audio.currentTime = curTime
    }


    root.audioControl = audioControl;


})(window.Zepto, window.player || (window.player = {}));
