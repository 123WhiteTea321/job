
<script setup>

//使用组件不引起路径的变化，也无需导入useRouter
import Recommend from '../components/HomeTab/RecommendView.vue'
import Popular from '../components/HomeTab/PopularView.vue'
import Daily from '../components/HomeTab/DailyView.vue'
import Shorts from '../components/HomeTab/ShortFilmsView.vue'

import { ref } from 'vue'
const active = ref(0)

</script>
 

<template>
  <div class="home">
    <!-- v-model:active	绑定当前选中标签的标识符	默认值0 -->
    <van-tabs v-model:active="active" color="red" sticky>
      
      <van-tab title="推荐">
         <Recommend />
      </van-tab>

      <van-tab title="每日精选">
        <Daily />
      </van-tab>

      <van-tab title="热门">
       <Popular />
      </van-tab>

      <van-tab title="剧情短片">
       <Shorts />
      </van-tab>
    </van-tabs>

   <!-- 难道下面的tabbar导航栏也可以不切换路径来做？一个页面四个组件，连router都不用导入 -->
  </div>
</template>



<style scoped lang="less">

// 看不懂，下面这个是干什么的？
/deep/.van-tab_text {
  font-weight: 800 !important;
}
</style>