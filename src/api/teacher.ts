import request from "../utils/request"


export const addRes = (data: any) => {
    return new Promise((resolve, reject) => request({
        method: 'POST',
        url: '/tAddRes',
        data
    }).then((res) => resolve(res)).catch((err) => reject(err)))
}


export const tNewClass = (data: any) => {
    return new Promise((resolve, reject) => request({
        method: 'POST',
        url: '/tNewClass',
        data
    }).then((res) => resolve(res)).catch((err) => reject(err)))
}

