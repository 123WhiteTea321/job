<script setup>

//加了这两行响应式代码导航栏才能选择？
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router';
// const active = ref(0);     //即const active=0 的响应式
// const active=0   //导航栏动不了了
// console.log(active)   //是RefImfl对象
const active = ref(0);

// const icon = {
//     active: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png',
//     inactive:
//         'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png',
// }

//做个容器放东西，下面v-for循环好有东西插值
const tabbarList = reactive([
    {
        id: 0,
        text: '首页',
        path: '/home',
        icon: 'icon-shouye'
    },
    {
        id: 1,
        text: '搜索',
        path: '/search',
        icon: 'icon-sousuo'
    }, {
        id: 2,
        text: '手记',
        path: '/note',
        icon: 'icon-wj-bjb'    //下载好后去iconfont.css里面去找名字
    }, {
        id: 3,
        text: '我的',
        path: '/user',
        icon: 'icon-wode'
    },
])

onMounted(() => {
    // console.log(useRoute())    //这里能看到useRoute().path
    var index = tabbarList.findIndex(
        item => item.path == useRoute().path
    )
    active.value = index
})

</script>



<template>
    <div class="index">
        <!--  -->
        <!-- 分析页面可知，四个页面都有tabbar导航栏，所以放在全局页面里 -->
        <!-- ctrl+z 撤回到上一步 -->
        <van-tabbar v-model="active" route> <!-- 这里的route配合onMounted一起看 -->
            <van-tabbar-item v-for="item in tabbarList" :key="item.id" :to="item.path">
                <!-- 通过图标来绑定路径，普通的都是通过点击router-link跳转 -->
                <span>{{ item.text }}</span>
                <template #icon="props">
                    <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
                    <!-- i是图标标签，不要上面那个了 -->
                    <i :class="active === item.id ? `active iconfont ${item.icon}` : `inactive iconfont ${item.icon}`"></i>
                    <!-- {{ active }}  没有click元素，为什么点击会有反应-->
                </template>
            </van-tabbar-item>

            <!-- 上面用v-for，就不用写四个了 -->
            <!-- <van-tabbar-item>
                    <span>搜索</span>
                    <template #icon="props">
                 
                        <i class="iconfont icon-shouye"></i>
                    </template>
                </van-tabbar-item> 

                <van-tabbar-item>
                    <span>手记</span>
                    <template #icon="props">
               
                        <i class="iconfont icon-shouye"></i>
                    </template>
                </van-tabbar-item>

                <van-tabbar-item>
                    <span>我的</span>
                    <template #icon="props">
                    
                        <i class="iconfont icon-shouye"></i>
                    </template>
                </van-tabbar-item> -->


            <!-- <van-tabbar-item icon="search">标签</van-tabbar-item>
                    <van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
        </van-tabbar>
        <!-- 一级路由视图出口 -->
        <router-view></router-view>
    </div>
</template>



<style scoped>
.active {
    /* 记住导航栏字体用24px */
    font-size: 24px;
    color: red;
}

.inactive {
    font-size: 24px;
    color: #bbb;
}
</style>
