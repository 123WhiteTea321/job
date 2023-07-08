<script setup>
import { useRouter } from 'vue-router';
// import { Toast } from 'vant';
// import { showToast } from 'vant';  //导不导入下面都不行
const router = useRouter()


const jumptoLogin = () => {
    router.push({
        path: '/login',
    }).then(() => {
        router.go(0)
    })
}
const toCollect = () => {
    router.push({
        path: "/mycollect"
    })
}
// 1.不行
// const showToast = () => {
//     this.$toast( '我是需要提示的文字')
// }
// 2.不行
// function openmes() {
//       this.$toast('弹一个轻提示')
//     // showToast("1111")
// }
// 3.不行
// export default {
//     data() {
//         return {
//             msg: ''
//         }
//     },
//     // 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
// 4.不行
    // methods: {
    //     // 普通文字提示
    //    function showToast() {
    //         this.$toast({
    //             message: '我是需要提示的文字',
    //         });
    //     }
    // }
// }

</script>

<template>
    <div class="user">
        <div class="top">
            <div class="iconfont icon-wode"></div>
            <p @click="jumptoLogin">点击登录</p>
        </div>
        <div class="mid">
            <div class="followee">
                <p class="count">0</p>
                <p class="text">关注</p>
            </div>
            <div class="follower">
                <p class="count">0</p>
                <p class="text">粉丝</p>
            </div>
        </div>
        <div class="bottom">
            <van-cell-group inset>
                <van-cell title="我的收藏" is-link @click="toCollect()" />
                <van-cell title="我的喜欢" is-link @click="showToast()" />
                <van-cell title="浏览记录" is-link />
                <van-cell title="关于我们" is-link />
            </van-cell-group>
        </div>
        <!-- 下面两个也都不行 -->
        <!-- <van-button type="primary" @click="openmes()">弹出轻提示</van-button> -->
        <!-- <van-button type="primary" @click="showToast()">弹出轻提示</van-button> -->

    </div>
</template>



<style scoped lang="less">
.user {
    background-color: #f7f7f7;
    height: 2000px;

}

.top {
    display: flex;
    padding: 34px 0 0 20px;
    background-color: rgb(245, 229, 232);
}

.icon-wode {
    border-radius: 55px;
    font-size: 55px;
    font-weight: 200;
    background-color: rgb(223, 220, 216);
}

p {
    margin: 0 0 0 15px;
    margin-top: 18px;
    font-size: 15px;
}

.mid {
    display: flex;
    // justify-content: center;
    background-color: rgb(245, 229, 232);

}

.followee {
    border-right: 1px solid grey;
    display: flex;
    flex-direction: column;
    padding: 0px 90px 0 55px;

    .text {
        margin-bottom: 20px;

        font-size: 12px;
        flex-wrap: wrap;
    }
}

.follower {
    padding: 0px 55px 0 90px;
    display: flex;
    flex-direction: column;

    .text {
        margin-bottom: 20px;
        font-size: 12px;
        flex-wrap: wrap;
    }
}

.bottom {
    background-color: #f7f7f7;
}
</style>