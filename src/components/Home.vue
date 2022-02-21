<template>
  <div class="basic-layout">
    <!-- 注意控制的是侧边栏的展开，同时还要让右边的区域宽度动态变化 -->
    <div :class="['nav-side',isCollapse?'fold':'unfold']">
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="./../assets/logo.png">
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
        class="nav-menu">
       <tree-menu :userMenu="userMenu"/>
    </el-menu>
    </div>
    <!-- 如果侧边栏收起和展开，宽度随之改变 -->
    <div :class="['content-right',isCollapse?'fold':'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle"> <i class="el-icon-s-fold"></i></div>           
            <div class="bread">
              <!-- 面包屑 -->
              <BreadCrumb/>
            </div>
        </div>
        <div class="user-info">
          <!-- 看从接口返回的 noticeCount 的值，大于 0 为 true -->
          <el-badge :is-dot="noticeCount>0?true:false" class="notice" type="danger">
            <i class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{userInfo.userName}}
              <i class="el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱:{{userInfo.userEmail}}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeMenu from "./TreeMenu.vue";
import BreadCrumb from "./BreadCrumb.vue";
export default{
  name:'Home',
  components:{TreeMenu,BreadCrumb},
  data(){
    return {
      isCollapse:false,
      userInfo:this.$store.state.userInfo,  // 使用 mock 接口的数据。我们在 request 的时候有存到 localStorage里面
      noticeCount:0,
      userMenu:[],
      activeMenu:location.hash.slice(1)
    }
  },
  mounted(){
    this.getNoticeCount();
    this.getMenuList();
  },
  methods:{
    toggle(){
      this.isCollapse = !this.isCollapse;
    },
    handleLogout(key){
      if(key == 'email')return;
      this.$store.commit('saveUserInfo','');
      this.userInfo = null;
      this.$router.push('/login');
    },
    // 从通知数量 api 拿到通知数量
    async getNoticeCount(){
      try{
        const count =  await this.$api.noticeCount();
        this.noticeCount = count;
      }catch(err){
        console.error(err)
      }
      
    },
    async getMenuList(){
      try{
         const list = await this.$api.getMenuList()
          this.userMenu = list;
      }catch(err){
        console.error(err)
      }
      
    },
  }
}
</script>

<style lang="scss">
.basic-layout{
  position:relative;
  .nav-side{
    position: fixed;
    width:200px;
    height:100vh;
    background-color: #001529;
    color:#fff;
    overflow-y: auto;
    transition: width .5s;  // 在侧边栏合并展开的时候添加过渡动画
    .logo{
      display: flex;
      align-items: center;
      font-size: 18px;
      height:50px;
      img{
        margin:0 16px;
        width:32px;
        height:32px;
      }
    }
    .nav-menu{
      height:calc(100vh - 50px);
      border-right:none;
    }
    // 合并
    &.fold{
      width:64px;
    }
    // 展开
    &.unfold{
      width:200px;
    }
  }
  .content-right{
    margin-left:200px;
    // 合并
    &.fold{
      margin-left:64px;
    }
    // 展开
    &.unfold{
      margin-left:200px;
    }
    .nav-top{
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left{
        display: flex;
        align-items: center;
        .menu-fold{
          margin-right:15px;
          font-size: 18px;
        }
      }
      .user-info{
        .notice{
          line-height:30px;
          margin-right:15px;
        }
        .user-link{
          cursor: pointer;
          color:#409eff;
        }
      }
    }
    .wrapper{
      background: #eef0f3;
      padding:20px;
      height: calc(100vh - 50px);
      .main-page{
        background:#fff;
        height:100%;
      }
    }
  }
}
</style>