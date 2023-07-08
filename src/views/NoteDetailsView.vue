<script setup>
import Related from '../components/RelatedVideo.vue';
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { getNoteList, getNoteDetails, getNoteComment, getNoteImg } from '../api/note'
import { formatepublishtime } from '../utils/util';
var router = useRouter()
var route = useRoute()

const value = ref('');

// 
var noteDetailsList = reactive({
    list: []
})
var commentsList = reactive({
    list: []
})
onMounted(() => {
    // 获取手记内容详情
    getNoteDetails(route.query.id)
        .then(res => {
            console.log("手记内容详情", res)
            noteDetailsList.list = res.data.data
        })

    //获取手记评论列表
    getNoteComment(route.query.id)
        .then(res => {
            console.log("手记评论详情", res)
            commentsList.list = res.data.data
        })

    // 手记内容图片信息（尺寸等）
    // getNoteImg()
    //     .then(res => {
    //         console.log("444", res)
    //     })



})

const back = () => {
    router.back()
}

</script>

<template>
    <div class="noteDetails" v-if="noteDetailsList.list.user">
        <div class="top">
            <div class="top-left">
                <div class="iconfont icon-fanhui" @click="back()"></div>
                <img :src="noteDetailsList.list.user.avatar" alt="" class="user-avatar">
                <div class="name">{{ noteDetailsList.list.user.username }}</div>
            </div>
            <div class="top-right">
                <div class="notice">+关注</div>
                <div class="iconfont icon-zhuanfa"></div>
            </div>
        </div>
        <div class="mid">
            <div class="imgbox">
                <div class="imgs" v-for="item in noteDetailsList.list.images">
                    <img :src="item" alt="">
                </div>
            </div>
            <div class="title">{{ noteDetailsList.list.title }}</div>
            <div class="text">
                {{ noteDetailsList.list.content }}</div>
            <div class="time">{{ formatepublishtime(noteDetailsList.list.addtime) }}</div>
        </div>
        <div class="count">共{{ commentsList.list.length }}条评论</div>
        <div class="comments-tip">
            <div class="ava-input1">
                <div class="iconfont icon-morentouxiang"></div>
                <div class="input1">
                    <van-cell-group inset>
                        <van-field v-model="value" class="field1" placeholder="说说你的看法吧~" />
                    </van-cell-group>
                </div>
            </div>
            <div class="comments" v-for="item in commentsList.list" v-if="commentsList.list">
                <!-- 这个用视频那边的样式就好了 -->
                <div class="comments-item">
                    <div class="left">
                        <img :src="item.userDetail.avatar_big" alt="">
                    </div>
                    <div class="mid2">
                        <div class="name">{{ item.userDetail.nickname }}</div>
                        <div class="content">{{ item.contentText }} </div>
                        <div class="create-time">{{ item.createTime }}</div>
                    </div>
                    <div class="right">
                        <span class="iconfont icon-dianzan"></span>
                    </div>

                </div>
            </div>
        </div>
        <div class="blank">暂时没有更多了</div>
        <div class="bottom">
            <div class="input-liked-count_comments">
                <div class="input">
                    <!-- 输入框 -->
                    <van-cell-group inset>
                        <van-field v-model="value" class="field2" placeholder="说点什么吧~" />
                    </van-cell-group>
                </div>
                <div class="liked">
                    <div class="iconfont icon-dianzan"></div>
                    <p>{{ noteDetailsList.list.count.count_liked }}</p>
                </div>
                <div class="count_comments">
                    <div class="iconfont icon-pinglun"></div>
                    <p>{{ noteDetailsList.list.count.count_commented }}</p>
                </div>
            </div>
        </div>
        <div class="blank2"></div>
    </div>
</template>

<style scoped lang="less">
.top {
    padding-top: 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    height: 40px;
    // 将盒子固定在顶部
    position: fixed;
    top: 0;
    background-color: white;
    width: 375px;
}

