
function EventEmitter() {
  this.eventObj = {}
}
EventEmitter.prototype.$on = function (eventName, handler) {
  this.eventObj[eventName] = this.eventObj[eventName] || []
  this.eventObj[eventName].push(handler)
}
EventEmitter.prototype.$emit = function (eventName, ...rest) {
  if (this.eventObj[eventName]) {
    this.eventObj[eventName].forEach((handler) => {
      handler.apply(this, rest)
    });
  }
}
const bus = new EventEmitter()
// 注册事件
bus.$on('eventA', function () {
  console.log('A1------>')
})
bus.$on('eventB', function (num1, num2, num3) {
  console.log('B------>')
  console.log(this)  // bus
})
bus.$emit('eventA')
bus.$emit('eventB')