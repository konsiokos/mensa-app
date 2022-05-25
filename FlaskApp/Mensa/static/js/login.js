// send login request to backend on form submit 
$(function () {
    $("#login-form").submit(function (e) {
        e.preventDefault()
        var data = JSON.stringify({
            "username": $("#email").val(),
            "password": $("#password").val(),
        });
        var request = $.ajax({
            type: "POST",
            url: "/api/client/login",
            data: data,
            contentType: 'application/json;charset=UTF-8'
        });

        request.done(function (response) {
            if (response != "unsuccessful") {
                // if logged in, navigate to profile page 
                window.location = response;
            }
        });
    })
})