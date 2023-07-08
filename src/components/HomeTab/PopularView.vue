<script setup>
import { getHot } from '../../api/home'
import { ref, reactive, onMounted } from "vue"
import { formateCountView, formatetime } from '../../utils/util'
import BigCard from '../BigCard.vue';

//轮播图数据盒子
var bannerList = reactive({
    list: []
})

//分类盒子
var cateList = reactive({
    list: []
})
//大卡片数据盒子
var bigCardList = reactive({
    list: []
})
onMounted(() => {
    getHot()
        .then(res => {
            console.log("getHot", res)
            var data = res.data.data.children

            //处理轮播图数据
            var bannerIndex = data.findIndex((item) => item.type == 'uiBanner')
            bannerList.list = data[bannerIndex].children
            // console.log("111",bannerList.list)

            //处理分类盒子数据
            var cateIndex = data.findIndex((item) => item.type == 'uiFunction')
            cateList.list = data[cateIndex].children
            console.log("222", cateList.list)

            //处理大卡片数据
            data.forEach((item)=>{
               if(item.type=='uiBigCard'){
                bigCardList.list.push(item)
               }
            })
            console.log("123",bigCardList.list)

        })
})

 
</script>



<template>
    <div class="hot">
        <!-- 轮播图 -->
        <van-swipe v-if="bannerList.list.length > 0" autoplay="3000">
            <!-- 
                    item.children.model.cover 的结果只是一个地址，肯定要放进src里面的啊
                    <van-swipe-item v-for="(item,index) in bannerList.list" :key="index">{{ item.children.model.cover }}</van-swipe-item> 
                -->
            <van-swipe-item v-for="(item, index) in bannerList.list" :key="index" v-if="bannerList
                .list">
                <img class="image" :src="item.model.cover" alt="">
            </van-swipe-item>
            <template #indicator="{ active, total }">
                <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
            </template>
        </van-swipe>
        <!-- 分类 :第三个icon图标有问题，可以用动态类？或者数组来做（参考recommendview的数组分类法），或者干脆直接硬写4个img-->
        <!-- <div class="cate" v-if="cateList.list.length>0">
            <span class="list" v-for="(item,index) in cateList.list" :key="index" >
                <img :src="item.model.icon" alt=""   >
                <p>{{ item.model.title }}</p>
            </span>
        </div> -->
        <div class="cate" >
            <span class="list" >
                <img src="https://oss-xpc6.xpccdn.com/default/Q14gOkU59kQFoEjFdaIQfvIo5Gvy7cA1fOQdSPD9.png" alt=""   >
                <p>周榜单</p>
            </span>
            <span class="list2" >
                <img src="http://xinpianchang.oss.aliyuncs.com/home_hot_icon/cate_hot_3x.png" alt=""   >
                <p>分类热门</p>
            </span><span class="list1" >
                <img src="https://xinpianchang.oss.aliyuncs.com/home_hot_icon/cate_selection_3x.png" alt=""   >
                <p>分类精选</p>
            </span><span class="list" >
                <img src="https://xinpianchang.oss.aliyuncs.com/home_hot_icon/vmovier_3x.png" alt=""   >
                <p>场库精选</p>
            </span>
        </div>

         <!-- 大卡片 -->
         <BigCard :bigList="bigCardList.list"></BigCard>



    </div>
</template>



<style>
.list2>img{
    width: 63%;
}
.list1>img{
  width: 97%;
}

.hot {
    background-color: #f7f7f7;
}

.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    /* padding: 2px 5px; */
    font-size: 15px;
    color: white;
    padding-bottom: 10px;
    padding-right: 15px;
}

.image {
    width: 96%;
    margin-left: 7px;
    border-radius: 5px;
}
.cate{
    display: flex;
    justify-content: space-between
}
.list{
   margin-left: 20px; 
    
}
.list1{
   margin-left: 7px; 
   margin-right: 10px;

}
.list>img{
    width: 65%;
    /* padding-left: -13px; */
    /* margin-left: -6px; */
}
p{
    font-size: 13px;
    /* margin-left: 5px; */
    align-items: center;
}
</style>
