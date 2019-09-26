$('.control').on('click', function () {
    $(this).find('span').toggleClass('glyphicon glyphicon-triangle-bottom')
    $(this).find('span').toggleClass('glyphicon glyphicon-triangle-right')
})


$('.list-group-item').on('click',function () {
    $('.list-group-item').removeClass('list-group-active');
    $(this).addClass('list-group-active');
    var index=$(this).attr('data-log');
    console.log(index)
    $('.tab-content').find('.active').removeClass('active');
    $('.'+index).addClass('active');


})
$('.toggle-btn').on('click',function () {
    $('.leftContent').toggleClass('show');
    $('.rightContent').toggleClass('rightContentShow');
})
