!function(o,n){$W=o(document.body),n.render=function(n){!function(n){var i=new Image;i.src=n,i.onload=function(){o("img",".img-box").attr("src",i.src)}}(n.image),function(n){var i='<div class="song-name">'+n.song+'</div><div class="singer-name">'+n.singer+'</div><div class="album-name">'+n.album+"</div>";$W.find(".song-info").html(i)}(n),function(n){n?o(".like",".control").addClass("liking"):o(".like",".control").removeClass("liking")}(n.isLike),console.log(n)}}(window.Zepto,window.player||(window.player={}));