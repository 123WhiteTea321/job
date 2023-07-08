<script setup>
import { formateCountView, formatetime } from '../utils/util'
const props = defineProps({
    midList: Array
})
</script>

<template>

    <!-- 要做成组件，首先要有 defineProps接收参数，然后在别的vue页面只需引入组件并调用就行 -->
    <div class="cards">
    <router-link    
           :to="{
            path:'/play',
            query:{
                id:item.children[0].model.resource.id
            }
        }" 
        v-for="(item, index) in midList" 
        :key="index">
            <div class="carditem">
                <div class="cardimg">
                    <img :src="item.children[0].model.resource.cover" alt="">
                    <div class="cardinfo">
                        <!-- 用span标签能让它们排成一行 -->
                        <div class="view-count"><span class="iconfont icon-guankan"></span> <span>{{
                            formateCountView(item.children[0].model.resource.count.count_view) }}</span> </div>
                        <span class="like-count"><span class="iconfont icon-dianzan"></span><span>{{
                            item.children[0].model.resource.count.count_like
                        }}</span></span>
                        <span class="duration"><span>{{ formatetime(item.children[0].model.resource.duration)
                        }}</span></span>
                    </div>
                </div>
                <div class="cardtitle">
                    {{ item.children[0].model.resource.title }}
                </div>
                <div class="cardmore">
                    <span class="iconfont icon-gengduo-shuxiang"></span>
                </div>

            </div>

        </router-link>
    </div>
</template>

<style scoped lang="less">
.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.carditem {
    width: 163px;
    background-color: #fff;
    padding-bottom: 5px;
    /* 圆角属性，通常和下面那个连用 */
    border-radius: 5px;
    overflow: hidden;
    height: 184px;
}

.cardimg {
    width: 100%;
    position: relative;
}

/* 限制盒子不会影响图片大小，要对图片本身进行限制 */
.cardimg>img {
    width: 172px;
    height: 96px;
}

.cardinfo {
    /* width: 172px;
    height: 27px; */
    bottom: 10px;
    left: 10px;
    position: absolute;
    color: white;
    display: flex;
    font-size: 12px;
    width: 90%;
    justify-content: space-between;
}

.icon-guankan,
.icon-dianzan {
    /* 设置字体大小 */
    font-size: 12px;
}

.cardtitle {
    font-size: 14px;
    padding: 10px 12px 5px 12px;
    /* 行高 */
    line-height: 21px;
    height: 40px;
    color: black;
    /* 多行溢出变成省略号 */
    /*1. 超出的部分隐藏 */
    overflow: hidden;

    /*2. 文字用省略号替代超出的部分 */
    text-overflow: ellipsis;

    /* 3. 弹性伸缩盒子模型显示 */
    display: -webkit-box;

    /* 4. 限制在一个块元素显示的文本的行数 */
    -webkit-line-clamp: 2;

    /* 5. 设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-box-orient: vertical;

}

.cardmore {
    /* display是讲内容在一行内怎么分布的，加了这个属性就可以点布局按钮实地调位置了 */
    display: flex;
    width: 96%;
    flex-direction: row-reverse;
    height: 25px;

}

.icon-gengduo-shuxiang {
    font-size: 20px;

}
</style>