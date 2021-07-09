/**
 * 课程相关请求模块
 */
import request from '../utils/request'

/**
 * 获取课程列表
 */
export const getCourses = (data: any) => {
    return new Promise((resolve, reject) => request({
        method: 'POST',
        url: '/profile',
        data
    }).then((res) => resolve(res)).catch((err) => reject(err)))
}

export const addcourse = (data: any) => {
    return new Promise((resolve, reject) => request({
        method: 'POST',
        url: '/addcourse',
        data
    }).then((res) => resolve(res)).catch((err) => reject(err)))
}

export const getCourseDetail = (data: any) => {
    return new Promise((resolve, reject) => request({
        method: 'POST',
        url: 'getCourseDetail',
        data
    }).then((res) => resolve(res)).catch((err) =>
        reject(err)))
}