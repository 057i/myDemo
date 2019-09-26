var gulp = require('gulp');
var gulpHtmlClean = require('gulp-htmlclean');//引入清除html中去文档空格的压缩插件
var imageMin = require('gulp-imagemin');//压缩图片插件
var uglify = require('gulp-uglify');//压缩js插件插件
var cleanCss = require('gulp-clean-css');//压缩css插件

// 两个添加前缀插件
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var less = require('gulp-less');//less解析


var connect = require('gulp-connect');//开启服务插件


// gulp.task('default',function () {
//     console.log('aaaa');
// })

/*定义一个对象用来存储文件路径,日后需要改变只要改变这里就可以了*/
var folder = {
    src: 'src/',
    dist: 'dist/'
}


// 开启html任务
gulp.task('html', function () {
    gulp.src(folder.src + 'html/*')//找到文件的源头
        .pipe(connect.reload())//文件变化服务器自动刷新
        .pipe(gulpHtmlClean())/*在读取到文件和输出的之间执行html文件压缩*/
        .pipe(gulp.dest(folder.dist + 'html/'))//写入然后利用管道传输到复制的地方
});

// 开启css任务
gulp.task('css', function () {
    gulp.src(folder.src + 'css/*.less')
        .pipe(connect.reload())//文件变化服务器自动刷新
        .pipe(less())//解析less
        //这里比较特殊，autoprefixer添加前缀必须以一个数组的形式传给postCss才可以使用
        .pipe(postCss([autoprefixer()]))

        .pipe(cleanCss())//压缩
        .pipe(gulp.dest(folder.dist + 'css/'));
});

// 开启js任务
gulp.task('js', function () {
    gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())//文件变化服务器自动刷新
        .pipe(uglify())/*在读取到文件和输出的之间执行js文件压缩*/
        .pipe(gulp.dest(folder.dist + 'js/'));
});


// 开启img任务
gulp.task('img', function () {
    gulp.src(folder.src + 'img/*')
        .pipe(connect.reload())
        .pipe(imageMin())/*在读取到文件和输出的之间执行js文件压缩*/
        .pipe(gulp.dest(folder.dist + 'img/'));
});

//开启服务器自动监听
gulp.task('server', function () {
    connect.server({    //开启服务
        // 配置选项
        port: 8800,//配置端口，预防默认开启8080端口占用
        livereload: true//开启自动监听
    });
})


//开启服务器自动刷新
gulp.task('watch', function () {
    /*watch的第一个参数是要监听的文件，第二个参数是当文件有变化时候要执行的任务*/
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'img/*', ['img']);
});


/*前面为任务名，后面为该任务的依赖*/
gulp.task('default', ['html', 'css', 'js', 'img', 'server', 'watch']);
