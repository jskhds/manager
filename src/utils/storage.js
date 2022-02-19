// /**
//  * storage 二次封装
//  * @date 2022-02-19
//  */
import config from '../config'
export default {
    setItem(key,val){
        let storage = this.getStroage();
         // 注意要用 storage[key] 不能是 storage.key（这种相当于 key 是字符串而不是变量）
        storage[key] = val;
        window.localStorage.setItem(config.namespace,JSON.stringify(storage));
    },
    getItem(key){
        return this.getStroage()[key]
    },
    getStroage(){
         // 有对应命名空间的数据就返回对应数据，没有就返回空对象
        //  注意要 JSON.parse 修改一下格式
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
    },
    clearItem(key){
        let storage = this.getStroage()
        delete storage[key]
        // 注意删除之后还要再次写入才算真的删除了
        window.localStorage.setItem(config.namespace,JSON.stringify(storage));
    },
    clearAll(){
        window.localStorage.clear()
    }
}