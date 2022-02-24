/**
 * 工具函数封装
 */
export default {
    // 格式化日期，用户列表返回的时间戳需要格式化
    formateDate(date, rule) {
        let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, date.getFullYear())
        }
        const o = {
            // 'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            // 动态正则要  new 一下才行
            if (new RegExp(`(${k})`).test(fmt)) {
                const val = o[k] + '';  // 把年月日变成字符，防止她们相加
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
            }
        }
        return fmt;
    },
    // 递归生成路由
    generateRoute(menuList) {
        let routes = []
        const deepList = (list) => {
            while (list.length) {
                let item = list.pop()
                // 有 action 说明是按钮，到按钮就够了
                if (item.action) {
                    routes.push({
                        name: item.component,
                        path: item.path,
                        meta: {
                            title: item.menuName
                        },
                        component: item.component
                    })
                }
                // 第一层（系统管理，审批管理）继续递归
                if (item.children && !item.action) {
                    deepList(item.children)
                }
            }
        }
        deepList(menuList)
        return routes;
    }
}