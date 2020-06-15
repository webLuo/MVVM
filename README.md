# MVVM

MVVM
view: 
  视图 template html DOM模板#app
Model: 
  数据模型 data选项 普通数据
ViewModel: 
  视图模型 vue实例 负责数据和视图的更新，model数据和view视图通信的桥梁  const vm = new Vue()
  视图->数据  v-model
  数据->视图  data对象中的数据改变

Object.defineProperty(obj,prop,descriptor)
1.defineProoerty()为对象增加新属性
2.访问器：get()/set()
  (1)取值->get
  (2)赋值->set --> (更新视图，也就是更新DOM)
3.发布订阅模式:
  具体产物：bus.js
  
  注册事件：bus.$on('eventName',() => {}) 
  
  触发事件：bus.$emit('eventName', val/obj...)