/**
 * Created by yijiagnqiushui on 2016/5/25.
 */
$(function(){
    bindEvent();
});

function bindEvent(){
    $('.register').click(regUser);
    $('.submit').click(function(){
        window.location.href = 'website/html/html/main.html';
    });
}

function regUser(){
    window.location.href='website/html/html/register.html';
}

function checkUser(){
    var objusername = $('[name=username]');
    var objpassword = $('[name=password]');
    var checkcode = $('#ehong-code-input');
    var givecode = $('#ehong-code');
    var username = objusername.val();
    var password = objpassword.val();
    password = $.md5(password);
    var thecode = '';
    givecode.children().each(function(){
        thecode += $(this).text();
    });
    var inpucode = checkcode.val();
    if(thecode==inpucode){
        $.post('website/php/action/page/checkLogin.php',
            {
                'username':username,
                'password':password
            },
            function(result) {
                var message = '';
                if(result.code == 1){
                    alert('登录成功！');
                }else if(result.code == 2){
                    message = '密码错误！';
                    objpassword.after('<div class="error"><span>'+message+'</span></div>');
                    timeID3 = setTimeout(clearError,1000);
                    function clearError(){
                        objpassword.next().remove();
                    }
                }else if(result.code == 3){
                    message = '用户名错误！';
                    objusername.after('<div class="error"><span>'+message+'</span></div>');
                    timeID3 = setTimeout(clearError,1000);
                    function clearError(){
                        objusername.next().remove();
                    }
                }
            },
            'json'
        );
    }

}