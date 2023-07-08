<script setup>
import { getRecommend } from '../api/home';
import { ref, reactive, onMounted, watch } from 'vue';
import router from '../router';
import { getSearchResult, getHotKw } from '../api/search'
import Related from '../components/RelatedVideo.vue'

//placeholder里面动态显示视频标题
var MiddleCardTitle=reactive({
    data:[]
})
onMounted(()=>{
    const getMiddleCard=()=>{
    getRecommend()
    .then(res=>{
        console.log("推荐数据111",res)   //为什么没有打印,因为没有调用
        var data=res.data.data
       MiddleCardTitle.data=data.children[1].children[0].model.resource.title
       
    })
}
// 这里调用了上面的函数
 getMiddleCard()
})



//判断是否正在搜索
var isSearching = ref(true)
//搜索的值
const value = ref('');
//搜索结果容器
var searchlist = reactive({
    data: []
})

//装历史记录列表的容器
var history = reactive({
    list: []
})
//#region
// history.list = JSON.parse(localStorage.getItem("historylist")) || []     
//     console.log("历史记录列表", history.list) 

// //侦听器
// watch(isSearching, (newValue, oldValue) => {
//     //判断newValue,即isSearching的值是否为true，
//     if (newValue) {
//         history.list = JSON.parse(localStorage.getItem("historylist")) || []   //可以直接把这个放进两个搜索函数里执行，句号包起来的就是
//         console.log("历史记录列表", history.list)
//     }
// })
//#endregion

//输入搜索
const onSearch = (val) => {
    //输入搜索可以增加历史记录
    addHistory(val)
    // value.value = val
    getSearchResult(val)
        .then(res => {
            //使显示框显示搜索的文字
            value.value = val
            // 搜索框输入确定可以显示历史记录，平时隐藏 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
            history.list = JSON.parse(localStorage.getItem("historylist")) || []
            console.log("历史记录列表", history.list)
            // 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
            console.log("搜索数据", res)
            searchlist.data = res.data.data.list

            isSearching.value = false
        })
}
//清除搜索框返回到热门搜索栏
const onClear = () => {
    // console.log(111)
    isSearching.value = true
}
//tab栏
const active = ref(0);
//取消搜索
const onCancel = () => {
    router.back()
}
//关键词容器
var hotkws = reactive({
    list: []
})
//热词搜索
function fastSearch(name) {
    //点击热门搜索可以增加历史记录
    addHistory(name)
    // value.value = name

    getSearchResult(name)
        .then(res => {
            value.value = name    //在输入框里显示搜索项，value已经用v-model绑定了

            //  点击热词的时候历史记录才会显现。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
            history.list = JSON.parse(localStorage.getItem("historylist")) || []
            console.log("历史记录列表", history.list)
            // 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

            console.log("快速搜索", res)
            searchlist.data = res.data.data.list
            isSearching.value = false
        })


}
onMounted(() => {
    //获取关键词列表
    getHotKw()
        .then(res => {
            console.log("热门搜索关键词", res)
            hotkws.list = res.data.data.list
        })
     
    // 挂在onMounted后，加载完页面后历史记录就会存在。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
    history.list = JSON.parse(localStorage.getItem("historylist")) || []
    console.log("历史记录列表", history.list)
    // 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
})
//添加历史记录
const addHistory = (value) => {
    //  1.失败
    // var history= JSON.parse(localStorage.getItem('historylist'))||[]
    // console.log( '1',history)    //
    // console.log(typeof(history))
    // var arr =JSON.stringify (history) || []
    // console.log('2',arr)        //str
    // console.log(typeof(arr))
    // arr.push(value)        //str不能用push
    // console.log('3',arr)
    // localStorage.setItem("historylist", arr)

    // 2.失败  //arr.push是一个字符串，不是一个function ，应该push之后再加密 
    // var arr = JSON.parse(localStorage.getItem('historylist'))||[]  
    // console.log(typeof(arr))                          //object ||number
    // console.log(arr)                                  //[]    || 1 
    // arr=JSON.stringify (arr.push(value))              
    // console.log(typeof(arr))                          //string || error
    // localStorage.setItem("historylist", arr)          //第一次不报错，但本地存储空间的值是1

    // 3.成功了
    var arr = JSON.parse(localStorage.getItem('historylist')) || []
    console.log(typeof (arr))
    arr.push(value)
    arr = [...new Set(arr)]      //去重
    console.log(arr)           //检验是否去重
    localStorage.setItem("historylist", JSON.stringify(arr))   //push之后再加密


    //总结：
    //    var arr1=[]
    //    arr1=JSON.stringify(arr1.push(value))  //分开写就完事了
    //    console.log("arr1",arr1)    //1

    //    var arr2=[]
    //    arr2=JSON.stringify(arr2) 
    //    console.log(arr2)  //[]

    // var arr1 = []
    // arr1.push(value)
    // arr1 = JSON.stringify(arr1)
    // console.log(arr1)     //arr.push()处理了数组，但返回的是数组长度

}
// 删除历史记录
const deleteAll = () => {
    localStorage.removeItem('historylist')
    history.list = []
}



