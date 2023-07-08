
<script setup>
//作品和相似视频有相同的结构，这里把相同部分做成组件
import { formateCountView, formatetime, formatetimecapsule } from '../utils/util'
import { getplaydetail, getcomments, getsimilarvideo } from '../api/play';
import { defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router=useRouter()
const props=defineProps({
   list:{                 //或者直接list:Array
    type:Array
   }
})

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
</script>




<template>
    <div class="works">
           <!-- 相似视频 -->
                        <ul class="boxlist" v-for="item in list">
                           
                            <div class="similar-item" @click="$event => toRelated(item.id)">
                              
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
    
</template>



<style scoped lang="less">
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
        // position: relative;
        border-radius: 5px;
    }

    h {
        position: absolute;
        color: white;
        font-size: 13px;
        margin-top: 67px;
        // margin-right: -15px;
        margin-left: -43px;
    }
}


.similar-right {
    
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
    p{
        display: flex;
        flex-direction: column-reverse;
        font-size: 12px;
        color:#B0B0B0;
        // margin-bottom: 30px;
    }
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