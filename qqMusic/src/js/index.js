// 单一职责，暴露接口
/*rander模块渲染图片，渲染歌手名，歌曲名，专辑名*/
/*切歌模块：上一首，暂停，下一首，绑定事件，三个*/
/*pro进度条区域模块*/
/*播放列表模块*/


var $ = window.Zepto;
var root = window.player;
var list;
var len;
var nowIndex = 0;
var audioPlayer = new root.audioControl();
var rotateDom = new root.rotateAlbum($('.img-box'));


//模拟获取数据
getDate('../mook/data.json');


//事件绑定
function bingEvent(data) {


    // 上一首事件绑定
    $('.control')
        .on('click', '.pre', function () {

            //第一首时候按上一首的情况
            if (nowIndex == 0) {
                nowIndex = len - 1;
            } else {
                nowIndex--;
            }
            /*判断是否在听歌时候切歌，切歌的话要保存当前状态，以及要将专辑装盘归零*/
            var status = audioPlayer.audio.status;
            root.render(data[nowIndex]);
            audioPlayer.setSource(data[nowIndex]['audio']);
            audioPlayer.audio.status = status;
            if (audioPlayer.audio.status == 'play') {
                audioPlayer.audio.status = 'continue';
                $('.play').click()
            }
            /*专辑转盘归零*/
            rotateDom.change();
            root.pro.renderAllTime(data[nowIndex].duration);//渲染总时间
            root.renderList(data, nowIndex)

        })
        .on('click', '.play', function () {
            /*判定是否正在播放*/

            /*播放时*/
            if (audioPlayer.audio.status == 'play') {
                audioPlayer.pause();
                rotateDom.stop();
                root.pro.stop()

            } else if (audioPlayer.audio.status == 'pause') {
                /*暂停时*/
                audioPlayer.play();
                rotateDom.con();
                root.pro.start()

            } else if (audioPlayer.audio.status == 'continue') {
                /*切歌时，处于正在播放的下一曲*/
                audioPlayer.audio.status = 'play';
                audioPlayer.play();
                rotateDom.stop();
                rotateDom.num = 0;
                rotateDom.change();
                rotateDom.con();
                root.pro.stop()


            }
            /*三木运算符判断是否是播放状态*/
            audioPlayer.audio.status == 'play' ? $('.play').addClass('pause') : $('.play').removeClass('pause');


        })
        //绑定下一首的事件
        .on('click', '.next', function () {
            //按下一首按钮时候【判定是否是最后一首，是的话从头再来
            if (nowIndex == len - 1) {
                nowIndex = 0;
            } else {
                nowIndex++
            }
            /*判断是否在听歌时候切歌，切歌的话要保存当前状态且转盘归零*/
            var status = audioPlayer.audio.status;
            root.render(data[nowIndex]);
            audioPlayer.setSource(data[nowIndex]['audio']);
            audioPlayer.audio.status = status;
            if (audioPlayer.audio.status == 'play') {
                audioPlayer.audio.status = 'continue';
                $('.play').click()
            }
            root.pro.renderAllTime(data[nowIndex].duration);//渲染总时间
            root.renderList(data, nowIndex)
            root.pro.reset();
            rotateDom.change();

        })


    //绑定弹出列表窗界面
    $(".list").on("click", function () {
        if ($(".listWrapper").hasClass("listActive")) {
            $(".listWrapper")
                .removeClass("listActive")
        } else {
            $(".listWrapper")
                .addClass("listActive")


        }
    })

    //是否喜欢按钮事件
    $(".btn,.like").on("click", function () {
            if ($(".btn,.like").hasClass("liking")) {
                $(".btn,.like").removeClass("liking")
            } else {
                $(".btn,.like").addClass("liking")

            }
        }
    )


    //绑定点击列表弹窗的li切歌
    $(".listWrapper,li").on("click", function (e) {
        nowIndex = $(e.target).index()//保存点击到的事件源
        var status = audioPlayer.audio.status;
        root.render(data[nowIndex]);
        audioPlayer.setSource(data[nowIndex]['audio']);
        audioPlayer.audio.status = status;
        root.renderList(data, nowIndex)
    })


}


//拖动进度条事件(拖动之前先判断当前播放状态是否播放，如果是，拖动之后继续播放，如果不是，拖动之后为暂停)
function proControl() {
    var offset = $('.total-progress').offset();
    var offsetLeft = offset.left;
    var width = offset.width;
    var dragAudioFlag;

    //减去左边空余

    $('#spot').on('touchstart', function (e) {
        //停止播放后更新进度条(拖动前播放状态)
        dragAudioFlag = audioPlayer.audio.status
        console.log(audioPlayer.audio.status, "状态")
        $('.control').trigger("click");

        root.pro.stop()
        audioPlayer.pause()


    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - offsetLeft) / width;
        if (per >= 0 && per < 1) {
            root.pro.update(per)
        }

    })
    $('#spot').on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - offsetLeft) / width;

        if (per >= 0 && per < 1) {
            var duration = list[nowIndex].duration;
            var curTime = Math.round(duration * per);
            audioPlayer.playTo(curTime);

            console.log("dragAudioFlag", dragAudioFlag, per)

            root.pro.changePreTime(per * audioPlayer.audio.duration)
            console.log(per, audioPlayer.audio.duration, "******")
            console.log("拖动时间", root.pro)


            //拖动结束后判断状态，并且跳转进度准备播放
            audioPlayer.playTo(per * audioPlayer.audio.duration)
            console.log(dragAudioFlag)
            if (dragAudioFlag == "play") {
                console.log("继续播放", per)
                audioPlayer.status = dragAudioFlag;
                root.pro.start(per * audioPlayer.audio.duration)
                audioPlayer.play()
            } else {
                console.log("暂停")
                audioPlayer.status = dragAudioFlag;

            }

        }
    })
}


//封装函数读取假数据
function getDate(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            bingEvent(data)
            proControl()
            list = data;
            len = data.length;
            root.render(data[0]);
            audioPlayer.setSource(data[nowIndex]['audio']);
            root.pro.renderAllTime(data[nowIndex].duration);//渲染总时间
            root.renderList(data, 0)
        },
        error: function () {
            console.log('error')
        }
    })
}

