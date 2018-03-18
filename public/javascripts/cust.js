$(document).ready(()=>{
    var but = $("#sub");
    var up1 = $("select[name='up']")
    var down1 = $("select[name='down']")
    var side1 = $("select[name='side']")
    var meet1 = $("select[name='meet']")
    var forward1 = $("select[name='forward']")
    but.click(function(){
        $.ajax({
            url: '/customize',
            type: 'POST',
            data: {
                id:"5aa43ac070f66759c63b51d4",
                up: up1.val(),
                down: down1.val(),
                side: side1.val(),
                meet: meet1.val(),
                forward: forward1.val()
            },
            success: function (response) {
                console.log(response);
                window.location.href = '../';
            },
            error: function () {
                console.log("Error in ajax");
            }
        });
    })
})