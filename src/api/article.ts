/**
 * 文章相关请求模块
 */
import request from '../utils/request'

/**
 * 获取文章列表
 */
export const getArticles = (params: any) => {
    return new Promise((resolve, reject) => request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    }).then((res) => resolve(res)).catch((err) => reject(err)))
}