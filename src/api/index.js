/**
 * api管理
 */
 import request from './../utils/request'
 export default {
     login(params) {
         return request({
             url: '/users/login',
             method: 'post',
             data: params,
         })
     },
     noticeCount(params) {
         return request({
             url: '/leave/count',
             method: 'get',
             data: {},
             mock: true
         })
     },
     getMenuList(params) {
         return request({
             url: '/menu/list',
             method: 'get',
             data: params,
             mock: false
         })
     },
     getPermissionList() {
        // console.log("getPerssionList")
        return request({
            url: '/users/getPermissionList',
            method: 'get',
            data: {}
        })
    },
     getUserList(params) {
         return request({
             url: '/users/list',
             method: 'get',
             data: params,
             mock:false
         })
     },
    //  获取所有用户
     getAllUserList(){
        return request({
            url: '/users/all/list',
            method: 'get',
            mock:false
        })
     },
     userDel(params) {
         return request({
             url: '/users/delete',
             method: 'post',
             data: params,
             mock:false
         })
     },
     getRoleAllList() {
        return request({
            url: '/roles/allList',
            method: 'get',
            data: {},
            mock: false
        })
    },
    getRoleList(params) {
        return request({
            url: '/roles/list',
            method:'get',
            data: params,
            mock: false
        })
    },
     getDeptList(params) {
         return request({
             url: '/dept/list',
             method: 'get',
             data: params,
             mock: false
         })
     },
     deptOperate(params) {
        return request({
            url: '/dept/operate',
            method: 'post',
            data: params,
            mock: false
        })
    },

     userSubmit(params) {
         return request({
             url: '/users/operate',
             method: 'post',
             data: params,
             mock: false
         })
     },
     menuSubmit(params) {
        return request({
            url: '/menu/operate',
            method: 'post',
            data: params,
            mock: false
        })
    },
    
    // 角色操作
    roleOperate(params){
        return request({
            url: '/roles/operate',
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 权限更新设置
    updatePermission(params){
        return request({
            url: '/roles/update/permission',
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 获取休假列表
    getApplyList(params){
        return request({
            url: '/leave/list',
            method: 'get',
            data: params,
            mock: false
        })
    },
    // 创建申请单
    leaveOperate(params){
        return request({
            url: '/leave/operate',
            method: 'post',
            data: params,
            mock: true
        })
    },
 }