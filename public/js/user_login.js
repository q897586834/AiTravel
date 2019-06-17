$(".login-form-btn").click(function () {
    $.post("/users/signin", {
        "uname": $("#uname").val(),
        "upwd": $("#upwd").val()
    }, function (result) {
        console.log(result);
        if (result.ok == "1") {
            //成功
           // alert(result.uid);
           sessionStorage.setItem("uname",$("#uname").val());
            alert("登陆成功！将自动跳转到首页");
            window.location = "/";
        } else if (result.ok == "0") {
            alert("用户名或密码错误");
        }
    })
});