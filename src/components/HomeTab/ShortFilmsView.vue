<script setup>

import { getShorts } from '../../api/home';
import { ref, reactive, onMounted } from "vue"
import BigCard from '../BigCard.vue';
//大卡片数据盒子
var bigCardList = reactive({
    list: []
})

onMounted(()=>{
    getShorts()
    .then(res=>{
        console.log("getshorts",res)
        var data=res.data.data.children
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

  <div class="shortFilms">
    <!-- 轮播图 -->
    


    <!-- 大卡片数据 -->
        <div class="box" v-if="bigCardList.list.length > 0">
            <BigCard :bigList="bigCardList.list"></BigCard>

        </div>
    </div>

</template>



<style></style>
