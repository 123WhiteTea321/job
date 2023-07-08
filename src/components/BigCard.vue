<script setup>
import { formateCountView, formatetime } from '../utils/util'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const props = defineProps({
    bigList: Array
})
function toRelated(id) {
    router.push({
        path: '/play',
        query: {
            id: id
        }
    })
}
</script>



<template>
    <div class="list" v-for="(it, index) in bigList" :key="index">
        <div class="item" @click="toRelated(it.children[0].model.resource.id)">
            <div class="avatar-name-more">
                <div class="avatar-name">
                    <div class="avatar" v-if="it.children[0].model.resource.author.userinfo.avatar"><img
                            :src="it.children[0].model.resource.author.userinfo.avatar" alt=""></div>
                    <div class="name" v-if="it.children[0].model.resource.author.userinfo.username">{{
                        it.children[0].model.resource.author.userinfo.username }}</div>
                </div>
                <div class="more"><span class="iconfont icon-androidgengduo"></span></div>
            </div>
            <div class="title">{{ it.children[0].model.resource.title }}</div>
            <div class="img"><img :src="it.children[0].model.resource.cover" alt=""></div>
            <div class="watch-time">
                {{ formateCountView(it.children[0].model.resource.count.count_view) }}观看|{{ formatetime(
                    it.children[0].model.resource.duration) }}
            </div>
            <div class="collect-comment-like">
                <div class="collect"><span class="iconfont icon-shoucang"></span>
                    <p> {{ it.children[0].model.resource.count.count_collect }}</p>
                </div>
                <div class="comment"><span class="iconfont icon-pinglun"></span>
                    <p> {{ it.children[0].model.resource.count.count_comment }}</p>
                </div>
                <div class="like"> <span class="iconfont icon-dianzan"></span>
                    <p> {{ it.children[0].model.resource.count.count_like }}</p>
                </div>
            </div>
        </div>

    </div>
</template>



<style scoped>
.list {
    width: 96%;
    background-color: white;
    margin-left: 6px;
    border-radius: 10px;
    /* padding-bottom: 25px; */

}

.avatar-name-more {
    display: flex;
    justify-content: space-between;

}

.avatar-name {
    display: flex;
    margin-left: 10px;
    padding-top: 15px;
}

.name {
    padding-top: 10px;
    font-size: 11px;
    padding-left: 10px;
}

.avatar>img {
    width: 35px;
    border-radius: 25px;
}

.more {
    padding-top: 15px;
    padding-right: 10px;
}

.title {
    margin: 10px 0 10px 10px;
}


.img>img {
    width: 94%;
    margin-left: 6px;
    position: absolute;
}

.watch-time {
    position: relative;
    margin-top: 48%;
    margin-left: 70%;
    color: white;
    font-size: 12px;
}

.collect-comment-like {
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    font-size: 13px;
    /* padding-bottom: 10px; */
}

p {
    margin-top: 16px;
    margin-left: 2px;
}

.collect {
    display: flex;
}

.icon-shoucang {
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

.item {
    /* padding-bottom: 10px; */
    margin-bottom: 10px;
}
</style>
