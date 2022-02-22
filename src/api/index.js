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
     getMenuList() {
         return request({
             url: '/menu/list',
             method: 'get',
             data: {},
             mock: true
         })
     },
     getUserList(params) {
         return request({
             url: '/users/list',
             method: 'get',
             data: params
         })
     },
     userDel(params) {
         return request({
             url: '/users/delete',
             method: 'post',
             data: params
         })
     },
     getRoleList() {
         return request({
             url: '/roles/allList',
             method: 'get',
             data: {},
             mock: false
         })
     },
     getDeptList() {
         return request({
             url: '/dept/list',
             method: 'get',
             data: {},
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
     }
 }