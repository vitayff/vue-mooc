import request from "../utils/request"

/**
 * 用户登录
 */
export const login = (data: any) => {
    // console.log("loginData", {
    //     method: 'POST',
    //     url: '/login',
    //     data
    // })
    return new Promise((resolve, reject) => request({
        method: 'POST',
        url: '/login',
        data
    }).then((res) => resolve(res)).catch((err) =>
        reject(err)))
}

/**
 * 发送短信验证码
 */
export const sendSms = (mobile: string) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}



