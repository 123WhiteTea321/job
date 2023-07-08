<script setup>

import { getNoteList, getNoteDetails, getNoteComment, getNoteImg } from '../api/note'
import { ref, reactive, onMounted } from 'vue'
import { formatepublishtime } from '../utils/util'
import { useRouter, useRoute } from 'vue-router';
var router = useRouter()
var route = useRoute()
// 分享面板
const showShare = ref(false);
const options = [
    [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
    ],
    [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' },
    ],
];

// 跳转到用户界面(要不要query后面再说)
function toUserInfo(id) {
    router.push({
        path: '/userInfo',
        query: {
            id: id
        }
    })
}
// 跳转到手记详情页面
function toNoteDetails(id) {
    router.push({
        path: '/noteDetails',
        query:{
            id:id
        }
    })
}
// 盒子
var noteList = reactive({
    list: []
})
var bool = ref(false)

onMounted(() => {
    getNoteList()
        .then(res => {
            console.log("111", res)
            noteList.list = res.data.data.list
            bool.value = true
        })
 
    
})

</script>


<template>
    <div class="note">
        <div class="top">
            <div class="top-title">手记</div>
            <div class="blank"></div>
        </div>

        <div class="cards" v-if="bool">
            <div class="cardList" v-for="item in noteList.list" v-if="noteList.list.length > 0">
                <!-- 卡头 -->
                <div class="card-top">
                    <div class="avatar"><img :src="item.user.avatar" alt="" @click="toUserInfo(item.user.id)"></div>
                    <div class="name-time">
                        <div class="name">{{ item.user.username }}</div>
                        <div class="time">{{ formatepublishtime(item.addtime) }}</div>
                    </div>
                    <div class="share">
                        <div class="iconfont icon-gengduo-shuxiang" @click="showShare = true"></div>
                    </div>
                </div>
                <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" />

                <!-- 卡身 -->
                <div class="card-body" @click="toNoteDetails(item.id)">
                    <div class="title" v-if="item.title">
                        {{ item.title }}
                    </div>
                    <div class="content">
                        {{ item.content }}
                    </div>
                    <!-- 懂了，v-for在list层，display在box层 -->
                    <div class="img-box" v-if="item.images">
                        <div class="imgList" v-for="(it, index) in item.images.slice(0, 3)" :key="index">
                            <!-- cannot read ...都是数据加载不出来的问题 -->
                            <img :src="it" alt="">
                        </div>
                    </div>
                    <div class="img-box2" v-else="item.article.cover">
                        <img :src="item.article.cover" alt="">
                        <div class="img-info">
                            <!-- <div class="img-infoTitle"  v-if="item.article.share_info.title">
                                    {{ item.article.share_info.title }}
                                </div> -->

                            <p>@{{ item.user.username }}</p>
                        </div>
                    </div>
                </div>
                <!-- 卡尾 -->
                <div class="card-bottom">
                    <div class="like"> <span class="iconfont icon-dianzan"></span>
                        <p>{{ item.count.count_liked }}</p>
                    </div>

                    <div class="comment"><span class="iconfont icon-pinglun"></span>
                        <p>{{ item.count.count_commented }}</p>
                    </div>
                    <div class="shared"><span class="iconfont icon-zhuanfa" @click="showShare = true"></span>
                        <p>{{ item.count.count_shared }} </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="blank2"></div>
    </div>
</template>






<style scoped lang="less">
.cards{
    margin-top: 50px;
}
/deep/.van-overlay {
    opacity: 80%;
    // background-color:var;
}

/* 顶部 */
.note {
    background-color: #f2eeee;
    box-sizing: border-box;
    width: 375px;
    overflow-x: hidden;
}

.top {
    background-color: white;
    border-bottom: 1px solid rgb(242, 242, 242);
    width: 375px;
    height: 44.8px;
    position: fixed;
    top: 0px;

}

.top-title {
    font-size: 17px;
    font-weight: 800;
    margin-left: 180px;
    /* margin-top: 14px; */
    padding-top: 8px;
}

.blank {
    height: 12px;
}

.card-top {
    display: flex;
}

.name-time {
    margin-left: 11px;

}

.name {
    width: 130px;

}

.time {
    font-size: 11px;
    margin-top: 7px;
    font-weight: 400;
    color: #a2a7b1;
    width: 70px;
}

.share {
    margin-left: 160px;
    margin-top: 15px;
}


/* 中部 */
.cardList {
    background-color: white;
    margin-top: 8px;
    padding-left: 10px;
    padding-right: 8px;
    padding-top: 10px;
}

.avatar>img {
    width: 40px;
    border-radius: 25px;
}

.title {
    font-size: 15px;
    margin-top: 14px;
    font-family: 黑体;
}

.content {
    font-size: 13px;
    margin-top: 5px;
    /* 多行溢出变成省略号 */
    /*1. 超出的部分隐藏 */
    overflow: hidden;

    /*2. 文字用省略号替代超出的部分 */
    text-overflow: ellipsis;

    /* 3. 弹性伸缩盒子模型显示 */
    display: -webkit-box;

    /* 4. 限制在一个块元素显示的文本的行数 */
    -webkit-line-clamp: 3;

    /* 5. 设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-box-orient: vertical;
}

.img-box {
    display: flex;
    /* justify-content: space-around; */
    justify-content: space-between;
    /* overflow-x: hidden; */
    /* flex-direction: row; */
    /* flex-wrap: nowrap; */
    padding-top: 10px;

}

.imgList>img {
    width: 112px;
    height: 130px;
    border-radius: 3px;
}

.img-box2 {
    display: flex;
}

.img-box2>img {
    padding-bottom: 10px;
    width: 180px;
    height: 100px;
    border-radius: 3px;
}

.img-info {
    width: 170px;
    height: 100px;
    background-color: #f3f4f5;
}

.img-infoTitle {
    margin-left: 11px;
    padding-top: 10px;
}

.img-info>p {
    margin-left: 11px;

}

/* 底部 */
.card-bottom {
    display: flex;
    justify-content: space-around;
    padding-top: 0px;
    font-size: 13px;
    border-top: solid 1px rgb(243, 242, 242);
    padding-bottom: 10px;
}

p {
    margin-top: 16px;
    margin-left: 2px;
}

.shared {
    display: flex;
}

.icon-zhuanfa {
    padding-top: 14px;
}

.comment {
    display: flex;
}

.icon-pinglun {
    padding-top: 14px;

}

.like {
    display: flex;
}

.icon-dianzan {
    padding-top: 14px;

}

.blank2 {
    height: 60px;
}
</style>