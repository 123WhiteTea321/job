
<script setup>
import Related from '../components/RelatedVideo.vue';
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { getCategoriesDetails, getCategory } from '../api/search'
var router = useRouter()
var route = useRoute()

// 分类视频盒子
var cateVideoList = reactive({
  list: []
})
// 分类数据盒子
var categoryList = reactive({
  list: []
})
// 获取传过来的id
// const routeId = ref(route.query.id)
// 找不到的话也从route.query那边传过来就好了嘛
var category_name = ref(route.query.category_name)


onMounted(() => {
  //那边通过toRelated函数跳转到本页面时会用query传一个id，这里我们就可以直接用route.query获取出来。
  // console.log("route",route.query)  

  getCategoriesDetails(route.query.id)
    .then(res => {
      console.log('分类视频', res)
      cateVideoList.list = res.data.data.list
    })

  // getCategory()
  //   .then(res => {
  //     console.log("分类1", res)
  //     categoryList.list = res.data.data.categories
  //     categoryList.list.forEach(item => {
  //       if (item.id == route.query.id) {
  //         category_name = item.category_name
  //       }
  //     })
  //   })


})

const goback = () => {
  router.back()
}

</script>




<template>
  <div class="cateDetails" v-if="cateVideoList.list.length > 0 ">
    <span class="top">
      <div class="iconfont icon-fanhui" @click="goback()"></div>
      <div class="top-title">{{ category_name }}</div>
    </span>
    <div class="blank"></div>
    <Related :list="cateVideoList.list"></Related>
  </div>
</template>






<style scoped>
.top {
  display: flex;
  height: 42px;
  border-bottom: 1px solid rgb(244, 239, 239);
}

.icon-fanhui {
  padding-top: 10px;
  margin-left: 15px;
}

.top-title {
  margin-left: 130px;
  padding-top: 10px;
}

.blank {
  height: 15px;
}
</style>