//渲染列表项，遍历全部音乐数据

(function ($, root) {
    $W = $(document.body);//dom元素，可以直接用

    function renderList(data, curIndex) {
        console.log(data, $W)
        var htmlStr = "";
        for (var i = 0; i < data.length; i++) {
            if (curIndex == i) {
                htmlStr += "<li class='active'><span class='song-name'>" + data[i].song + "</span><span class='author'>--" + data[i].singer + "</span></li> "
            } else {
                htmlStr += "<li><span class='song-name'>" + data[i].song + "</span><span class='author'>--" + data[i].singer + "</span></li> "
            }
        }
        $W.find(".listWrapper").html(htmlStr)

    }


    root.renderList = renderList


})(window.Zepto, (window.player || (window.player = {})))
