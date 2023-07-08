import request from '../request/request'


//搜索数据 https://apis.netstart.cn/xpc/search?kw=青春
export function getSearchResult(kw){
    return request({
        url:'search?kw='+kw,
        method:"GET"
    })
}

//热门搜索关键词 https://apis.netstart.cn/xpc/search/recommend_kws
export function getHotKw(recommend_kws){
    return request({
        url:'search/recommend_kws',
        method:"GET"
    })
}

// 搜索页面数据接口
export function getCategory(){
    return request({
        url:'/page/discovery'
    })
}

//分类视频接口
export function getCategoriesDetails(category_id){
    return request({
        url:'/articles?category_id='+category_id
    })
}