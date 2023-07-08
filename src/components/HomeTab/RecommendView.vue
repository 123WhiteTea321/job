
<script setup>
import { formateCountView, formatetime } from '../../utils/util'
import MiddleCard from '../MiddleCard.vue'     //没有export就不能用{}包裹
import { getRecommend } from '../../api/home'
import { onMounted, ref, reactive } from 'vue'         //onMounted是干嘛的？暂时理解成mount
// import {formatetime} from '../../utils/util'

//推荐页面数据的容器
var recommend = reactive({
    data: {}
})
//放轮播图数据的容器
var bannerList = reactive(     //直接获取到数组里面的对象，后续可以直接用 bannerList.xxx 了（但是这种没法正常显示轮播图啊）
    { data: [] }
)
// var bannerList = reactive([])   //获取到的是一个数组  （这种还能初次加载显示）


//放中等卡片数据的容器
var middleCardList = reactive({
    list: []
})

//放大卡片数据的容器
var bigcardList = reactive({
    list: []
})
//放广告数据的容器
var adList = reactive({
    list: []
})
//放推荐创作人的容器
var creatorlist = reactive({
    list: []
})



//生命周期处理数据      
onMounted(() => {
    getRecommend()
        .then(res => {                 //有request就.then()，才能获取数据
            console.log('recommend', res)
            var data = res.data.data.children      //data是数组，里面元素是对象
            // console.log(res.data.data.children[0]);


            /*处理轮播图数据*/
            var bannerIndex = data.findIndex(               //  数组用findIndex索取下标 ，传的是回调函数
                (item) => item.type == 'uiBanner'
            )
            // console.log(bannerIndex)
            bannerList.data = data[bannerIndex].children    //children是对象里的数组。因为无法显示，bannerList加了data，居然可以了
            // console.log(bannerList)                    //早先的bannerlist和后来的bannerlist.data都是数组类型，为什么要换一下？因为对象里的数组才能立刻响应

            /*处理中等卡片数据*/

            //   var middleCardIndex=data.findIndex(               
            //         (item) => item.type == 'uiMiddleCard'    
            //     )
            //     console.log(middleCardIndex)
            //    middleCardList=data[middleCardIndex].children
            //    console.log(middleCardList.length)

            data.forEach(item => {
                // console.log(item)      //不知道用什么数据的时候就打印看看
                if (item.type == 'uiMiddleCard') {
                    middleCardList.list.push(item)
                    // console.log(item)   // {type: 'uiMiddleCard', children: Array(1), attribute: {…}}

                }
            })
            // console.log(middleCardList.list)
            /*   中等卡片中插入大卡片做法
               obj:{
                   一：[0,1,2,3],
                   大：{big},
                   二：[4,5,6,7],
                   广告：{ad},
                   create:[创作人],
                   三：[8,9,10,11,12]
               }
            */
            var firstArr = []
            var secondArr = []
            var thirdArr = []
            middleCardList.list.forEach((item, index) => {
                //上面定义了一个recommend，相当于obj
                if (index >= 0 && index <= 3) {
                    firstArr.push(item)
                    recommend.data.first = firstArr

                } else if (index >= 4 && index <= 7) {
                    secondArr.push(item)
                    recommend.data.second = secondArr
                } else if (index >= 9 && index <= 16) {
                    thirdArr.push(item)
                    recommend.data.third = thirdArr
                }
            })
            console.log("333", recommend.data)


            /*处理大卡片数据方法1*/
            var bigcardIndex = data.findIndex(               //  数组用findIndex索取下标 ，传的是回调函数
                (item) => item.type == 'uiBigCardTop'
            )
            // console.log(bigcardIndex)
            if (data[bigcardIndex].children.length > 0) {
                bigcardList.list = data[bigcardIndex].children || []     //拿到大卡片数据了(有时候接口变了，大卡片数据不一定有，此时children报错)
            }
            // console.log( bigcardList.list)

            /*处理大卡片数据方法2,这种方法下面模板的item就要加上.children[0]了，而且大卡片不止一个*/
            // data.forEach(item => {
            //     // console.log(item)      //不知道用什么数据的时候就打印看看
            //     if (item.type == 'uiBigCardTop') {
            //         bigcardList.list.push(item)        
            //     }
            // })           
            // // console.log(bigcardList.list)           



            /*处理广告数据*/
            var adIndex = data.findIndex(item =>
                item.type == "uiBigCard"
            )
            adList.list = data[adIndex].children

            /*处理创作人数据*/
            var creatorIndex = data.findIndex(item =>
                item.type == "uiCollectionSlideOne"
            )
            // console.log(creatorIndex)
            creatorlist.list = data[creatorIndex].children
            console.log(creatorlist.list)
        })
})

</script>

