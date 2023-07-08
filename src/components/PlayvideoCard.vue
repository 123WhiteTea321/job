<script setup>

import { formateCountView, formatetime, formatetimecapsule } from '../utils/util'
import { getplaydetail, getcomments, getsimilarvideo } from '../api/play';
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()                     //userRoute()里面可以找到MiddleCard.vue里面路由(router-link)上传的参数
const router = useRouter()                   //此处useRouter是用于返回上一个页面

const props = defineProps({
    playVideoList: Array
})
// 视频组件
var bool = ref(false)
var options = reactive({})
// 转发组件
const showShare = ref(false);
const option = [
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

//tab标签页
const active = ref(0);

//类型标签容器
var categories = reactive({
    list: []
})

//是否点赞
var isliked = ref(false)

//评论容器
var commentslist = reactive({
    list: []
})
//相似视频容器
var similarvideolist = reactive({
    data: []
})

//相似视频跳转。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
// const routeId = ref(useRoute().query.id)
// console.log(routeId.value);
//相似视频跳转。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

onMounted(() => {
    console.log("useRoute", route)                 //route里面可以找到route.query.id
    getplaydetail(route.query.id)      //将useRoute收到的id通过getplaydetail传到play.js原函数的getplaydetail进行拼接
        .then(res => {
            console.log("播放详情", res)
            playdetail.data = res.data.data
            // playdetail = res.data.data
            //ref值要用.value才能获取到
            console.log("容器数据", playdetail.data)
            // console.log(playdetail.data.cover)


            //视频没法显示，是因为数据没加载完，playdetail.data收不到，这里用响应式就好了，cannot read 'xxx'，都是数据没加载完的问题
            var obj = {
                width: '100%', //播放器宽度
                height: '200px', //播放器高度
                color: "#409eff", //主题色
                title: '', //视频名称
                src: playdetail.data.video.content.progressive[0].url, //视频源
                muted: false, //静音
                webFullScreen: false,
                speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
                autoPlay: false, //自动播放
                loop: false, //循环播放
                mirror: false, //镜像画面
                ligthOff: false,  //关灯模式
                volume: 0.3, //默认音量大小
                control: true, //是否显示控制
                controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pageFullScreen', 'fullScreen'] //显示所有按钮,'pip',
            }
            options = obj

            categories.list = playdetail.data.categories
            bool.value = true


            islikeVideo()
        })

    getcomments(route.query.id)
        .then(res => {
            console.log("评论详情", res)
            commentslist.list = res.data.data.list
        })



    getsimilarvideo(route.query.id)     //传的参数还是这个？
        .then(res => {
            console.log("相关视频", res)
            similarvideolist.data = res.data.data.list
            //  console.log(similarvideolist.data)  

        })

})


//相似视频跳转。。。。。。。。。。。。。。。。。。。。。。。。。。。。
const toRelated = (id) => {
    router.push({
        path: '/play',
        query: {
            id: id
        }
    }).then(() => {
        router.go(0)
    })
}
console.log('router', router)
//相似视频跳转。。。。。。。。。。。。。。。。。。。。。。。。。。。。



const islikeVideo = function () {
    //核心思想是本地存储中的liked不变，随便你点进点出，点赞状态都不会改变  ,Json.parse要把字符串转成对象才能获取里面的id
    var arr = JSON.parse(localStorage.getItem("liked"))
    //这里将arr里面的每一条liked记录（每一条点赞了视频的记录）拿出来对照，如果相同就说明
    if (arr) {
        arr.forEach((item) => {
            if (playdetail.data.id == item.id) {
                playdetail.data.count = item.count
                isliked = item.isliked
            }
        })
    }


}


//返回上一个页面
const goback = function () {
    // router.back()
    // .then(() => {
    //     router.go(0)
    // })
    router.go(-1)     //效果同上
    //    .then(()=>{
    //     router.go(0)
    //    })

}

/*
点赞：
    退出去再进来能看到之前的点赞记录
    在本地存储点赞记录

 */
const like = function (id, count) {
    //写一个假的token
    var str = 'djfhweiklfjsdjkfljsdoiw=jbhjsacbaskjclaksdnc'
    localStorage.setItem("token", str)
    //点赞之前判断用户是否登录
    var token = localStorage.getItem('token')
    if (token) {
        console.log("验证成功")
        //为防止某条视频的点赞记录把上一条视频的点赞记录挤掉(因为之前用的是对象存储liked)，所以这里要改用arr数组来保存liked(点赞记录)
        var arr = JSON.parse(localStorage.getItem("liked")) || []

        //实现点赞的效果
        if (isliked.value) {
            //isliked=true走上面这条
            count.count_like = count.count_like -= 1

        } else {
            //isliked=false走下面这条
            count.count_like++
            // count.count_like= count.count_like+=1

            //将点赞记录保存到本地，这样退出再进来就能保存点赞记录了，注意此处要跟上面的islikeVideo函数连用
            arr.push({              //不能以复杂数据类型存到本地，因此需要json.stringify转成字符串
                id,
                count,
                isliked: true
            })
            localStorage.setItem("liked", JSON.stringify(arr))   //不能在push里面转换

        }

        playdetail.data.count = count                                 //count全部改变
        //playdetail.data.count.count_like=count.count_like            这种局部方式也可以啦
        isliked.value = !isliked.value

        console.log(playdetail.data.count)


    } else {
        console.log("验证失败")

        //验证失败的话跳转到登录页面
        router.push({
            path: '/login'
        })
    }
}



</script>



<template>
    <div class="play" v-if="bool">
        <!--  class="van-sticky"  使整块视频固定在顶部，随着滑动位置不变     -->
        <div class="video van-sticky">
            <div class="top">
                <span class="iconfont icon-fanhui" @click="goback"></span>
                <span class="iconfont icon-gengduo-shuxiang" @click="showShare = true"></span>
                <!-- 分享功能 
                      1.把这个van模板挖过来(必要)
                      2.把script挖过来
                      3.给iconfont图标绑定事件
                    -->
                <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="option" />

            </div>
            <vue3VideoPlay v-bind="options" :poster='playdetail.data.cover' />
        </div>

        <!-- 视频下面的Tab标签页功能 ,直接加class赋予color属性行不通,怎么改变标签栏高度呢-->
        <div class="bottom" v-if="playdetail.data">
            <van-tabs v-model:active="active" color="red">
                <van-tab title="简介">
                    <!-- 标题、类型和介绍 -->
                    <div class="video-info">
                        <div class="title">{{ playdetail.data.share_info.title }}</div>
                        <div class="type" v-if="categories.list[0].category_name && categories.list[0].sub.category_name">
                            <span>{{ categories.list[0].category_name }}-{{
                                categories.list[0].sub.category_name }}</span>
                            <div class="categories1" v-if="categories.list[1]">
                                <span>{{ categories.list[1].category_name }}-{{
                                    categories.list[1].sub.category_name }}</span>
                            </div>
                            <span>{{ formatetimecapsule(playdetail.data.publish_time) }}</span>
                            <span>{{ formateCountView(playdetail.data.count.count_view) }}次播放</span>
                        </div>
                        <div class="video-profile">
                            {{ playdetail.data.share_info.description }}
                        </div>
                    </div>
                    <!-- 点赞收藏转发 -->
                    <div class="video-operate">
                        <!-- 给点赞绑定事件 -->
                        <div class="operate-item" @click="like(playdetail.data.id, playdetail.data.count)">
                            <span v-if="!isliked" class="iconfont icon-dianzan "></span>
                            <span v-else="isliekd" class="iconfont icon-dianzan active"></span>
                            <p>{{ playdetail.data.count.count_like }}</p>
                        </div>
                        <div class="operate-item"> <span class="iconfont icon-shoucang"></span>
                            <p>{{ playdetail.data.count.count_collect }}</p>
                        </div>
                        <div class="operate-item"> <span class="iconfont icon-zhuanfa"></span>
                            <p>{{ playdetail.data.count.count_share }}</p>
                        </div>



                    </div>
                    <!-- 视频标签 -->
                    <div class="video-tags">
                        <div class="tags-item" v-for="item in playdetail.data.tags">
                            {{ item.name }}
                        </div>
                    </div>
                    <!-- 创作人 -->
                    <div class="creator-title">创作人</div>
                    <div class="creator">
                        <div class="box" v-for="item in playdetail.data.team" v-if="playdetail.data.team.length>0">
                            <div class="leftbox"><img
                                    :src="item.userinfo.avatar"
                                    alt=""></div>
                            <div class="midbox">
                                <div class="creatorname">{{item.userinfo.username}}</div>
                                <div class="job">{{item.role}}</div>
                            </div>
                            <div class="rightbox">
                                <div class="smallbox">关注</div>

                            </div>
                        </div> 
                        <div class="box"  v-else>
                            <div class="leftbox"><img
                                    :src="playdetail.data.author.userinfo.avatar"
                                    alt=""></div>
                            <div class="midbox">
                                <div class="creatorname">{{playdetail.data.author.userinfo.username}}</div>
                                <div class="job">{{playdetail.data.author.role}}</div>
                            </div>
                            <div class="rightbox">
                                <div class="smallbox">关注</div>

                            </div>
                        </div>
                    </div>

                    <!-- 相似视频 -->
                    <div class="similar-video">
                        <div class="similar-title">相似视频</div>

                        <!-- <Works :list="similarvideolist.data"></Works> -->


                        <ul class="boxlist" v-for="item in similarvideolist.data">
                            <!-- 注意同一页面不能用router-link来跳转，因为我们把那个数据请求不是放到生命周期里面的嘛，然后我们点击跳转以后呢，
                                        那个生命周期他没有第二次执行，所以说他的那个数据就没有变 -->
                            <!-- 相似视频跳转。。。。。。。。。。。。。。。。。。。。。。。 -->
                            <div class="similar-item" @click="$event => toRelated(item.id)">
                                <!-- 相似视频跳转。。。。。。。。。。。。。。。。。。。。。。。 -->

                                <div class="similar-left">
                                    <div class="similar-img">
                                        <img :src="item.cover" alt="">
                                        <h>{{ formatetime(item.duration)}}</h>
                                    </div>
                                </div>
                                <div class="similar-right">
                                    <div class="titlename">{{ item.title }}</div>
                                    <div class="similar-info">
                                        <p> 播放 {{ formateCountView(item.count.count_view) }} · 喜欢 {{
                                            item.count.count_like }}
                                        </p>
                                    </div>

                                    <div class="author">
                                        <div class="avatar-item">
                                            <div class="avatar" v-if="item.team_user_count > 0" v-for="it in item.team">
                                                <img :src="it.userinfo.avatar" alt="">
                                            </div>
                                            <div class="avatar" v-else>
                                                <img :src="item.author.userinfo.avatar" alt="">
                                            </div>

                                        </div>
                                        <div class="authors" v-if="item.team_user_count > 0">等{{ item.team_user_count
                                        }}位创作人
                                        </div>
                                        <div class="authors" v-else="item.team_user_count=0">等1位创作人</div>
                                    </div>
                                </div>
                            </div>
                        </ul>


                    </div>




                </van-tab>

                <van-tab :title="`评论${playdetail.data.count.count_comment}`">
                    <div class="comments" v-for="item in commentslist.list">
                        <div class="comments-item">
                            <div class="left">
                                <img :src="item.userInfo.avatar" alt="">
                            </div>
                            <div class="mid">
                                <div class="name">{{ item.userInfo.username }}</div>
                                <div class="content">{{ item.content }} </div>
                                <div class="time">{{ formatetimecapsule(item.addtime) }}</div>
                            </div>
                            <div class="right">
                                <span class="iconfont icon-androidgengduo"></span>
                                <span class="iconfont icon-dianzan">0</span>
                            </div>

                        </div>

                    </div>
                </van-tab>


            </van-tabs>

        </div>

    </div>
</template>



<style scoped lang="less">
.video {
    width: 100%;
    height: 210px;
    position: relative;

}

.top {
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 99;
    padding: 5px 10px;
    box-sizing: border-box;
}

.icon-fanhui,
.icon-gengduo-shuxiang {
    font-size: 18px;
    color: white;
}



// 好像对组件内的样式操作要加上/deep/
/deep/.van-tabs__wrap {
    height: 25px;
    border-bottom: 1px rgb(238, 235, 235) solid;
}

/deep/.van-tab__text {
    height: 20px;
}

.video-info {
    width: 375px;
    // margin-left: 20px;
    // margin-right: 15px;

    overflow: hidden;
    //父盒子加了 box-sizing: border-box属性，子盒子再加padding就不会显示滚动条了
    box-sizing: border-box;
    padding: 0 15px;

}

.title {
    font-size: 20px;
    font-weight: 800;
    font-family: 黑体;
    margin-top: 20px;

}

.type {
    width: 95%;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 100;
    margin: 15px 0;
    color: #A3A3A3;
    //    padding:15px 0;

}

.video-profile {
    width: 100%;
    font-size: 12px;
    font-weight: 400;
    padding: 0px 4px;
}

.video-operate {
    // box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 20px;
}

.operate-item {
    text-align: center;

}

p {
    font-size: 11px;
    margin: 2px;
}

.icon-dianzan,
.icon-shoucang,
.icon-zhuanfa {
    font-weight: 600;
    font-size: 20px;
}

.active {
    color: red;
}

.video-tags {
    margin-left: 5px;
    height: 40px;
    display: flex;
    border-bottom: 1px solid rgb(240, 235, 235);
    border-top: 1px solid rgb(240, 235, 235);
}

.tags-item {
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    background-color: #e6e2e2;
    color: #333030;
    padding: 0 13px;
    align-items: center;
    margin-right: 3px;
    margin-top: 10px;

}

.comments-item {
    margin-top: 20px;
    display: flex;
    // justify-content: space-between;
    // border-bottom: 1px black solid;
    border-top: 1px solid rgb(248, 245, 245);
    padding-top: 10px;

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

.mid {
    width: 80%;
    margin-left: 10px;

    .name {
        font-size: 10px;
    }

    .time {
        font-size: 3px;

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

.icon-androidgengduo,
.icon-dianzan {
    font-weight: 200;
    font-size: 20px;
    color: #333333;
}


.creator {
    margin-left: 20px;
    display: flex;
    // 限定盒子大小
    box-sizing: border-box;
    width: 360px;
    overflow: hidden;
    overflow-x: scroll;

}

.creator-title {
    margin: 15px 10px;
    font-size: 20px;
    font-weight: 800;
    font-family: 黑体;
    margin-top: 20px;

}

.box {
    width: 300px;
    display: flex;
    border: 1px solid #f5f3f3;
    height: 70px;
    padding-top: 20px;
    box-shadow: 4px 40px  rgb(238, 237, 237);
    margin-right: 12px;
}

.leftbox {
    padding-right: 10px;

    img {
        width: 50px;
        border-radius: 50px;
        padding-left: 5px;

    }
}

.midbox {
    width: 130px;
    //    align-items: center;
    text-align: center;
    // margin-left: -15px;
    padding-top: 5px;
}

.job {
    font-size: 10px;
    font-weight: 200;
    margin-left: -10px;
    color: #A5A5A5;
    padding-top: 2px;
}

.rightbox {
    width: 30%;
    // background-color: pink;
    padding-top: 10px;
    border-radius: 50px;
    text-align: center;
    margin-left: 15px;
    // margin-right: 10px;
    // padding-right: 70px;

}

.smallbox {
    width: 70px;
    height: 25px;
    line-height: 25px;
    background-color: pink;
    border-radius: 20px;
    font-size: 12px;
    margin-left: 10px;

}

.similar-video {
    margin-top: 20px;

}

.similar-title {
    margin-bottom: 15px;
    font-weight: 800;
    margin-left: 10px;
}

.similar-item {
    display: flex;
    margin-bottom: 20px;
}

.similar-left {
    margin-left: 10px;

    img {
        width: 160px;
        height: 90px;
        position: relative;
        border-radius: 5px;
    }

    h {
        position: absolute;
        color: rgb(253, 251, 251);
        font-size: 13px;
        margin-top: 67px;
        // margin-right: -15px;
        margin-left: -43px;
    }
}


.similar-right {
    //19 26 20
    height: 65px;
    margin-left: 10px;
    margin-right: 5px;
}

.titlename {
    height: 55%;
    font-size: 13px;
    font-weight: 800;
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

.similar-info {
    height: 26px;
    // text-align: center;
    display: flex;

    margin: 5px 19px 0 0;

}

.author {
    height: 20px;
    display: flex;
}

.avatar-item {
    width: 20px;
    display: flex;
    position: relative;

}

.avatar {
    margin-right: 15px;
    position: absolute;

    img {
        height: 15px;
        width: 15px;
        border-radius: 15px;
    }
}

.authors {
    font-size: 10px;
    color: #6B6B6B;
}
</style>