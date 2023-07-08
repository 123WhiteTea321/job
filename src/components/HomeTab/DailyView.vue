<script setup>

import { getDaily } from '../../api/home';
import { ref, reactive, onMounted } from "vue"
import BigCard from '../BigCard.vue';
//


//大卡片盒子
var bigCardList = reactive({
    list: []
})


onMounted(() => {
    getDaily()
        .then(res => {
            console.log("daily", res)
            var data = res.data.data.children

            //处理大卡片数据
            // var bigcardIndex = data.findIndex(
            //     (item) => item.type == 'uiBigCard'
            // )
            // bigCardList.list = data[bigcardIndex].children[0]  多条数据不能用这种
            data.forEach(item => {
                if (item.type == 'uiBigCard') {
                    bigCardList.list.push(item)
                }
            })
            console.log("uiBigCard", bigCardList.list)
        })
})


</script>
 


<template>
    <div class="daily">
        <div class="top">今日精选</div>
        <div class="box" v-if="bigCardList.list.length > 0">
            <BigCard :bigList="bigCardList.list"></BigCard>

        </div>
    </div>
</template>



<style scoped>
.daily {
    background-color: #f7f7f7;
    width: 100%;
}

.top {
    font-weight: 800;
    font-size: 18px;
    margin: 0px 0 10px 10px;
    padding-top: 10px;

}

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
