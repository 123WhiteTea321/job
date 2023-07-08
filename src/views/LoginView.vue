<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api/login';
import { showToast } from 'vant';
const router = useRouter()
const back = () => {
    // router.back()   //返回上一个页面，跳转到别的页面用router.push({path:'/playview',query{id:xxx}})
    router.push({
        path: '/user'
    })

}
const toRegister = () => {
    router.push({
        path: '/register',
    })
}
const value1 = ref('');
const value2 = ref('');
const validatorPhone = (val) => /1\d{10}/.test(val);   //手机号验证
const validatorPassword = (val) => /^[A-Za-z]\w{5,15}$/.test(val);   //密码验证


//点击登录
function submit() {
    // 必须要加.value,什么道理？
    login(value1.value, value2.value)
        .then(res => {
            console.log('登录信息', res);
            if (res.data.code == 200) {
                localStorage.setItem('token', res.data.token)
                showToast(res.data.msg);
                router.back()
            } else {
                showToast(res.data.msg);

            }
        })
}
</script>


<template>
    <div class="login">
        <div class="logintop">
            <span class="iconfont icon-fanhui" @click="back()"></span>
            <p @click="toRegister()"> 注册</p>
        </div>
        <div class="bg">
            <img src="../assets/img/t6.3962cf4d.png" alt="">
        </div>
        <h1>登录</h1>
        <div class="area">
            <p>中国手机+86</p>
            <span>></span>
        </div>

        <div class="form-box">
            <!-- ctrl+f 打开搜索框 -->
            <van-form>
                <van-cell-group inset>

                    <!-- 通过 validator 进行函数校验 -->
                    <van-field v-model="value1" name="validatorPhone" placeholder="请输入手机号"
                        :rules="[{ validator: validatorPhone, message: '请输入正确的手机号' }]" />
                    <van-field v-model="value2" name="validatorPassword" type="password" placeholder="请输入密码"
                        :rules="[{ validator: validatorPassword, message: '请输入正确格式的密码' }]" />
                </van-cell-group>
                <!-- style="margin: 16px;" -->
                <div class="submit">
                    <van-button round type="danger" native-type="submit" @click="submit">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>



<style scoped lang="less">
.login {
    .bg {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 15px;

        img {
            width: 100%;
        }
    }
}

.logintop {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .icon-fanhui {
        margin-left: 10px;
    }

    p {
        margin-right: 10px;
    }
}

h1 {
    margin-left: 15px;
    font-size: 28px;
}

.area {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f6f7;

    p {
        margin-left: 30px;

    }

    span {
        margin-right: 30px;
        margin-top: 17px;
    }
}

.submit {
    display: flex;
    flex-direction: row-reverse;
    margin: 20px 10px 0 0;

    /deep/.van-button {
        padding: 0 30px;

    }
}
</style>