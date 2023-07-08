<script setup>
import { ref, reactive, onMounted } from 'vue'
import { formatepublishtime, formateCountView } from '../utils/util'
import { useRouter, useRoute } from 'vue-router';
import { getNoteList, getNoteDetails, getNoteComment, getNoteImg } from '../api/note'

var router = useRouter()
var route = useRoute()
const back = () => {
    router.back()
}

const active = ref(0);
const value = ref(0)
const option = [
    { text: '默认排序', value: 0 },
    { text: '热门排序', value: 1 },
    { text: '最新上传', value: 2 },
];

// 盒子
var noteList = reactive({
    list: []
})

onMounted(() => {
    getNoteList()
        .then(res => {
            console.log("111", res)
            var data = res.data.data.list
            data.forEach((item) => {
                if (item.user.id == route.query.id) {
                    noteList.list.push(item)
                }
            })



        })


})
</script>

<template>
    <div class="userinfo" v-if="noteList.list.length > 0">
        <!-- 背景图 -->
        <div class="back-img">
            <img src="src\assets\img\u=2569297388,551721325&fm=253&fmt=auto&app=138&f=JPEG.webp" alt="">
        </div>
        <!-- 顶部 -->
        <div class="top-card">
            <div class="top">
                <div class="iconfont icon-fanhui" @click="back()"></div>
                <div class="iconfont icon-gengduo-shuxiang"></div>
            </div>
            <div class="body" v-for="item in noteList.list.slice(0, 1)">
                <div class="middle">
                    <div class="avatar" v-if="item.user.avatar">
                        <img :src="item.user.avatar" alt="">
                    </div>
                    <div class="name">{{ item.user.username }}</div>
                    <div class="info">
                        <div class="occupation-location">
                            <div class="occupation">{{ item.user.occupation }}</div>
                            <div class="location">{{ item.user.location.province.name }}</div>
                        </div>
                        <div class="discription">{{ item.user.verify_description }}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left">
                        <div class="popularity">
                            <p> {{ formateCountView(item.user.count.count_popularity) }} </p>
                            <h>人气</h>
                        </div>
                        <div class="fans">
                            <p>{{ item.user.count.count_follower }}</p>
                            <h>粉丝</h>
                        </div>
                        <div class="notice">
                            <p>{{ item.user.count.count_followee }}</p>
                            <h>关注</h>
                        </div>
                    </div>
                    <div class="right">关注</div>
                </div>
            </div>

        </div>
        <!-- 切换器:导航组件tab标签页-->
        <div class="bottom-card">
            <van-tabs v-model:active="active">
                <van-tab title="作品">
                    <!-- 后面怎么绑定并切换不同标签的视频呢 -->
                    <van-dropdown-menu active-color="#ee0a24">
                        <van-dropdown-item v-model="value" :options="option" />
                    </van-dropdown-menu>
                </van-tab>
                <!-- 下拉菜单 ：反馈组件-->
                <!-- 视频列表 -->
                <van-tab title="专辑">
                    <div class="album">专辑功能尚未开放~</div>
                </van-tab>
                <van-tab title="喜欢">内容 3</van-tab>
                <van-tab title="资料">内容 4</van-tab>
            </van-tabs>
        </div>

    </div>
</template>

<style scoped>
.back-img>img {
    width: 100%;
    height: 300px;
}

.top-card {
    padding-left: 15px;
    /* position: absolute; */
    margin-top: -300px;

}

.bottom-card {
    margin-top: 47px;
}

.top {
    display: flex;
    height: 25px;
    padding-top: 10px;
    justify-content: space-between;
}

.icon-fanhui {
    margin-left: 10px;
    color: white;
}

.icon-gengduo-shuxiang {
    color: white;
    margin-right: 10px;
}

.middle {
    padding-top: 15px;
}

.avatar>img {
    width: 55px;
    border-radius: 30px;
}

.name {
    padding-top: 10px;
    color: white;
}

.occupation-location {
    display: flex;
    padding-top: 10px;
    color: white;
    font-size: 13px;
}

.location {
    padding-left: 10px;
}

.discription {
    font-size: 13px;
    color: white;
    padding-top: 10px;

}

.bottom {
    display: flex;
    justify-content: space-between;
}

.left {
    display: flex;

}

p {
    padding-right: 15px;
    color: white;
    font-size: 12px;

}

h {
    /* padding-right: 10px; */
    color: white;
    font-size: 12px;

}

.right {
    width: 70px;
    height: 26px;
    border-radius: 14px;
    margin-top: 25px;
    background-color: #d55644;
    color: white;
    /* 字体左右居中 */
    text-align: center;
    /* 字体上下居中 */
    line-height: 26px;
    margin-right: 15px;
    font-size: 12px;
}

.album {
    font-size: 14px;
    margin-top: 90px;
    margin-left: 120px;
}
</style>