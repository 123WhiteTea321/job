import request from '../request/request'

//获取推荐页面数据（大卡片，中卡片，小卡片等各种卡片），后续想获得其他如每日精选，热门等数据，照例申请，去https://apis.netstart.cn/xpc找
// https://apis.netstart.cn/xpc/home/recommend
export function getRecommend(){
    return request({
        url:'/home/recommend'
    })
}

//获取每日精选数据
export function getDaily(){
    return request({
        url:'/home/selection'
    })
}

//获取热门数据
export function getHot(){
    return request({
        url:'/home/hot'
    })
}

//获取剧情短片数据
export function getShorts(){
    return request({
      url:'/home/cateRecommend?cateName='
    })
}