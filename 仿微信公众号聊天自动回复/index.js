function getDate(msg) {
    $.ajax({
            url: 'https://developer.duyiedu.com/edu/turing/chat?text=' + msg,
            type: 'get',
            success: function (res) {
                randerPage("robot", res)
            }
        }
    )
}

function randerPage(user, msg) {
    if (user == "mine") {
        var htmlStr = `<div class="mine">\
            <div class="icon"></div>\
            <p class="iSay">${msg}</p>\
        </div>`
        $(".content").append(htmlStr)
    } else if (user == "robot") {
        var htmlStr = `<div class="robot">\
            <div class="icon"></div>\
            <p class="robotSay">${msg}</p>\
        </div>`
        $(".content").append(htmlStr)
    }
}

function handleSubmit() {
    var info = $("#inputbox").val();
    randerPage("mine", info)
    $("#inputbox").val("")
    getDate(info);
}


$("#submit").on("click", handleSubmit)
$("#inputbox").on("keydown", function (e) {
    if (e.which == 13) {
        handleSubmit()
    }
})