.top-left {
    display: flex;
    margin-left: 10px;
    margin-right: 10px;

    .name {
        margin-left: 5px;
        font-size: 12px;
        margin-top: 4px;
    }

    .icon-fanhui {
        margin-top: 2px;
    }

}

.user-avatar {
    width: 25px;
    height: 25px;
    border-radius: 15px;
    margin-left: 10px;

}

.top-right {
    display: flex;
    // justify-content: space-around;
    padding-right: 15px;

    .icon-zhuanfa {
        margin-top: 2px;

    }
}

.notice {
    margin-right: 13px;
    width: 68px;
    background-color: white;
    border: 1px solid red;
    border-radius: 20px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: red;
    font-size: 12px;
}

.mid {
    padding-top: 8px;
    margin-right: 10px;
    margin-left: 10px;
    border-bottom: 1px solid #e6e6e6;
    margin-top: 50px;
}

.imgbox {

    // display: flex;
    // justify-content: space-between;
    // box-sizing: border-box;
    // overflow: hidden;
    
//grid-template-columns: repeat(3, 1fr); 这一句代码是使用 CSS Grid 布局来定义一个包含 3 列的网格布局。
//repeat 函数用于重复一个模式，有两个参数：第一个参数指定要重复的次数，第二个参数指定要重复的模式。

//repeat(3, 1fr) 表示将 1fr 这个模式重复 3 次，即将页面分成 3 列，并且每列的宽度都为 1fr（即占据剩余空间的比例），这样就可以实现九宫格布局了。

//fr是 CSS Grid 中的一种新的长度单位，它表示可用空间的一部分。例如，如果一个元素的宽度为 1fr，则它的宽度将等于所有 1fr 的总和所占据的空间的一部分。
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;

}

.imgs {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}

.imgs>img {
    width: 90px;
    height: 90px;
}

.title {
    font-size: 15px;
    font-family: 黑体;
}

.text {
    font-size: 13px;
}

.time {
    font-size: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.ava-input1 {
    margin-left: 10px;
    display: flex;
}

.icon-morentouxiang {
    //    width: 130px;
    font-size: 30px;
}

.count {
    font-size: 13px;
    padding-top: 10px;
    margin-left: 10px;
    padding-bottom: 10px;
}

.field1 {
    border-radius: 30px;
    background-color: #f3f4f5;
    width: 300px;
}


/* 评论 */
.comments-item {
    margin-top: 20px;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 10px;


}

.left {
    width: 30px;
    margin-left: 10px;

    img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }
}

.mid2 {
    width: 80%;
    margin-left: 10px;

    .name {
        font-size: 10px;
        font-size: 13px;
        color: #979595;
    }

    .content {
        font-size: 13px;
    }

    .create-time {
        font-size: 3px;
        font-size: 12px;

    }
}

.right {
    // width: 40px;
    width: 10%;
    display: flex;
    flex-direction: column;
    // margin-right: 0;
    // justify-content: flex-end
    justify-content: space-between;
    align-items: flex-end;
    margin-right: 10px;
    // margin-left: 50px;

}

// 底部
.bottom {
    position: fixed;
    bottom: 0;
    background-color: white;
}

.bottom>.icon-dianzan {
    font-weight: 200;
    font-size: 20px;
    color: #333333;
}

.blank {
    height: 70px;
    font-size: 13px;
    margin-left: 150px;
    margin-top: 15px;
}

.input-liked-count_comments {
    display: flex;
    width: 375px;
}

.liked {
    display: flex;
    width: 44px;
    margin-top: 11px;

    p {
        margin-top: 6px;

    }
}

.count_comments {
    width: 36px;
    display: flex;
    margin-top: 11px;

    p {
        margin-top: 5px;

    }
}

p {
    margin-top: 11px;
}

.field2 {
    border-radius: 40px;
    background-color: #f3f4f5;
    width: 260px;
    height: 35px;
}

// .blank2 {
//     height: 15px;
// }</style>