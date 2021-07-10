import request from '../utils/request'


export const getActivity = (data: any) => {
    return new Promise((resolve, reject) => request({
        method: 'POST',
        url: '/getOneActivity',
        data
    }).then((res) => resolve(res)).catch((err) => reject(err)))
}