<!--  -->
<!-- 剪切：ctrl+x   撤回：ctrl+z -->
<template>
    <div class="recommend">
        <!-- 轮播图 -->
        <div class="banner">
            <van-swipe v-if="bannerList" autoplay="3000">
                <van-swipe-item v-for="(item, index) in bannerList.data" :key="index">
                    <!-- (item,index)是为了消除警告，而且加了index才能正常显示？ -->
                    <img class="bannerImg" :src="item.model.cover" alt=""> <!--  给图片绑定class,加样式 -->
                    <!-- <span class="bannertitle">{{ item.model.title }}</span> -->
                    <div class="bannertitle">{{ item.model.title }}</div>
                </van-swipe-item>

                <template #indicator="{ active, total }">
                    <div class="custom-indicator"><span>{{ active + 1 }}/{{ total }}</span> </div>
                </template>
            </van-swipe>
        </div>
        <!-- 视频卡片  这里不要用routerlink去跳转，不然会变蓝-->
        <div class="videoCard">

            <MiddleCard :midList="recommend.data.first"></MiddleCard>
            <!-- 大卡片 -->
            <!-- 这里item=list[0]了 ，不要item in bigcardList.list[0],也不要item[0],item.list[0]等-->
            <router-link to="/play" v-for="(item, index) in  bigcardList.list" :key="index"
                v-if="bigcardList.list.length > 0">
                <div class="bigcard"> <!-- v-for报错时，让等号离 " 远一点-->
                    <img class="big-cover" :src="item.model.resource.cover" alt="">
                    <div class="bigcount">
                        {{ formateCountView(item.model.resource.count.count_view)
                        }}观看|{{ formatetime(item.model.resource.duration) }}
                    </div>
                    <div class="big-bottom">
                        <div class="tips"><span class="iconfont icon-guankan"></span> 大家都在看</div>
                        <div class="big-info">
                            <div class="left">
                                <div class="bigtitle">{{ item.model.resource.title }}</div>
                                <div class="userinfo">
                                    <div class="avatar">
                                        <img :src="item.model.resource.author.userinfo.avatar" alt="">
                                    </div>
                                    <div class="nickname"> {{ item.model.resource.author.userinfo.username }} </div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="right-item">
                                    <span class="iconfont icon-shoucang"></span>
                                    <p>{{ item.model.resource.count.count_collect }}</p>

                                </div>
                                <div class="right-item">
                                    <span class="iconfont icon-dianzan"></span>
                                    <p>{{ item.model.resource.count.count_like }}</p>

                                </div>
                                <div class="right-item">
                                    <span class="iconfont icon-gengduo-shuxiang"></span>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </router-link>

            <MiddleCard :midList="recommend.data.second"></MiddleCard>
            <!-- 广告 -->
            <div class="adcard" v-if="adList.length > 0">
                <div class="adInfo" v-for="item in adList.list">
                    <div class="adInfolist">
                        <div class="adAvatar"><img :src="item.model.resource.creator.avatar" alt="">
                        </div>
                        <div class="adusername">{{ item.model.resource.creator.username }}</div>
                        <div class="adMore"><span class="iconfont icon-gengduo-shuxiang"></span></div>
                    </div>
                </div>
                <div class="adtitle">{{ item.model.resource.title }}</div>
                <div class="adImg"><img :src="item.model.resource.cover" alt=""></div>
                <div class="adInvite">立即查看</div>

            </div>
            <!-- 创作人 -->
            <div class="creator" v-if="creatorlist.list.length > 0">
                <div class="top">
                    <div class="CRtitle">推荐创作人</div>
                    <div class="more">查看更多></div>
                </div>
                <div class="scroll">
                    <ul class="CRpiece">
                        <div class="bottom" v-for="(item, index) in  creatorlist.list" :key="index">
                            <div class="item">
                                <div class="creatorAvatar"><img :src="item.model.resource.avatar" alt="">
                                </div>
                                <div class="creatorname">{{ item.model.resource.username }}</div>
                                <div class="creatorinfo">
                                    {{ item.model.resource.count.count_article }}作品 · {{
                                        item.model.resource.count.count_followee }}粉丝
                                </div>
                                <div class="job">{{ item.model.resource.occupation }}</div>
                                <div class="notice"><span>+关注</span></div>
                            </div>
                        </div>
                    </ul>
                </div>



            </div>

            <MiddleCard :midList="recommend.data.third"></MiddleCard>


        </div>
        <!-- blank -->
        <div class="blank"></div>
    </div>
</template>

<style scoped lang="less">
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 13px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
}

/* 调轮播图下标数字大小 */
.custom-indicator>span {
    color: white;
    font-size: 17px;
    font-weight: 700;
}

.recommend {
    /* 边距 */
    padding: 10px 20px;
    background-color: #f7f7f7
}

.banner {
    /* 圆角属性 */
    border-radius: 12px;
    /* 溢出隐藏？why */
    overflow: hidden;
}

.bannerImg {
    width: 345px;
    height: 197px;
    position: relative;
}

.bannertitle {
    position: absolute;
    bottom: 10px;
    left: 16px;
    color: white;
    font-size: 15px;
}