</script>



<template>
    <div class="searchMsg">
        <form action="/" van-sticky>
            <van-search v-model="value" show-action :placeholder="MiddleCardTitle.data" @search="onSearch" @cancel="onCancel"
                @clear="onClear" />
        </form>

        <!-- 搜索推荐页 -->
        <div class="search-recommend" v-if="isSearching">
            <div class="history" v-if="history.list.length > 0">
                <h3 class="history-title">
                    <span> 历史记录</span>
                    <span class="iconfont icon-lajitong" @click="deleteAll"></span>
                </h3>
                <!--     box >list >item 模式，
                         v-for放在list层，
                         display:flex放在box层,
                         item层可以不写样式
                -->
                <div class="history-box">
                    <span class="history-list" v-for="item in history.list">
                        <span class="history-item" @click="fastSearch(item)">{{ item }}</span>
                    </span>

                </div>
            </div>
            <div class="hot-kw">
                <h3 class="hot-title"> 热门搜索</h3>
                <!-- 渲染关键词列表 -->
                <ul class=" hot-list">
                    <!-- li标签占一行的 -->
                    <li class="hot-item" v-for="item in hotkws.list" @click="fastSearch(item.name)">
                        <span>{{ item.name }}</span>
                    </li>
                </ul>
            </div>



        </div>




        <!-- 搜索结果页 -->
        <div class="search-result" v-else>
            <!-- 要想使选中的标签呈现颜色，在父标签里作处理 -->
            <van-tabs v-model:active="active" sticky color="red" title-inactive-color="#868686" title-active-color="red">
                <van-tab title="作品">
                    <!-- 类似于相似视频，此处用组件 -->
                    <Related :list="searchlist.data"></Related>

                </van-tab>
                <van-tab title="创作人"></van-tab>
            </van-tabs>
        </div>
    </div>
</template>





<style scoped lang="less">
.search-recommend {
    padding: 0 10px;
}


// 历史记录
.history {
    margin: 10px 0;
}

.history-title {
    display: flex;
    justify-content: space-between;
}

.history-box {
   
    display: flex;
    margin: 10px;
    flex-wrap: wrap; //词汇不会竖着放了


}

.history-list {
    padding: 5px 15px;
    background-color: #F7F7F7;
    color: #505050;
    font-size: 12px;
    margin: 5px 10px 10px 0;
}








// 热门搜索
.hot-kw {
    margin: 10px 0;
}

h3 {
    color: #A3A3A3;
    font-size: 13px;

}

.hot-list {
    margin: 10px;
    display: flex;
    flex-wrap: wrap; //词汇不会竖着放了
}

.hot-item {

    padding: 5px 15px;
    background-color: #F7F7F7;
    color: #505050;
    font-size: 12px;
    margin: 0 10px 10px 0;
}
</style>