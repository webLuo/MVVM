// 数据劫持:$data中的属性设置为getter/setter(响应式数据),当数据变化时,要发送通知,更新视图
// 1. 遍历data中的属性->walk方法
// 2. 为属性设置getter和setter->defineReactive方法
function Observer(data) {
  this.walk(data)
}

Observer.prototype.walk = function (data) {
  Object.keys(data).forEach(key => {
    this.defineReactive(data, key, data[key])
  })
}

Observer.prototype.defineReactive = function (data, key, value) {
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: true,
    get() {
      return value
    },
    set(newValue) {
      if (value === newValue) return
      value = newValue
      // 当某个数据变化时,发送通知更新视图 触发事件$emit()
      em.$emit(key)
    }
  })
}