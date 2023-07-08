import request from '../request/request'


//分享的后台接口，这里手机号是18875159999
// https://note.youdao.com/ynoteshare/index.html?id=b136e8254d0ff3dd48958af8fff8719e&type=note&_time=1679465327106
export function login(phone, password) {
    return request({
        url: 'http://www.kangliuyong.com:10002/login',
        method: 'POST',
        data:{
            appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
            password,
            phone
        },
        // 局部配置携带cookie（不用装）
        // withCredentials 表示跨域请求时是否需要使用凭证
        withCredentials: true

    })
}

export function Register(phone,nickname, password){

    return request({
     url:'http://www.kangliuyong.com:10002/register',
     method:'POST',
     data:{
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        password,
        phone,
        nickname
    },
    // 局部配置携带cookie（不用装）
    // withCredentials 表示跨域请求时是否需要使用凭证
    withCredentials: true

    })
}