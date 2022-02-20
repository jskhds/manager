<template>
<div class="login-wrapper">
     <div class="modal">
         <el-form>
             <div class="title">请登录</div>
             <!-- 3 个 item，账号密码登录按钮 -->
             <el-form-item >
                 <el-input type="text"  prefix-icon="el-icon-user"/>
             </el-form-item>
              <el-form-item>
                 <el-input type="password"  prefix-icon="el-icon-view"/>
             </el-form-item>
            <el-form-item >
                 <el-button type="primary" class="btn-login">登录</el-button>
             </el-form-item>
         </el-form>
     </div>
</div>
</template>

<script>
import Welcome from './Welcome.vue'
export default {
    name: "login",
    components: Welcome,
    mounted(){
        /*this.$request({
            methods:'get',
            url: '/login',
            data: {
                name: 'dmoon',
            }
        }).then((res)=>{
            console.log(res);
        })*/
        // this.$request.get('/login', {name: 'dmoon'}, {mock:true, loading:true}).then((res)=>{
        //     console.log(res);
        // })
    },
    methods: {
        goHome() {
            this.$router.push("./welcome");
        }
    },
    components: { Welcome }
}

</script>

<style lang="scss">
.login-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#f9fcff;
    width: 100vw;
    height: 100vh;
    .modal{
        width: 500px;
        padding: 50px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0px 0px 17px 0px #c7c9cb4d;
        .title{
            font-size: 20px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
        }
        .btn-login{
            width: 100%;
        }
    }

}
</style>