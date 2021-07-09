/**
 * 文章相关请求模块
 */
import request from '../utils/request'

/**
 * 获取文章列表
 */
export const getArticles = () => {
    return new Promise((resolve, reject) => request({
        method: 'GET',
        url: '/articles',
    }).then((res) => resolve(res)).catch((err) => reject(err)))
}