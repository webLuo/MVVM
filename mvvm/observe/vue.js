// Vue构造函数
// 初始化数据
// 1. 注入:data中的属性,设置为Vue实例的属性,并且设置成getter/setter
// 2. 数据劫持:$data中的属性设置为getter/setter(响应式数据),当数据变化时,要发送通知,更新视图
// 3. 编译模板:解析模板中的{{}}和v-指令

function Vue(options) {
  this.$options = options
  this.$data = options.data || {}
  // 判断options.el的类型
  // 如果字符串(选择器'#app'),要获取对应的DOM元素
  const el = options.el
  this.$el = typeof el === 'string' ? document.querySelector(el) : el
  this.$proxyData()
}

// 1. 注入:data中的属性,设置为Vue的属性,并且设置成getter/setter
// 1.1 遍历data中的属性
// 1.2 把遍历到的属性挂载到Vue实例上,并且设置getter/setter
Vue.prototype.$proxyData = function () {
  Object.keys(this.$data).forEach(key => {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      getter() {
        return this.$data[key]
      },
      setter(value) {
        // 相同的值,不需要赋值
        if (this.$data[key] === value) return
        this.$data[key] = value
      }
    })
  })
}