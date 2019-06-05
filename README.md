## Lodash
  ___
  ### 为了加强对js基础的掌握，自己试着实现loash库的部分函数，
  大约实现了250个函数，约占Lodash库的90%左右

  由于函数的测试用例较少，实现过程简易，考虑的不是很全面，很多函数的实现可能存在一些问题，还有待自己下一步的修改和完善。
  ___

##在实现的过程中，对下面实现的函数印象较为深刻

***cloneDeep对象克隆***
  - cloneDeep
  ```js
    cloneDeep = (function() {
      //利用数组进行进行缓存 防止对象有环
      let originCloning = [] //原克隆对象
      let targetCloning = [] //目标克隆对象

      return function cloneDeep(obj) {
        let idx = originCloning.indexOf(obj)
        // 查询原克隆对象数组中是否有需要克隆的对象

        if (idx > -1) {//存在的情况下直接返回目标克隆数组中的该项
          return targetCloning[idx]
        }

        let res = {}
        //将需要克隆的的对象放进原克隆对象数组
        originCloning.push(obj)
        //将申请的对象放进数组
        targetCloning.push(res)

        //遍历数组 复制对象属性
        for (let key in obj) {
          let val = obj[key]
          if (typeof val === 'object') {
            res[key] = cloneDeep(val)
          }
            res[key] = val
        }
      }
    })
  ```

***curry函数柯里化***
  - curry
  ```js
    curry = (func, n = func.length) => {
      return function(...args) {
        if (args.length < n) {
          //参数传入不满足要求，返回函数 并将已传参数bind, 减少数量
          return curry(func.bind(null,...args), n - args.length)
        } else {
          //参数传入数量满足要求  直接调用传入参数调用函数
          return func(...args)
        }
      }
    }
  ```

***isEqual***
  - isEqual
  ```js

  isEqual = (value, other) => {
    if (value === other) {//string number
      return true
    }
    if (value !=== value && other !== other) { //NAN
      return true
    }
    if (typeof value !== typeof other) { //类型不同
      return false
    }
    if (isArray(value) && !isArray(other)) { //数据和对象
      return false
    }
    if (isObject(value) && isObject(other)) { //判断对象和数组深层次嵌套
    //进行两次循环 防止对象前面参数相同 但长度不一
      for (let key in value) {
        if (!isEqual(value[key], other[key])) {
          return false
        }
      }
      for (let key in other) {
        if (!isEqual(other[key], value[key])) {
          return false
        }
      }
      return true
    }
    return false
  }

  //利用原型上的方法判断

  isArray = value => Object.prototype.toString.call(value) === "[object Array]"

   //对象是对象  函数是对象 数组是对象
   isObject = value => Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Function]" || Object.prototype.toString.call(value) === "[object Array]"
  ```
***debounce/thorttle***
  - debounce
  ```js
    debounce = (func, delay) => {
      let Timer = null
      return function(...args) {
        if (Timer) {
          clearTimeout(Timer)
        }
        Timer = setTimeout(() => func(...args), delay)
      }
    }

    //实现仅考虑第一次传入时立即调用
    thorttle = (func, delay) => {
      let lastTime = 0
      return function(...args) {
        let now = Date.now
        if (now - lastTime > delay) {
          func(...args)
          lastTime = now
        }
      }
    }
  ```



