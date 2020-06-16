// 3. 编译模板:解析模板中的{{}}和v-指令
// 找到$el->就找到了模板中的{{}}和指令
// 找到数据$data
// 所以, 直接找vm
function Compiler(vm) {
  this.$vm = vm
  // 编译模板
  this.compile(vm.$el)
}

// 编译模板
// 1.1 遍历节点
// 1.2 判断节点类型
Compiler.prototype.compile = function (el) {
  // 找到el下所有子节点childNodes
  Array.from(el.childNodes).forEach(node => {
    if (this.isTextNode(node)) {
      this.compileTextNode(node)
    }

    if (this.isElementNode(node)) {
      this.compileElementNode(node)
      this.compile(node)
    }
  })
}

// 处理文本节点
// 1. 获取文本节点的内容
// 2. 正则判断
// 3. 获取属性名
// 4. 给文本节点重新赋值为data中的key属性
Compiler.prototype.compileTextNode = function (node) {
  const text = node.textContent
  const reg = /\{\{(.+)\}\}/
  if (reg.test(text)) {
    const key = RegExp.$1.trim()
    node.textContent = text.replace(reg, this.vm.$data[key])

    // 注册事件
    em.$on(key, () => {
      node.textContent = this.vm[key]
    })
  }
}

// 处理元素节点
Compiler.prototype.compileElementNode = function (node) {
  Array.from(node.attributes).forEach(attr => {
    const name = attr.name
    if (this.isDirective(name)) {
      const value = attr.value
      if (name === 'v-model') {
        node.value = this.vm.$data[value]
        // 注册事件
        em.$on(value, () => {
          node.value = this.vm[value]
        })
        // 视图更新,更改数据
        node.oninput = () => {
          this.vm[value] = node.value
        }
      }

      if (name === 'v-text') {
        node.textContent = this.vm.$data[value]
        // 注册事件
        em.$on(value, () => {
          node.textContent = this.vm[value]
        })
      }
    }
  })
}

// 判断当前节点是否是文本节点
Compiler.prototype.isTextNode = function (node) {
  return node.nodeType === 3
}

// 判断当前节点是否是元素节点
Compiler.prototype.isElementNode = function (node) {
  return node.nodeType === 1
}

// 判断属性名称是否是指令
Compiler.prototype.isDirective = function (attrName) {
  return attrName.startsWith('v-')
}