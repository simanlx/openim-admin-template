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

//获取单聊消息数
export function single_msg_count(data) {
    return request({
        url: '/single_msg_count',
        method: 'post',
        data: JSON.stringify(data)
    })
}

//拉取封禁用户列表
export function query_disable_user(data) {
    return request({
        url: '/query_disable_user',
        method: 'post',
        data: JSON.stringify(data)
    })
}

//查询用户列表或某一个封禁玩家信息
export function query_user(data) {
    return request({
        url: '/query_user',
        method: 'post',
        data: JSON.stringify(data)
    })
}

//封禁或解封
export function disable_user(data) {
    return request({
        url: '/disable_user',
        method: 'post',
        data: JSON.stringify(data)
    })
}

//查询消息列表
export function query_msg_list(data) {
    return request({
        url: '/query_msg_list',
        method: 'post',
        data: JSON.stringify(data)
    })
}

