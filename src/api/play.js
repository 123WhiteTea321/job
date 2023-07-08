import request from '../request/request'



//视频详情数据
export function getplaydetail(id){
    return request({
        url:'article/'+id,
        method:"GET"
    })
}

//评论
export function getcomments(resource_id){
    return request({
        url:'comments?resource_id='+resource_id,
        method:"GET"
    })
}
//相似视频
export function getsimilarvideo(articleId){
    return request({
        url:'article/'+articleId+'/next',
        method:"GET"
    }) 
}