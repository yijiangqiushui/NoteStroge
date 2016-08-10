/**
 * Created by Administrator on 2016/5/25.
 */
$(function(){
    bindEvent();
});
function bindEvent(){
    $('#username').blur(checkUserName);
    $('#re-password,#password').blur(checkPass);
    $('#phone').blur(checkPhone);
    $('#checking-code').blur(checkCode);
    $('.register').click(regUser);
}

function checkUserName(){
    var objUserName = $(this);
    var username = objUserName.val();
    var filter = /^\w+$/;
    var result = filter.test(username);
    var userNameLength = username.length;
    var timeID1 = '';
    if(username!=''){
        if((!result||userNameLength<6||userNameLength>18)){
            var message = '';
            if(!result){
                message = '格式错误！';
            }else if(userNameLength<6){
                message = '少于6个字符！';
            }else if(userNameLength>18){
                message = '多于18个字符！';
            }
            objUserName.after('<div class="error"><span>'+message+'</span></div>');
            timeID1 = setTimeout(clearError,1000);
        }else{
            $.post('../../php/action/page/checkUsername.php',
                {
                    'username':username
                },
                function(result){
                    if(result.code == '0'){
                        objUserName.attr({'correct':'0'});
                        var message = '该用户已存在';
                        objUserName.after('<div class="error"><span>'+message+'</span></div>');
                        timeID1 = setTimeout(clearError,1000);
                    }else{
                        objUserName.attr({'correct':'1'});
                    }
                },
                'json'
               )
        }
    }else{
        objUserName.attr({'correct':'0'});
    }
    function clearError(){
        objUserName.next().remove();
    }
}

function checkPass(){
    var objPass = $(this);
    var rePass =  $('#re-password');
    var pass = $('#password');
    var password = pass.val();
    var rePassword = rePass.val();
    var thisPass = objPass.val();
    var timeID2 = '';
    if(thisPass!=''){
        objPass.attr({'correct':'1'});
        if(password!=''&&rePassword!=''&&password!=rePassword){
            objPass.after('<div class="error"><span>密码不一致！</span></div>');
            timeID2 = setTimeout(clearError,1000);
        }else{
            objPass.attr({'correct':'1'});
        }
    }else{
        objPass.attr({'correct':'0'});

    }
    function clearError(){
        objPass.next().remove();
    }
}

function checkPhone(){
    var objPhone = $('#phone');
    var phone = objPhone.val();
    var filter = /^1[3|5|7|8]\d{9}$/;
    var result = filter.test(phone);
    var timeID3 = '';
    if(phone!=''){
        if(!result){
            var message = '格式不正确！';
            objPhone.after('<div class="error"><span>'+message+'</span></div>');
            timeID3 = setTimeout(clearError,1000);
        }else{
            $('.get-code').click(getCodeClick);
            objPhone.attr({'correct':'1'});
        }
    }else{
        objPhone.attr({'correct':'0'});
    }
    function clearError(){
        objPhone.next().remove();
    }
    function getCodeClick(){
        var getCode = $('.get-code');
        getCode.unbind('click');
        var objThis = $(this);
        objThis.removeClass();
        objThis.addClass('click-get-code');
        objThis.text('60');
        var timeID4 = setInterval(countDown,1000);
        function countDown(){
            var nowTime = objThis.text();
            if(nowTime==0){
                clearInterval(timeID4);
                objThis.removeClass();
                objThis.addClass('get-code');
                objThis.text('免费获取');
                getCode.click(getCodeClick);
            }else{
                objThis.text(nowTime-1);
            }
        }
        alert('验证码已发送您手机，请注意查收！');
        var mobile = $('#phone').val();
        $.post('../../php/action/page/register_checkCode.php',
            {
                'mobile':mobile
            },
            function(result){
                if(result.message == 'Success'){
                    CHECKCODE = result.checkCode;
                    setTimeout('CHECKCODE=\'\'',300000);
                }
            }
            ,'json');
    }
}

function checkCode(){
    var objCheckCode = $(this);
    var checkingCode = $.md5(objCheckCode.val());
    if(checkingCode!=''){
        if(checkingCode==CHECKCODE){
            objCheckCode.attr({'correct':'1'});
        }else{
            objCheckCode.attr({'correct':'0'});
            var message = '验证码不正确！';
            objCheckCode.after('<div class="error"><span>'+message+'</span></div>');
            setTimeout(clearError,1000);
        }
    }else{
        objCheckCode.attr({'correct':'0'});
    }
    function clearError(){
        objCheckCode.next().remove();
    }
}

function regUser(){
    var correct = '1';
    var objReg = $('.register');
    $('.main-in').children('input').each(function(){
        var objThis = $(this);
        var thisCorrect = objThis.attr('correct');
        if(thisCorrect=='0'){
            correct = '0';
        }
    });
    if(correct == '0'){
        var message = '正确填写每一项！';
        objReg.after('<div class="error"><span>'+message+'</span></div>');
        setTimeout(clearError,1000);
    }else{
        var username = $("input[name=username]").val();
        var password = $.md5($("input[name=password]").val());
        var mobile = $("input[name=mobile]").val();
        $.post('../../php/action/page/register_sql.php',
            {
                'username':username,
                'password':password,
                'mobile':mobile
            },
            function(result){
                if(result){
                    alert('恭喜您注册成功！');
                }else{
                    alert('抱歉注册失败，请联系管理员！')
                }
            }
        );
    }
    function clearError(){
        objReg.next().remove();
    }
}

