$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致';
            }
        }
    })

    // 1 监听注册表单的提交事件
    $('.form-reg').on('submit', function(e) {
            e.preventDefault();

            var data = {
                username: $('.form-reg [name=username]').val(),
                password: $('.form-reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！请登录');
                $('#link-login').click();
            })
        })
        // 2 监听登录表单的提交事件
    $('.form-login').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功!');
                localStorage.setItem('token', res.token);
                location.href = '/case-exercise/index.html'
            }
        })
    })
})