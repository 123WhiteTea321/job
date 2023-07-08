<script setup>
import { getRecommend } from '../api/home';
import { ref, reactive, onMounted } from 'vue';
import { getCategory } from '../api/search';
import { useRouter } from 'vue-router';
const value = ref('');
const router = useRouter()

//点击取消跳转返回到搜索页面
const toSearchMsg = () => {
    /*错误的，必须创建路由实例对象再去push */
    // useRouter().push({
    //     path:'/SearchMsg'
    // })

    /*正确的*/
    router.push({
        path: "/SearchMsg"
    })

}
// toSearchMsg()   //这里调用看看会发生什么，好家伙，不用点击直接跳转



//搜索框标题盒子，placeholder里面动态显示的视频标题
var MiddleCardTitle = reactive({
    data: []
})
// 轮播图数据盒子
var bannerList = reactive({
    list: []
})
//推荐位数据盒子
var recoPositionList = reactive({
    list: []
})
// 分类数据盒子
var categoryList = reactive({
    list: []
})
onMounted(() => {
    // 为了获取热门推荐的title，这里引入了 getRecommend()
    const getMiddleCard = () => {
        getRecommend()
            .then(res => {
                console.log("推荐数据111", res)   //为什么没有打印,因为没有调用
                var data = res.data.data
                MiddleCardTitle.data = data.children[1].children[0].model.resource.title
                console.log(MiddleCardTitle)
            })
    }
    // 这里调用了上面的函数
    getMiddleCard()
    // 获取数据
    getCategory()
        .then(res => {
            console.log("分类", res)
            // var bannerData=res.data.data.banners
            // var cateData=res.data.data.categories
            // var recoPositionData=res.data.data.recommended_position
            bannerList.list = res.data.data.banners
            recoPositionList.list = res.data.data.recommended_position
            categoryList.list = res.data.data.categories
        })
    // 

})
//  点击分类跳转
 function toRelated(id,name){
    router.push({
       path:'/cateDetails',
        query:{
            id:id,
            category_name:name
        }
    })
 }

</script>



<template>
    <!-- 搜索框 ,要求不随滚动条移动而移动-->
    <div class="search">
        <!-- placeholder里面应该动态显示后台给予的热门推荐条 -->
        <van-search class="van-search" value="{{ value }}" :placeholder="MiddleCardTitle.data"
            @click-input="toSearchMsg()"  style="background-color: #f0f0f0; width: 98%; height: 90%;"/>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
        <van-swipe v-if="bannerList.list.length > 0" autoplay="3000">
            <!-- 
                                    item.children.model.cover 的结果只是一个地址，肯定要放进src里面的啊
                                    <van-swipe-item v-for="(item,index) in bannerList.list" :key="index">{{ item.children.model.cover }}</van-swipe-item> 
                            -->
            <van-swipe-item v-for="(item, index) in bannerList.list" :key="index" v-if="bannerList
                .list">
                <img class="image" :src="item.cover" alt="">
            </van-swipe-item>
            <template #indicator="{ active, total }">
                <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
            </template>
        </van-swipe>

    </div>
    <!-- 推荐位 ，四周呈现阴影效果-->
    <div class="reco" v-if="recoPositionList.list.length > 0">
        <div class="list" v-for="(item, index) in recoPositionList.list" :key="index">
            <img :src="item.icon" alt="">
            <p>{{ item.title }}</p>
        </div>
    </div>
    <!-- 作品,点击跳转相关页面(新页面,用组件) -->
    <div class="piece">
        <h>作品</h>
        <div class="cate" v-if="categoryList.list.length > 0">
            <div class="cateList" v-for="item in categoryList.list" @click="toRelated(item.id,item.category_name)">
                <img :src="item.cover" alt="">
                <p>{{ item.category_name }}</p>
            </div>


        </div>
    </div>
    <div class="blank"></div>
</template>



<style scoped>
* {
    padding: 0;
    margin: 0;
}

.search {
    top: 0;
    position: sticky;
    height: 40px;
    /* padding-bottom: 2px; */
    /* margin-bottom: 12px; 两个position会覆盖*/
}
.van-search{
    /* 无用 */
    background-color: gray;
}
.custom-indicator {
    /* position: absolute;  盖住顶部固定的搜索框了,为什么去掉还是盖住 */
    right: 5px;
    bottom: 5px;
    /* padding: 2px 5px; */
    font-size: 15px;
    color: white;
    padding-bottom: 10px;
    padding-right: 15px;
}
.banner{
    margin-left: 7px;
}
.reco {
    display: flex;
    padding-bottom: 10px;
}

.list {
    margin-left: 20px;
    margin-top: 15px;
    padding-left: 17px;
}

.list>img {
    width: 40%;
    padding-left: 4px;
}

h{
    font-size: 16px;
    font-weight: 700;
    margin-left: 13px;
   
}


.cate {
    /* 固定盒子大小 */
    box-sizing: border-box;
    width: 375px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 10px;
}

.cateList>img {
    width: 170px;
    margin: 0 8px;
    border-radius: 7px;
    /* position: relative;  图片盖住顶部固定的搜索框了*/


}

.cateList>p {
    /* 谁有absolute,谁就可以相对于固定的全局页面而移动 */
    /* relative会盖住别的position样式 */
    position: absolute;
    margin-top: -120px;
    color: white;
    margin-left: 20px;

}

.blank {
    height: 70px;
}</style>