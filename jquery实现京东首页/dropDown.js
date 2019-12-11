(function(){
    function dropDown(options){
        this.father=options.father;//this的father指向下拉元素，this指向实例化函数的新对象
        this.menuList=options.menuList;
        this.width=options.width;
        this.title=options.title;
        this.direction=options.direction || 'left';
        this.createDom();
        this.initStyle();
        this.bindEvent(); 
    }


//预防下拉二级菜单时候鼠标还没划入二级菜单解决办法有两个
// 一个是将二级菜单和一级菜单放在同一个容器形成父子集关系即可中然后对这个容器绑定事件
// 第二种方法是给父级绑定事件，二级菜单出现，然后设置延迟事件，等到鼠标移入
    dropDown.prototype.createDom=function(){
        //创建下拉框且填充数据
        var self=this;
        menuList=this.menuList;
        var $dropDownBox=$('<div class="dropDownBox"></div>')
        menuList.forEach(function(menu,index){
            var $DL=$('<dl class="dropList"></dl>');
            var $Dt=$('<dt></dt>').text(menu.title)
            $Dt.appendTo($DL);
            console.log(menu.width)
            if(menu.width != undefined){
                self.menuListWidth=menu.width;
            }
            if(menu.itemWidth != undefined){
                self.itemsWidth=menu.itemWidth;
            }
            menu.items.forEach(function(item,index){
                var oDD=$('<dd class="items"><a href="">'+item.name+'</a><dd>');        
                oDD.appendTo($DL);
            })
            $DL.appendTo($dropDownBox)
        })
        $dropDownBox.appendTo(this.father)
        console.log(self.itemWidth)
        }

    
    dropDown.prototype.initStyle=function(){
        $(this.father)
            .find('.dropDown_title')
            .text(this.title)
                .end()
                .find('.dropDownBox')
                    .css({position:'absolute',
                          left:0,
                          background:'#fff',
                          display:'none',
                          width:this.width,
                          zIndex:999
                        })
                        .end()
                        .find('dl')
                            .css({padding: '10px 0 10px 7px',
                                  width:this.menuListWidth,
                                  overflow: 'hidden',float:'left'})
                                    .end()
                                        .find('dt')
                                            .css({'font-size':20})
                                                .end()
                                                    .find('dd')
                                                        .css({ width: '50%',
                                                            float: 'left'})
        if(this.direction !='x'){
            $(this.father)                
                .css({position:'relative'})
                    .find('dl')
                        .css({width:this.menuListWidth
                            })
                            .end()
                                .find('dd')
                                    .css({width:this.itemWidth})               
        }
    }
    dropDown.prototype.bindEvent=function(){
        var self=this;
        $(this.father).mouseenter(function(){
            $('.dropDownBox',self.father).show()
        })
        .mouseleave(function(){
            $('.dropDownBox',self.father).hide()

        })
    }

    $.fn.extend({
        addDropDown:function(options){
            options.father=this;
            new dropDown(options)
        }
    })







}())