.videoCard {
    /* display: flex; */
    margin-top: 10px;
    /* background-color: rgb(227, 236, 240); */
}

.blank {
    /* 10px还不够，服了 */
    height: 50px;
}

/* 大卡片 */
// 文字在图片里面用position来定位，父级relative，下级absolute
.bigcard {
    width: 100%;
    position: relative;
    color: black;
    background-color: white;

    //    padding-right: 10px;
    // margin-right: 40px;
    // padding-bottom: 10px;
    .bigcount {
        position: absolute;
        right: 10px;
        top: 155px;
        color: white;
        font-size: 12px;
        font-weight: 600;
    }

    .big-cover {
        width: 100%;
        margin-left: 0px;
    }

    img {
        width: 50px;
    }

    .big-bottom {
        padding: 5px;

        .tips {
            background-color: rgb(234, 176, 176);
            margin-right: 215px;
            border-radius: 25px;
            overflow: hidden;
            // line-height: 20px;
            font-size: 14px;
            color: rgb(220, 94, 94);
            // padding: 5px 5px;
            // font-size: 12px;
            // border-radius: 15px;
            // display: inline-block;

        }

        .big-info {
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;

            .left {
                .bigtitle {
                    font-size: 17px;
                    margin-left: 10px;
                }

                .userinfo {
                    display: flex;

                    .nickname {
                        font-size: 2px;
                        margin-left: 3px;
                    }

                    .avatar {
                        img {
                            width: 15px;
                            height: 15px;
                            border-radius: 25px;
                            margin-left: 10px;

                        }
                    }
                }


            }

            .right {
                display: flex;
                // justify-content: space-between;
                margin-top: -4px;
                margin-left: 30px;
                margin-right: 0px;
                // padding-top: -10px;
                // margin-bottom: 10px;
                // padding-bottom: -10px;
                // align-items: center;
                // margin-right: 0px;
                // justify-content: space-around;

                // justify-content: flex-end;

                .right-item {
                    margin: 7px;

                    // margin-bottom: 4px;
                    .icon-shoucang,
                    .icon-dianzan {
                        font-size: 13px;
                    }

                    p {
                        font-size: 2px;
                    }

                }
            }

        }
    }
}

/*广告*/
.adcard {
    width: 100%;
}

.adInfolist {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;


}

.adAvatar {
    width: 30px;
    height: 30px;


    img {
        width: 100%;
        height: 100%;
        border-radius: 31px;
    }
}

.adImg {
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        margin-left: 0;
    }
}

.adusername {
    margin-right: 161px;
    font-size: 10px;
    margin-top: 7px;
}

.adtitle {
    margin: 8px;
}

.adInvite {
    margin-bottom: 20px;
    font-size: 12px;
    background-color: white;
    border: 1px solid white;
}

.creator {
    width: 100%;
    overflow: hidden;
    // overflow-x: scroll;

}

.top {
    margin-top: 20px;
    // margin-bottom: 20px;
    display: flex;
    height: 43px;
    justify-content: space-between;
    position: relative;
}

.CRtitle {
    font-weight: 800;
    font-family: 黑体;
    font-size: 20px;


}

.more {
    left: 0;
    right: 0;
    font-weight: 100;

}

.scroll {
    // 下面这些条件没必要，只需要overflow: hidden;和overflow-x: scroll;就行
    //实现横向滚动必要条件1：在超宽度上的父节点，才能overflow-x: scroll;
    width: 100%;
    overflow: hidden;
    overflow-x: scroll;
}

.CRpiece {
    // 实现横向滚动必要条件2：定义超宽度
    display: flex;
    width: 1520px;
    // width: 100%;


}

.bottom {
    //实现横向滚动必要条件3：执行循环
    display: flex;
    justify-content: center;
    border: 1px white solid;
    justify-content: center;
    height: 180px;
    border-radius: 5px;
    // overflow-x: scroll;
    overflow: hidden;

}

.item {
    justify-content: center;
    width: 150px;
    flex-shrink: 0;
    // align-items: center;
    margin-left: 15px;
    background-color: white;
}

.creatorAvatar {
    margin-top: 10px;
    height: 40px;
    width: 40px;
    margin-left: 40px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 40px;
    }
}

.creatorname {
    overflow: hidden;
    margin-right: 25px;
    margin-top: 10px;
    // align-items: center;
    // justify-content: center;
    text-align: center; //使文字居中
    font-size: 10px;

}

.creatorinfo {
    font-size: 10px;
    font-weight: 100;
    margin-left: 15px;
    margin-top: 8px;


}

.job {
    margin-left: 48px;
    margin-top: 5px;
    font-size: 10px;
    font-weight: 100;
}

.notice {
    margin-left: 25px;
    display: flex;
    background-color: rgb(233, 63, 63);
    color: white;
    width: 70px;
    // height: 20px;
    border-radius: 20px;
    font-size: 15px;
    padding: 3px;
    justify-content: center;
    margin-top: 7px;
}</style>