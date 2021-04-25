import request from '@/utils/request'

//获取token
export function get_token(data) {
    return request({
        url: '/get_token',
        method: 'post',
        data: JSON.stringify(data)
    })
}
//获取新增用户数
export function query_new_user(data) {
    return request({
        url: '/query_new_user',
        method: 'post',
        data: JSON.stringify(data)
    })
}
