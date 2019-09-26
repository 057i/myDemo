// 页面渲染  img+info+like-btn

// 仿写Jq写法封闭作用域，暴露接口


(function ($, root) {

    $W = $(document.body);//dom元素，可以直接用

    // 渲染主入口
    function render(data) {
        renderImg(data.image);
        renderInfo(data);
        renderisLike(data.isLike);
        console.log(data)
    }

    function renderInfo(data) {
        var htmlStr = '<div class="song-name">' + data.song + '</div>' +
            '<div class="singer-name">' + data.singer + '</div>' +
            '<div class="album-name">' + data.album + '</div>';

        $W.find('.song-info').html(htmlStr)
    }

    function renderImg(src) {
        var img = new Image();
        img.src = src;
        //等待页面都载入完成后再把图片添加进页面
        img.onload = function () {
            $('img', '.img-box').attr('src', img.src)
        }

    }

    //按照json中的islike渲染数据
    function renderisLike(isLike) {
        if (isLike) {
            $('.like', '.control').addClass('liking');
        } else {
            $('.like', '.control').removeClass('liking');
        }

    }




    /*挂载到全局的root*/
    root.render = render;

})(window.Zepto, window.player || (window.player = {}))
//获取全局的zepto库，就可以减少使用时候要每次都去全局拿的操作，然后将方法挂载到window对象上的属性上d
