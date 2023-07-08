import request from '../request/request'

// 获取手记精选列表
export function getNoteList(){
    return request({
        url:'/notes'
    })
}

// 获取手记内容详情
export function getNoteDetails(noteId){
    return request({
        url:'/note/'+noteId
    })
}

//获取手记评论列表
export function getNoteComment(noteId){
    return request({
        url:'/note/'+noteId+'/comment?offset=0&limit_size=10'
    })
}
// 手记内容图片信息（尺寸等）
export function getNoteImg(keys){
    return request({
        url:'/imageinfo/batch?keys='+keys
    })
}