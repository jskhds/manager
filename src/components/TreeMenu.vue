<template>
<div>
  <!-- 递归调用 -->
  <!-- v-for 的 key 调用在 Vue3 中改了一些，可以自动添加了 -->
    <template v-for="menu in userMenu" :key="menu._id">

      <!-- 先遍历父菜单，父菜单里面还有菜单的话就递归使用 treeMenu 组件 -->
        <el-submenu v-if="menu.children && menu.children.length>0 && menu.children[0].menuType == 1"  :index="menu.path">
          <template #title>
            <i :class="menu.icon"></i>
            <span>{{menu.menuName}}</span>
          </template>
          <tree-menu :userMenu="menu.children"/>
        </el-submenu>


        <!-- 最后一级可以直接调用 -->
        <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path" >{{menu.menuName}}</el-menu-item>
    </template>
</div>
</template>


<script>
export default {
    name:'TreeMenu',
    props:{
        userMenu:{
            type:Array,
            default(){
                return []
            }
        }
    }}
</script>

<style></style>
