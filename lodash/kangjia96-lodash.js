var kangjia96 = function() {

  /**
   * [description] iteratee迭代器的实现
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  iteratee = (predicate) => {
    //判断类型
    if (isString(predicate)) {
      //字符串类型
      return property(predicate)
    } else if (isArray(predicate)) {
      //数组类型
      return matchesProperty(predicate)
    } else if (Object.prototype.toString.call(predicate) === '[object Object]') {
      //对象类型  不包含函数 数组 null
      return matches(predicate)
    } else if (isRegExp(predicate)) {
      //正则表达式
      return str => predicate.exec(str)
    }
    return predicate //函数
  }

  /**
   * [description] 高阶函数
   * @param  {[type]} target [description]
   * @return {[type]}        [description]
   */
  matches = (target) => { //传入一个参数对象  返回一个函数接受参数看其是否满足已传的参数对象）
    // return bind(isMatch, null, _, target)
    return function(obj) {
      for (let prop in target) {
        if (obj[prop] !== target[prop]) {
          return false
        }
      }
      return true
    }
  }

  /**
   * [description]高阶数组
   * @param  {[type]} path     [description]
   * @param  {[type]} srcValue [description]
   * @return {[type]}          [description]
   */
  matchesProperty = (path, srcValue) => {
    if (Array.isArray(path)) {
      [key, srcValue] = [...path]
    }
    let reference = {}
    reference[key] = srcValue
    return function(obj) {
      if (isArray(obj)) {
        for (let item of obj) {
          if (item[key] === reference[key]) {
            return true
          }
        }
      } else if (isObject(obj)) {
        if (obj[key] === reference[key]) {
          return true
        }
      }
      return false
    }
  }

  /**
   * [description] 用来获取某个字符串在对象中属性值
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  property = (path) => {
    return function(obj) {
      if (Array.isArray(path)) {
        for (let key of path) {
          obj = obj[key]
        }
      } else if (typeof path === 'string') {
        path = path.split('.')
        for (let key of path) {
          obj = obj[key]
        }
      }
      return obj
    }
  }


  identity = value => value

  isObject = value => Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Function]" || Object.prototype.toString.call(value) === "[object Array]" //对象是对象  函数是对象 数组是对象

  isArray = value => Object.prototype.toString.call(value) === "[object Array]"

  isString = value => Object.prototype.toString.call(value) === "[object String]"

  isRegExp = value => Object.prototype.toString.call(value) === "[object RegExp]"




  function chunk(ary, size = 1) {
    let sum = [];
    for (let i = 0; i < ary.length; i += size) {
      sum.push(ary.slice(i, i + size))
    }
    return sum
  }


  compact = ary => ary.filter(item => item)

  function concat(array, ...values) {
    let result = []
    for (let n of array) { //遍历数组
      result.push(n)
    }
    for (let a of values) { // 遍历参数
      if (Array.isArray(a)) { //判断此参数是不是数组
        result.push(...a)
      } else {
        result.push(a)
      }
    }
    return result
  }

  /**
   * 返回第一个数组中与第二个数组不同的第一项值
   * @param  {[type]} array  [description]
   * @param  {[type]} values [description]
   * @return {[type]}        [description]
   */
  difference = (array, ...values) => {
    values = [].concat(...values)
    return array.filter(it => !values.some(val => it === val))
  }

  /**
   * [description] 高阶函数 用iteratee判断传入参数的最后一项
   * @param  {[type]}    array  [description]
   * @param  {...[type]} values [description]
   * @return {[type]}           [description]
   */
  differenceBy = (array, ...values) => {
    predicate = values[values.length - 1]
    if (isArray(predicate)) {
      return difference(array, ...values)
    } else {
      predicate = iteratee(values.pop())
    }
    values = [].concat(...values)
    return array.filter(it => !values.some(val => predicate(val) === predicate(it)))

    // if (typeof values[values.length - 1] === "string" || typeof values[values.length - 1] === "function") {
    //   var predicate = iteratee(values.pop())
    // } else {
    //   var predicate = identity
    // }
    // values = [].concat(...values)
    // return array.filter(j => !values.map(i => predicate(i)).includes(predicate(j)))
  }


  differenceWith = (array, values, comparator) => array.filter(it => !values.some(val => comparator(val, it)))


  /**
   * [description] 返回从头开始删除n个元素的数组
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  drop = (array, n = 1) => array.slice(n)

  /**
   * [description] 返回一个从尾部删除n个元素的数组
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  dropRight = (array, n = 1) => {
    if (n >= array.length) {
      return []
    }
    for (let i = 0; i < n; i++) {
      array.pop()
    }
    return array
  }

  /**
   * [description] 返回一个从尾部删除n个满足条件的数组
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  dropRightWhile = (array, predicate) => {
    predicate = iteratee(predicate)
    let idx = array.length - 1
    for (; idx > -1; idx--) {
      if (!predicate(array[idx])) {
        break
      }
    }
    return array.slice(0, idx + 1)

  }

  /**
   * [description] 返回一个从头部删除n个满足条件的数组
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  dropWhile = (array, predicate) => {
    predicate = iteratee(predicate)
    let idx = 0
    for (; idx < array.length; idx++) {
      if (!predicate(array[idx])) {
        break
      }
    }
    return array.slice(idx)

  }

  /**
   * [description]返回一个把传入数组从start到end替换成value的数组
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @param  {Number} start [description]
   * @param  {[type]} end   [description]
   * @return {[type]}       [description]
   */
  fill = (array, value, start = 0, end = array.length) => {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  /**
   * [description]返回一个从fromIndex开始满足第一个满足条件的数组下标
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @param  {Number} fromIndex [description]
   * @return {[type]}           [description]
   */
  findIndex = (array, predicate, fromIndex = 0) => {
    predicate = iteratee(predicate)

    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  }

  /**
   * [description]返回一个从fromIndex开始满足第一个满足条件的数组下标 倒序
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @param  {[type]} fromIndex [description]
   * @return {[type]}           [description]
   */
  findLastIndex = (array, predicate, fromIndex = array.length - 1) => {
    predicate = iteratee(predicate)

    for (let i = fromIndex; i > -1; i--) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  }


  /**
   * [description] 数组单层展开
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  flatten = array => [].concat(...array)

  /**
   * [description]数组深度展开
   * @param  {[type]} ary [description]
   * @return {[type]}     [description]
   */
  flattenDeep = ary => ary.reduce((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flattenDeep(item))
    } else {
      result.push(item)
    }
    return result
  }, [])

  /**
   * [flattenDepth description] //数组根据深度数展开
   * @param  {[type]} ary   [description]
   * @param  {Number} depth [description]
   * @return {[type]}       [description]
   */
  flattenDepth = (ary, depth = 1) => {
    if (depth === 0) {
      return ary
    }
    return ary.reduce((result, item) => {
      if (Array.isArray(item)) {
        result.push(...flattenDepth(item, depth - 1))
      } else {
        result.push(item)
      }
      return result
    }, [])
  }

  /**
   * [description] 数组展开对对象key val
   * @param  {[type]} pairs [description]
   * @return {[type]}       [description]
   */
  fromPairs = pairs => pairs.reduce((map, item) => {
    map[item[0]] = item[1]
    return map
  }, {})



  /**
   * [description] 返回数组的头一项
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  head = array => array[0]


  /**
   * [indexOf description] 返回满足属性值的下标
   * @param  {[type]} array     [description]
   * @param  {[type]} value     [description]
   * @param  {Number} fromIndex [description]
   * @return {[type]}           [description]
   */
   indexOf = (array, value, fromIndex = 0) => {
    if (fromIndex >= array.length) return -1
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
  }

  /**
   * [description] 返回去除最后一个元素的素组
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  initial = array => array.slice(0, array.length - 1)


  /**
   * [description] 返回数组中相同的项
   * @param  {...[type]} array [description]
   * @return {[type]}          [description]
   */
  // intersection = (...array) => {
  //   let map = {}
  //   let result = []
  //   for (let n of array) {
  //     for (let s of n) {
  //       if (!map[s]) {
  //         map[s] = 1
  //       } else {
  //         map[s]++
  //       }
  //     }
  //   }
  //   for (let e in map) {
  //     if (map[e] === array.length) {
  //       result.push(+e)
  //     }
  //   }
  //   return result
  // }

  /**
   * [description]返回数组的交集
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  intersection = (...arrays) => {
    //仅实现两个数组对比
    return arrays[0].filter(it => (arrays[1].some(val => it === val)))
  }

  /**
   * [description]返回两个数组满足条件的元素的交集
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  intersectionBy = (...arrays) => {
    let predicate = arrays.pop()
    predicate = iteratee(predicate)
    return arrays[0].filter(it => (arrays[1].some(val => predicate(it) === predicate(val))))
  }

  /**
   * [description] 返回数组中满足比较器的元素的交集
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  intersectionWith = (...arrays) => {
    let comparator = arrays.pop()
    return arrays[0].filter(it => (arrays[1].some(val => comparator(val, it))))
  }


  /**
   * [join description] 返回将数组的元素用separator串联的字符串
   * @param  {[type]} array     [description]
   * @param  {String} separator [description]
   * @return {[type]}           [description]
   */
  join = (array, separator = ",") => {
    let result = ""
    for (let i = 0; i < array.length - 1; i++) {
      separator += ""
      result += array[i] + separator
    }
    return result + array[array.length - 1]
  }

  /**
   * [description] 返回数组的最后一项
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  last = array => array[array.length - 1]

  /**
   * [description] 倒序查找元素的下标
   * @param  {[type]} array     [description]
   * @param  {[type]} value     [description]
   * @param  {[type]} fromIndex [description]
   * @return {[type]}           [description]
   */
  lastIndexOf = (array, value, fromIndex = array.length - 1) => {
    if (fromIndex < 0) return -1
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
  }


  /**
   * [description] 返回数组中第n个元素  支持负数查找
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  nth = (array, n = 0) => n >= 0 ? array[n] : array[array.length + n]

  /**
   * [pull description] 返回一个移除values元素的数组
   * @param  {[type]}    array  [description]
   * @param  {...[type]} values [description]
   * @return {[type]}           [description]
   */
  pull = (array, ...values) => {
    let map = {}
    for (let s of values) {
      if (!map[s]) {
        map[s] = 1
      }
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] in map) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  }

  /**
   * [description] 返回一个剔除数组values中元素的数组
   * @param  {[type]} array  [description]
   * @param  {[type]} values [description]
   * @return {[type]}        [description]
   */
  pullAll = (array, values) => {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (values.includes(array[i])) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  }

  /**
   * [description] 返回剔除values中符合条件之后的array
   * @param  {[type]} array     [description]
   * @param  {[type]} values    [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  pullAllBy = (array, values, predicate) => {
    predicate = iteratee(predicate)

    values = values.map(val => predicate(val))

    for (let i = 0; i < array.length; i++) {
      if (values.includes(predicate(array[i]))) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  }

  /**
   * [description] 返回array剔除对比器中满足条件的元素之后的array数组
   * @param  {[type]} array      [description]
   * @param  {[type]} values     [description]
   * @param  {[type]} comparator [description]
   * @return {[type]}            [description]
   */
  pullAllWith = (array, values, comparator) => {
    // let res = []
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (comparator(array[i], values[j])) {
          array.splice(i, 1)
          i--
        }
      }
    }
    return array
  }

  /**
   * [description] 返回array中Indexes中所有下标的元素的数组
   * @param  {[type]} array   [description]
   * @param  {[type]} indexes [description]
   * @return {[type]}         [description]
   */
  pullAt = (array, indexes) => {
    let pulled = []
    let count = 1
    for (let i = 0; i < indexes.length; i++) {
      if (pulled.length > 0 && pulled.length < indexes.length) {
        indexes[i] = indexes[i] - count
        count++
      }
      pulled.push(...array.splice(indexes[i], 1))
    }
    return pulled
  }

  /**
   * [description]返回array中元素满足条件一个新数组 array剔除这些数组
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  remove = (array, predicate) => {
    predicate = iteratee(predicate)
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        res.push(array[i])
        array.splice(i, 1)
        i--
      }
    }
    return res
  }

  /**
   * [reverse description] 反转数组
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  reverse = (array) => {
    let len = array.length / 2 | 0
    let left = 0
    let right = array.length - 1
    for (let i = 0; i <= len; i++) {
      let temp = array[left]
      array[left] = array[right]
      array[right] = temp
      left++
      right--
    }
    return array
  }

  /**
   * [description] 返回array从start下标到end下标的元素的数组
   * @param  {[type]} array [description]
   * @param  {Number} start [description]
   * @param  {[type]} end   [description]
   * @return {[type]}       [description]
   */
  slice = (array, start = 0, end = array.length) => {
    let res = []
    for (let i = start; i < end; i++) {
      res.push(array[i])
    }
    return res
  }
  /**
   * [sortedIndex description] 返回将value元素放进array中排序之后的下标
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  sortedIndex = (array, value) => {
    array.push(value)
    array.sort((a, b) => a - b)
    return array.indexOf(value)
  }

  /**
   * [description] 返回将value元素放进array中排序之后的下标
   * @param  {[type]} array     [description]
   * @param  {[type]} value     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  sortedIndexBy = (array, value, predicate) => {
    array.push(value)
    predicate = iteratee(predicate)
    let res = array.map(it => it = predicate(it))
    res.sort((a, b) => a - b)
    return res.indexOf(predicate(value))
  }

  /**
   * [description] 查询下标
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  sortedIndexOf = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
  }

  /**
   * [description] 倒序查询
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  sortedLastIndex = (array, value) => {
    array.push(value)
    array.sort((a, b) => a - b)
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
  }

  /**
   * [description] //将value元素插入数组倒序查询下标
   * @param  {[type]} array     [description]
   * @param  {[type]} value     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  sortedLastIndexBy = (array, value, predicate) => {
    predicate = iteratee(predicate)
    array.push(value)
    let res = array.map(it => it = predicate(it))
    res.sort((a, b) => b - a)
    for (let i = 0; i < res.length; i++) {
      if (res[i] === predicate(value)) {
        return i
      }
    }
  }

  /**
   * [description] 倒序查询下标
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  sortedLastIndexOf = (array, value) => {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
  }

  /**
   * [description]  排序去重
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  sortedUniq = (array) => {
    let map = {}
    let arr = []
    for (let n of array) {
      if (!map[n]) {
        map[n] = 1
        arr.push(n)
      }
    }
    return arr
  }

  /**
   * [description] 去重 返回第一个不重复的元素组成的数组
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  sortedUniqBy = (array, predicate) => {
    predicate = iteratee(predicate)
    let res = []
    let flag = []
    for (let i = 0; i < array.length; i++) {
      if (!flag.includes(predicate(array[i]))) {
        flag.push(predicate(array[i]))
        res.push(array[i])
      }
    }
    return res
  }

  /**
   * [description] 返回去除第一元素之后的数组
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  tail = array => array.filter((item, index) => index > 0)

  /**
   * [description] 返回数组 n号下标之前的元素组成的数组
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  take = (array, n = 1) => {
    if (n === 0) return []
    if (n > array.length) return array
    let len = array.length - n
    for (let i = 0; i < len; i++) {
      array.pop()
    }
    return array
  }

  /**
   * [takeRight description] 倒序返回take
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  takeRight = (array, n = 1) => {
    if (n === 0) return []
    if (n > array.length) return array
    let len = array.length - n
    for (let i = 0; i < len; i++) {
      array.shift()
    }
    return array
  }

  /**
   * [description] 倒序返回直到元素的条件返回false为止 返回该元素之后的元素
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  takeRightWhile = (array, predicate) => {
    predicate = iteratee(predicate)
    for (let i = array.length - 1; i > -1; i--) {
      if (!predicate(array[i])) {
        return array.slice(i + 1)
      }
    }
  }

  /**
   * [description]正序返回第一个不符合条件的元素之前的所有元素组成的数组
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  takeWhile = (array, predicate) => {
    predicate = iteratee(predicate)
    for (let i = 0; i < array.length; i++) {
      if (!predicate(array[i])) {
        return array.slice(0, i)
      }
    }
  }


  /**
   * [union description] 返回一个交集的数组
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  union = (...arrays) => {
    let arr = []
    let map = {}
    for (let s of arrays) {
      for (let n of s) {
        if (!map[n]) {
          map[n] = 1
          arr.push(n)
        }
      }
    }
    return arr
  }

  /**
   * [description] 返回一个筛选之后的交集数组
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  unionBy = (...arrays) => {
    let predicate = iteratee(arrays.pop())
    let res = []
    let map = {}
    arrays = flattenDeep(arrays)
    for (let val of arrays) {
      if (!map[predicate(val)]) {
        map[predicate(val)] = 1
        res.push(val)
      }
    }
    return res
  }

  /**
   * [description]返回比较器筛选之后的交集数组
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  unionWith = (...arrays) => {
    let comparator = arrays.pop()
    for (let i = 0; i < arrays[0].length; i++) {
      for (let j = 0; j < arrays[1].length; j++) {
        if (comparator(arrays[0][i], arrays[1][j])) {
          arrays[1].splice(j, 1)
          j--
        }
      }
    }
    return flattenDeep(arrays)
  }

  /**
   * [uniq description] 数组去重
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  uniq = (array) => Array.from(new Set(array))

  /**
   * [description]去重
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  uniqBy = (array, predicate) => {
    predicate = iteratee(predicate)
    let res = []
    let flag = {}
    for (let val of array) {
      if (!flag[predicate(val)]) {
        flag[predicate(val)] = 1
        res.push(val)
      }
    }
    return res
  }

  /**
   * [description]比较去重
   * @param  {[type]} array      [description]
   * @param  {[type]} comparator [description]
   * @return {[type]}            [description]
   */
  uniqWith = (array, comparator) => {
    let res = []
    array.forEach(it => res.some(val => comparator(it, val)) ? res : res.push(it))
    return res
  }

  /**
   * [description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  unzip = (array) => {
    let res = []
    for (let i = 0; i < array[0].length; i++) {
      let arr = []
      for (let n of array) {
        arr.push(n[i])
      }
      res.push(arr)
    }
    return res
  }

  /**
   * [description]
   * @param  {[type]} arrays   [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  unzipWith = (arrays, iteratee) => unzip(arrays).map(it => iteratee(...it))

  /**
   * [description]
   * @param  {[type]}    array  [description]
   * @param  {...[type]} values [description]
   * @return {[type]}           [description]
   */
  without = (array, ...values) => array.filter(it => !values.some(val => it === val))

  /**
   * [description]
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  xor = (...arrays) => {
    arrays = flattenDeep(arrays)
    let map = {}
    let res = []
    for (let val of arrays) {
      if(!map[val]) {
        map[val] = 1
      } else {
        map[val]++
      }
    }
    for (let e in map) {
      if (map[e] === 1) {
        res.push(+e)
      }
    }
    return res

  }

  /**
   * [description]
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  xorBy = (...arrays) => {
    predicate = iteratee(arrays.pop())
    arrays = flattenDeep(arrays) //深度展开
    let res = {}
    arrays.forEach(it => { //遍历
      if (res[predicate(it)]) { //如果有重复的将其放到一起
        res[predicate(it)].push(it)
      } else { //不重复 将其作为属性值(数组形式) 可以进行push操作
        res[predicate(it)] = [it]
      }
    })

    return flattenDeep(Object.values(res).filter(it => it.length === 1))
  }

  /**
   * [description]
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  xorWith = (...arrays) => {
    let comparator = arrays.pop()
    let res = []
    array = flattenDeep(arrays)
    for (let i = 0; i < array.length; i++) {
      let flag = false
      for (let j = 0; j < array.length; j++) {
        if (i !==j && comparator(array[i], array[j])) {
          //i !==j 说明不是同一个元素且相同
          flag = true
        }
      }
      if (!flag) {
        res.push(array[i])
      }
    }
    return res
  }

  /**
   * [description]
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  zip = (...arrays) => {
    let res = []
    for (let i = 0; i < arrays[0].length; i++) {
      let arr = []
      for (let n of arrays) {
        arr.push(n[i])
      }
      res.push(arr)
    }
    return res
  }

  /**
   * [description]
   * @param  {Array}  props  [description]
   * @param  {Array}  values [description]
   * @return {[type]}        [description]
   */
  zipObject = (props = [], values = []) => {
    let map = {}
    for (let i = 0; i < props.length; i++) {
      map[props[i]] = values[i]
    }
    return map
  }

  /**
   * [description]
   * @param  {Array}  props  [description]
   * @param  {Array}  values [description]
   * @return {[type]}        [description]
   */
  zipObjectDeep = (props = [], values = []) => {

  }

  /**
   * [description]
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  zipWith = (...arrays) => {
    let predicate = iteratee(arrays.pop())
    return zip(...arrays).map(it => it = predicate(...it))
  }


  /**
   * [description] 返回一个对象 又collection每一项通过iteratee函数 所形成的集合
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  countBy = (collection, predicate) => {
    predicate = iteratee(predicate)
    let map = {}
    for (let val of collection) {
      if (!map[predicate(val)]) {
        map[predicate(val)] = 1
      } else {
        map[predicate(val)]++
      }
    }
    return map
  }

  /**
   * [forEach description] 返回原始数组 将每一项都传给iteratee函数
   * @param  {[type]} collection [description]
   * @param  {[type]} action     [description]
   * @return {[type]}            [description]
   */
  forEach = (collection, predicate) => {
    predicate = iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      predicate(collection[i], i, collection)
    }
    return collection
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  forEachRight = (collection, predicate) => {
    predicate = iteratee(predicate)
    for (let i = collection.length - 1; i > -1; i--) {
      predicate(collection[i], i, collection)
    }
    return collection
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  filter = (collection, predicate) => {
    predicate = iteratee(predicate)
    let res = []
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) {
        res.push(collection[i])
      }
    }
    return res
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @param  {Number} fromIndex  [description]
   * @return {[type]}            [description]
   */
  find = (collection, predicate, fromIndex = 0) => {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) {
        return collection[i]
      }
    }
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @param  {[type]} fromIndex  [description]
   * @return {[type]}            [description]
   */
  findLast = (collection, predicate, fromIndex = collection.length - 1) => {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i > -1; i--) {
      if (predicate(collection[i], i, collection)) {
        return collection[i]
      }
    }
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  flatMap = (collection, predicate) => {
    predicate = iteratee(predicate)
    return flattenDeep(collection.map(it => it = predicate(it)))
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  flatMapDeep = (collection, predicate) => flatMap(collection, predicate)

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @param  {Number} depth      [description]
   * @return {[type]}            [description]
   */
  flatMapDepth = (collection, predicate, depth = 1) => {
    predicate = iteratee(predicate)
    return flattenDepth(collection.map(it => it = predicate(it)), depth)
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  groupBy = (collection, predicate) => {
    predicate = iteratee(predicate)
    let map = {}
    for (let val of collection) {
      if (!map[predicate(val)]) {
        map[predicate(val)] = [val]
      } else {
        map[predicate(val)].push(val)
      }
    }
    return map
  }

  /**
   * [includes description]
   * @param  {[type]} collection [description]
   * @param  {[type]} value      [description]
   * @param  {Number} fromIndex  [description]
   * @return {[type]}            [description]
   */
  includes = (collection, value, fromIndex = 0) => {
    if (typeof collection === 'string') {
      let count = 0
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value[0]) {
          for (let j = 1; j < value.length; j++) {
            i++
            if (collection[i] !== value[j]) {
              return false
            }
          }
          return true
        }
      }
    }

    if (Array.isArray(collection)) {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value) {
          return true
        }
      }
      return false
    }

    if (typeof collection === 'object') {
      for (let e in collection) {
        if (collection[e] === value) {
          return true
        }
      }
      return false
    }
  }

  /**
   * [description]
   * @param  {[type]}    collection [description]
   * @param  {[type]}    path       [description]
   * @param  {...[type]} args       [description]
   * @return {[type]}               [description]
   */
  invokeMap = (collection, path, ...args) => {
    if (isString(path)) {
      //如果是字符串 需要先获得其类型上的方法函数
      path = collection[path]
    }
    return collection.map(it => path.call(it, ...args))
  }

  /**
   * [description] 根据属性名分组
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  keyBy = (collection, predicate) => {
    predicate = iteratee(predicate)
    let map = {}
    for (let val of collection) {
      map[predicate(val)] = val
    }
    return map
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  map = (collection, predicate) => {
    predicate = iteratee(predicate)
    let mapped = []
    for (let i in collection) { //下标遍历 减少代码量
      mapped.push(predicate(collection[i], +i, collection))
    }
    return mapped
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @param  {[type]} orders     [description]
   * @return {[type]}            [description]
   */
  orderBy = (collection, predicate, orders) => {

  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  partition = (collection, predicate) => {
    predicate = iteratee(predicate)
    let res = [[],  []]
    //因为只需要两组 一组true 一组false
    for (let val of collection) {
      if (predicate(val)) {
        res[0].push(val)
      } else {
        res[1].push(val)
      }
    }
    return res
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @param  {[type]} accu       [description]
   * @return {[type]}            [description]
   */
  reduce = (collection, predicate, accu) => {
    predicate = iteratee(predicate)
    let start = 0
    if (accu === undefined) {
      //如果不存在初始值 就让collection的第一个值作为初始值
      accu = collection[0]
      start = 1
    }

    for (let i= start; i < collection.length; i++) { //下标遍历
      accu = predicate(accu, collection[i], i, collection)
    }
    return accu
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @param  {[type]} accu       [description]
   * @return {[type]}            [description]
   */
  reduceRight = (collection, predicate, accu) => {
    predicate = iteratee(predicate)
    if (accu === undefined) {
      accu = 0
    }
    for (let i = collection.length - 1; i > -1; i--) {
      accu = predicate(accu, collection[i], i, collection)
    }
    return accu
  }

  /**
   * [description] 返回与filter相反 不符合条件的元素组成的数组
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  reject = (collection, predicate) => {
    predicate = iteratee(predicate)
    return collection.filter(it => !predicate(it))
  }

  /**
   * [description] 随机返回数组中任一元素
   * @param  {[type]} collection [description]
   * @return {[type]}            [description]
   */
  sample = collection => {
    //将其映射数组中多个属性-属性值的数组项
    collection = Object.entries(collection)
    //返回一个小于数组长度的随机数
    return collection[Math.random() * collection.length | 0][1]
  }

  /**
   * [description]随机返回数组中n个元素
   * @param  {[type]} collection [description]
   * @param  {Number} n          [description]
   * @return {[type]}            [description]
   */
  sampleSize = (collection, n = 1) => {
    n = n > collection.length ? collection.length : n
    let res = []
    //将其映射数组中多个属性-属性值的数组项
    collection = Object.entries(collection)
    //返回一个小于数组长度的随机数
    for (let i = 0; i < n; i++) {
      let idx = Math.random() * collection.length | 0
      res.push(collection[idx][1])
      collection.splice(idx, 1)
    }
    return res
  }

  /**
   * [description] 返回将数组顺序打乱的数组
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  shuffle = array => sampleSize(array, n = array.length)


  /**
   * [size description]
   * @param  {[type]} collection [description]
   * @return {[type]}            [description]
   */
  size = collection => {
    if (!Array.isArray(collection) && typeof collection === 'object') {
      let count = 0
      for (let e in collection) {
        count++
      }
      return count
    }
    return collection.length
  }

  /**
   * [description]
   * @param  {[type]} collection [description]
   * @param  {[type]} predicate  [description]
   * @return {[type]}            [description]
   */
  sortBy = (collection, predicate) => {
    for (let fn of predicate) {
      fn = iteratee(fn)
      collection.sort((a, b) => {
        if (fn(a) > fn(b)) {
          return 1
        } else if (fn(a) < fn(b)) {
          return -1
        } else {
          return 0
        }
      })
    }
    return collection
  }

  /**
   * [description]
   * @param  {[type]}    func [description]
   * @param  {...[type]} args [description]
   * @return {[type]}         [description]
   */
  defer = (func, ...args) => func(...args)

  /**
   * [description]
   * @param  {[type]}    func  [description]
   * @param  {[type]}    wait  [description]
   * @param  {...[type]} args) [description]
   * @return {[type]}          [description]
   */
  delay = (func, wait, ...args) => setTimeout((...args) => func(...args), wait, ...args)

  /**
   * [castArray description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  function castArray(value) {
    if (isArray(value)) {
      return value
    } else if (arguments.length === 0) {
      return []
    } else if (value === undefined){
      return [undefined]
    } else if (value === null) {
      return [null]
    } else {
      return [value]
    }
  }

  /**
   * [description] 返回object的的属性是否符合source的描述
   * @param  {[type]} object  [description]
   * @param  {[type]} source  [description]
   * @return {[type]} Boolean [description]
   */
  conformsTo = (object, source) => {
    for (let key in source) {
      return source[key](object[key])
    }
  }

  /**
   * [eq description]
   * @param  {[type]} a [description]
   * @param  {[type]} b [description]
   * @return {[type]}   [description]
   */
  function eq(a, b) {
    if (a === b) {
      return true
    }

    if (a !== a && b !== b) {
      return true
    }

    if (typeof a !== typeof b) {
      return false
    }

    if ((Array.isArray(a) && Array.isArray(b))) {
      for (let key in a) {
        if (!eq(a[key], b[key])) {
          return false
        }
      }

      for (let key in b) {
        if (!eq(a[key], b[key])) {
          return false
        }
      }
      return true
    }
    return false

  }


  /**
   * [description]
   * @param  {[type]} value [description]
   * @param  {[type]} other [description]
   * @return {[type]}       [description]
   */
  gt = (value, other) => value > other

  /**
   * [description]
   * @param  {[type]} value [description]
   * @param  {[type]} other [description]
   * @return {[type]}       [description]
   */
  gte = (value, other) => value >= other


  /**
   * [description]
   * @param  {[type]} a [description]
   * @param  {[type]} b [description]
   * @return {[type]}   [description]
   */
  isEqual = (a, b) => {
    if (a === b) { //判断正常类型
      return true
    }

    if (a !== a && b !== b) { //判断NAN
      return true
    }

    if (typeof a !== typeof b) {
      return false
    }

    if (Array.isArray(a) && (!Array.isArray(b) && isObject(b))) {
      return false
    }

    if (Array.isArray(b) && (!Array.isArray(a) && isObject(a))) {
      return false
    }

    if ((typeof a === 'object' && typeof b === 'object') || (Array.isArray(a) && Array.isArray(b))) {
      for (let key in a) {
        if (!isEqual(a[key], b[key])) {
          return false
        }
      }

      for (let key in b) {
        if (!isEqual(a[key], b[key])) {
          return false
        }
      }
      return true
    }
    return false
  }

  /**
   * [description]
   * @param  {[type]} value      [description]
   * @param  {[type]} other      [description]
   * @param  {[type]} comparator [description]
   * @return {[type]}            [description]
   */
  isEqualWith = (value, other, comparator) => {
    //采用计数方法
    let count = 0
    let flag = 0
    for (let val in value) {
      count++
      if (comparator(value[val], other[val]) || isEqual(value[val], other[val])) {
        flag++
      }
    }
    return count === flag
  }

  /**
   * [isEmpty description]
   * @param  {[type]}  value [description]
   * @return {Boolean}       [description]
   */
  function isEmpty(value) {
    if (value === null) {
      return true
    }
    if (typeof value === 'object') {
      return false
    }
    return true
  }


  isBoolean = value => Object.prototype.toString.call(value) === "[object Boolean]"

  isObject = value => Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Function]" || Object.prototype.toString.call(value) === "[object Array]" //对象是对象  函数是对象 数组是对象

  isArray = value => Object.prototype.toString.call(value) === "[object Array]"

  isFunction = value => Object.prototype.toString.call(value) === "[object Function]"

  isNull = value => Object.prototype.toString.call(value) === "[object Null]"

  isNumber = value => Object.prototype.toString.call(value) === "[object Number]"

  isString = value => Object.prototype.toString.call(value) === "[object String]"

  isArguments = value => Object.prototype.toString.call(value) === "[object Arguments]"

  isArrayBuffer = value => Object.prototype.toString.call(value) === "[object ArrayBuffer]"

  isArrayLikeObject = value => typeof value === "object" && value.length >= 0
  //类数组满足 首先不是函数  可以取到长度属性
  isArrayLike = value => Object.prototype.toString.call(value) !== "[object Function]" && value.length >= 0

  isDate = value => Object.prototype.toString.call(value) === "[object Date]"

  isElement = value => Object.prototype.toString.call(value) === "[object HTMLBodyElement]"

  isError = value => Object.prototype.toString.call(value) === "[object Error]"

  isFinite = value => typeof value === "number" && value <= Number.MAX_VALUE && value >= Number.MIN_VALUE

  isInteger = value => typeof value === "number" && value !== Infinity && value !== -Infinity && value !== Number.MIN_VALUE && value !== Number.MAX_VALUE && Math.floor(value) === value

  isLength = value => isInteger(value) && value >= 0 && value < 2 ** 53 - 1

  isMap = value => Object.prototype.toString.call(value) === "[object Map]"

  isNative = value => value.toString().includes("[native code]") //原始类型函数

  isNil = value => typeof value === "undefined" || value === null

  isObjectLike = value => typeof value === "object" && value !== null

  isPlainObject = value => Object.prototype.toString.call(value) === "[object Object]" && (value.__proto__ === undefined || value.__proto__.constructor.name === "Object")

  isRegExp = value => Object.prototype.toString.call(value) === "[object RegExp]"

  isSafeInteger = value => {
    if (!isInteger(value)) {
      return false
    } else {
      return value <= 2 ** 53 - 1 && value >= -(2 ** 53)
    }
  }

  isSet = value => Object.prototype.toString.call(value) === "[object Set]"

  isTypedArray = value => /\[object Uint\d+?Array\]/.test(Object.prototype.toString.call(value))

  isUndefined = value => typeof value === "undefined"

  isWeakMap = value => Object.prototype.toString.call(value) === "[object WeakMap]"

  isWeakSet = value => Object.prototype.toString.call(value) === "[object WeakSet]"

  isSymbol = value => Object.prototype.toString.call(value) === "[object Symbol]"

  isMatch = (object, source) => { //遍历source
    for (let e in source) {
      if (!isEqual(object[e], source[e])) {
        return false
      }
    }
    return true
  }

  isMatchWith = (object, source, comparator) => {
    for (let e in source) {
      if (!comparator(object[e], source[e])) {
        return false
      }
    }
    return true
  }

  isNaN = (value) => {
    if (value !== value && typeof value === "number") {
      return true
    }

    if (typeof value === "object" && value.toString() === "NaN") {
      return true
    }
    return false
  }

  lt = (value, other) => value < other

  lte = (value, other) => value <= other

  function toArray(value) {
    let res = []
    if (value === null) {
      return res
    }
    if (typeof value === 'string') {
      for (let s of value) {
        res.push(s)
      }
    }
    if (typeof value === 'object') {
      for (let e in value) {
        res.push(value[e])
      }
    }

    if (isNaN(value)) {
      return res
    }
    return res
  }

  toInteger = value => {
    if (value > Number.MAX_VALUE) {
      return Number.MAX_VALUE
    } else if (value === Number.MIN_VALUE) {
      return 0
    } else if (value >= 0) {
      return Number(value) | 0
    } else if (value < 0) {
      return -Number(value) | 0
    } else {
      return Number(value) | 0
    }
  }

  toLength = value => {
    if (value < 0) {
      return 0
    } else if (value >= 2 ** 32 - 1) {
      return 2 ** 32 - 1
    }
    return Number(value) | 0

  }

  toSafeInteger = value => {
    if (value === Number.MIN_VALUE) {
      return 0
    }
    if (value >= Number.MAX_SAFE_INTEGER) {
      return Number.MAX_SAFE_INTEGER
    }
    if (value <= Number.MIN_SAFE_INTEGER) {
      return Number.MIN_SAFE_INTEGER
    }
    return Number(value) | 0
  }

  /**
   * [description] 加法
   * @param  {[type]} augend [description]
   * @param  {[type]} addend [description]
   * @return {[type]}        [description]
   */
  add = (augend, addend) => augend + addend

  /**
   * [description] 保留位数向上取整
   * @param  {[type]} number    [description]
   * @param  {Number} precision [description]
   * @return {[type]}           [description]
   */
  ceil = (number, precision = 0) => Math.ceil(number * 10 ** precision) / 10 ** precision

  /**
   * [description] 减法
   * @param  {[type]} dividend [description]
   * @param  {[type]} divisor  [description]
   * @return {[type]}          [description]
   */
  divide = (dividend, divisor) => dividend / divisor

  /**
   * [description]保留位数向下取整
   * @param  {[type]} number    [description]
   * @param  {Number} precision [description]
   * @return {[type]}           [description]
   */
  floor = (number, precision = 0) => Math.floor(number * 10 ** precision) / 10 ** precision

  /**
   * [description] 最大值
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  max = array => {
    if (array.length === 0) return undefined
    return array.reduce((a, b) => a > b ? a : b)
  }

  /**
   * [description] 最大值
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  maxBy = (array, predicate) => {
    predicate = iteratee(predicate)
    if (array.length === 0) return undefined
    return array.reduce((a, b) => predicate(a) > predicate(b) ? a : b)
  }

  /**
   * [description] 平均值
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  mean = array => sum(array) / array.length

  meanBy = (array, predicate) => sumBy(array, predicate) / array.length

  /**
   * [description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  min = (array) => {
    if (array.length === 0) return undefined
    return array.reduce((a, b) => a < b ? a : b)
  }

  minBy = (array, predicate) => {
    predicate = iteratee(predicate)
    if (array.length === 0) return undefined
    return array.reduce((a, b) => predicate(a) < predicate(b) ? a : b)
  }

  multiply = (multiplier, multiplicand) => multiplier * multiplicand

  round = (number, precision = 0) => {
    const max = ceil(number, precision)
    const min = floor(number, precision)
    const avg = (max + min) / 2
    return number > avg ? max : min
  }

  subtract = (minuend, subtrahend) => minuend - subtrahend

  sum = array => array.reduce((a, b) => a + b)

  sumBy = (array, predicate) => {
    predicate = iteratee(predicate)
    let res = array.map(predicate)
    return res.reduce((a, b) => a + b)
  }



  /**
   * [description] predicate中所有元素都匹配ary
   * @param  {[type]} ary       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]} Boolean   [description]
   */
  every = (ary, predicate) => {
    predicate = iteratee(predicate)
    for (let i = 0; i < ary.length; i++) {
      if (!predicate(ary[i], i, ary)) {
        return false
      }
    }
    return true
  }

  /**
   * [description] predicate中的任意元素匹配ary
   * @param  {[type]} ary       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  some = (ary, predicate) => {
    predicate = iteratee(predicate)
    for (let i = 0; i < ary.length; i++) {
      if (predicate(ary[i], i, ary)) {
        return true
      }
    }
    return false
  }

  /**
   * [description]中间值
   * @param  {[type]} number [description]
   * @param  {[type]} lower  [description]
   * @param  {[type]} upper  [description]
   * @return {[type]}        [description]
   */
  clamp = (number, lower, upper) => {
    return [number, lower, upper].sort((a, b) => a - b)[1]
  }

  /**
   * [inRange description]
   * @param  {[type]} number [description]
   * @param  {Number} start  [description]
   * @param  {[type]} end    [description]
   * @return {[type]}        [description]
   */
  inRange = (number, start = 0, end) => {
    if (end === undefined) {
      end = start
      start = 0;
    }

    if (start < end) {
      return number > start && number < end ? true : false
    } else {
      return number > end && number < start ? true : false
    }
  }

  /**
   * [description]
   * @param  {...[type]} args [description]
   * @return {[type]}         [description]
   */
  random = (...args) => {
    if (args.length === 1) {
      if ((args[0] | 0) === args[0]) {
        return Math.random() * args[0] | 0
      }
      return Math.random() * args[0]
    } else{
      let last = args[args.length - 1]
      if (isBoolean(last)) {
        if (last) {
          return Math.random() * args[args.length - 2]
        } else {
          return Math.random() * args[args.length - 2] | 0
        }
      } else {
        if ((last | 0) === last) {
          return Math.random() * last | 0
        }
        return Math.random() * last
      }
    }
  }

  /**
   * [description] 将来源队形sources中的自身可枚举属性分配给目标对象
   * 若目标对象上有该属性需进行覆盖
   * @param  {[type]}    target  [description]
   * @param  {...[type]} sources [description]
   * @return {[type]}            [description]
   */
  assign = (target, ...sources) => {
    const hasOwn = Object.prototype.hasOwnProperty
    for (let n of sources) {
      for (let e in n) {
        if (hasOwn.call(n, e)) {
          target[e] = n[e]
        }
      }
    }
    return target
  }

  /**
   * [description]将来源队形sources中的自身及继承的可枚举属性分配给目标对象
   * 若目标对象上有该属性需进行覆盖
   * @param  {[type]}    target  [description]
   * @param  {...[type]} sources [description]
   * @return {[type]}            [description]
   */
  assignIn = (target, ...sources) => {
    for (let obj of sources) {
      for (let e in obj) {
        target[e] = obj[e]
      }
    }
    return target
  }

  /**
   * [description] 与assignIn相似 不过需接收customizer函数判定
   * @param  {[type]}    obj     [description]
   * @param  {...[type]} sources [description]
   * @return {[type]}            [description]
   */
  assignInWith = (obj, ...sources) => {
    const customizer = iteratee(sources.pop())
    for (let src of sources) {
      for (let e in src) {
        obj[e] = customizer(obj[e], src[e], e, obj, sources)
      }
    }
    return obj
  }

  /**
   * [description] 与assign相似 不过需接收customizer函数判定
   * @param  {[type]}    obj     [description]
   * @param  {...[type]} sources [description]
   * @return {[type]}            [description]
   */
  assignWith = (obj, ...sources) => {
    const hasOwn = Object.prototype.hasOwnProperty
    const customizer = iteratee(sources.pop())
    for (let src of sources) {
      for (let e in src) {
        if (hasOwn.call(obj, e)) {
          obj[e] = customizer(obj[e], src[e], e, obj, sources)
        }
      }
    }
    return obj
  }

  /**
   * [description] 返回obj中path路径的值
   * @param  {[type]} obj   [description]
   * @param  {[type]} paths [description]
   * @return {[type]}       [description]
   */
  at = (obj, paths) => {
    for (let key in paths) {
      let pathsVal = paths[key].split("")
      remove(pathsVal, it => it === '.' || it === '[' || it === ']')
      let objV = obj
      for (let val of pathsVal) {
        objV = objV[val]
      }
      paths[key] = objV
    }
    return paths
  }

  /**
   * [description]
   * @param  {[type]}    obj     [description]
   * @param  {...[type]} sources [description]
   * @return {[type]}            [description]
   */
  defaults = (obj, ...sources) => {
    for (let src of sources) {
      for (let e in src) {
        if(!obj[e]) {
          obj[e] = src[e]
        }
      }
    }
    return obj
  }

  /**
   * [description]
   * @param  {[type]}    obj     [description]
   * @param  {...[type]} sources [description]
   * @return {[type]}            [description]
   */
  defaultsDeep = (obj, ...sources) => {
    for (let src of sources) {
      for (let e in src) {
        if (isObject(src[e])) {
          defaultsDeep(obj[e], src[e])
        } else {
          if (!obj[e]) {
            obj[e] = src[e]
          }
        }
      }
    }
    return obj
  }

  /**
   * [description] 返回满足匹配条件的元素
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  findKey = (obj, predicate) => {
    predicate = iteratee(predicate)
    for (let key in obj) {
      if (predicate(obj[key])) {
        return key
      }
    }
  }

  /**
   * [description] 倒序返回满足匹配条件的元素
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  findLastKey = (obj, predicate) => {
    predicate = iteratee(predicate)
    let res = []
    for (let key in obj) {
      res.push([key, obj[key]])
    }
    res = res.reverse()
    for (let val of res) {
      if (predicate(val[1])) {
        return val[0]
      }
    }
  }

  /**
   * [description]遍历自身和继承的可枚举属性 将其传给iteratee
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  forIn = (obj, predicate) => {
    //用for In 遍历并不能保证顺序
    //使用数组for按照下标遍历才能保证顺序
    //chrome总是数字升序进行遍历 先key 后val
    predicate = iteratee(predicate)
    for (let key in obj) {
      predicate(obj[key], key)
    }
    return obj
  }

  /**
   * [description]遍历自身和继承的可枚举属性 将其倒序传给iteratee
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  forInRight = (obj, predicate) => {
    let res = []
    for (let key in obj) {
      res.push([obj[key], key])
    }
    forEachRight(res, it => predicate(...it))
    return obj
  }

  /**
   * [description]遍历自身的可枚举属性 并将其key val传给predicate
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  forOwn = (obj, predicate) => {
    let hasOwn = Object.prototype.hasOwnProperty
    predicate = iteratee(predicate)
    for (let key in obj) {
      if(hasOwn.call(obj, key)) {
        predicate(obj[key], key)
      }
    }
    return obj
  }

  /**
   * [description] forOwn 的倒序遍历
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  forOwnRight = (obj, predicate) => {
    let res = []
    let hasOwn = Object.prototype.hasOwnProperty
    predicate = iteratee(predicate)
    for (let key in obj) {
      if (hasOwn.call(obj, key)) {
        res.push([obj[key], key])
      }
    }
    forEachRight(res, it => predicate(...it))
    return obj
  }

  /**
   * [description] 返回obj自身可枚举中函数属性名组成的数组
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  functions = obj => {
    let res = []
    let hasOwn = Object.prototype.hasOwnProperty
    for (let key in obj) {
      if (hasOwn.call(obj, key) && isFunction(obj[key])) {
        res.push(key)
      }
    }
    return res
  }

  /**
   * [description]返回obj自身及继承的可枚举中函数属性名组成的数组
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  functionsIn = obj => {
    let res = []
    for (let key in obj) {
      if (isFunction(obj[key])) {
        res.push(key)
      }
    }
    return res
  }

  getPath = arg => {
    return function(obj) {
      let args = toPath(arg)
      for (let val of args) {
        try {
          obj = obj[val]
        } catch (e) {
          return undefined
        }
      }
      return obj
    }
  }

  /**
   * [description]得到obj对象中path路径的属性值
   * @param  {[type]} obj          [description]
   * @param  {[type]} path         [description]
   * @param  {[type]} defaultValue [description]
   * @return {[type]}              [description]
   */
  get = (obj, path, defaultValue) => {
      //此处根据需要包装书写了一个path函数
      let func = getPath(path)
      let val = func(obj)
      if (!val) {
        return defaultValue
      } else {
        return val
      }
  }

  hasPath = arg => {
    return function(obj) {
      let argArr = toPath(arg)
      for (let val of argArr) {
        try {
          obj = obj[val]
        } catch (e) {
          return false
        }
      }
      if (obj !== undefined) {
        return true
      } else {
        return false
      }
    }
  }

  /**
   * [description] 查看obj自身可枚举属性是否存在path路径的属性值
   * @param  {[type]} obj  [description]
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  has = (obj, path) => {
    let func = hasPath(path)
    let hasOwn = Object.prototype.hasOwnProperty
    let newObj = {}
    for (let key in obj) {
      if (hasOwn.call(obj, key)) {
        newObj[key] = obj[key]
      }
    }
    return func(newObj)
  }

  /**
   * [description]查看obj自身及继承可枚举属性是否存在path路径的属性值
   * @param  {[type]} obj  [description]
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  hasIn = (obj, path) => {
    let func = hasPath(path)
    return func(obj)
  }

  /**
   * [description] 返回一个新对象val key的反转组合
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  invert = obj => {
    let newObj = {}
    for (let key in obj) {
      newObj[obj[key]] = key
    }
    return newObj
  }

  /**
   * [description]
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  invertBy = (obj, predicate) => {
    let newObj = {}
    for (let key in obj) {
      if (!predicate) {
        if (newObj[obj[key]]) {
          newObj[obj[key]].push(key)
        } else {
          newObj[obj[key]] = [key]
        }
      } else {
        predicate = iteratee(predicate)
        if (newObj[predicate(obj[key])]) {
          newObj[predicate(obj[key])].push(key)
        } else {
          newObj[predicate(obj[key])] = [key]
        }
      }
    }
    return newObj
  }

  /**
   * [description]在obj的path上调用方法
   * @param  {[type]}    obj  [description]
   * @param  {[type]}    path [description]
   * @param  {...[type]} args [description]
   * @return {[type]}         [description]
   */
  invoke = (obj, path, ...args) => {
    let paths = toPath(path)
    for (let i = 0; i < paths.length; i++) {
      if (i === paths.length - 1) {
        return obj = obj[paths[i]](...args)
      } else {
        obj = obj[paths[i]]
      }

    }
  }

  /**
   * [keys description]返回obj的自身可枚举属性名组成的数组
   * @param  {[type]} object [description]
   * @return {[type]}        [description]
   */
  function keys(object) {
    let result = []
    if (isObject(object)) {
      let hasOwn = Object.prototype.hasOwnProperty
      for (let e in object) {
        if (hasOwn.call(object, e)) {
          result.push(e)
        }
      }
    }
    if (isString(object)) {
      let len = object.length
      for (let i = 0; i < len; i++) {
        result.push(i + '')
      }
    }
    return result
  }

  /**
   * [keysIn description]返回obj的自身及继承可枚举属性名组成的数组
   * @param  {[type]} object [description]
   * @return {[type]}        [description]
   */
  function keysIn(object) {
    let result = []
    if (isObject(object)) {
      for (let e in object) {
        result.push(e)
      }
    }
    return result
  }

  /**
   * [description]
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  mapKeys = (obj, predicate) => {
    predicate = iteratee(predicate)
    let mappedObj = {}
    for (let key in obj) {
      mappedObj[predicate(obj[key], key, obj)] = obj[key]
    }
    return mappedObj
  }

  /**
   * [description]
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  mapValues = (obj, predicate) => {
    predicate = iteratee(predicate)
    let mappedObj = {}
    for (let key in obj) {
      mappedObj[key] = predicate(obj[key], key, obj)
    }
    return mappedObj
  }

  /**
   * [description]合并obj和sources的属性值
   * @param  {[type]}    obj     [description]
   * @param  {...[type]} sources [description]
   * @return {[type]}            [description]
   */
  merge = (obj, sources) => {
    for (let key in sources) {
      // src = sources[src]
      obj[key].push(...sources[key])

    }
    return obj
  }

  /**
   * [description]
   * @param  {[type]}    obj     [description]
   * @param  {...[type]} sources [description]
   * @return {[type]}            [description]
   */
  mergeWith = (obj, ...sources) => {
    let customizer = sources.pop()
    for (let src of sources) {
      for (let key in src) {
        obj[key] = customizer(obj[key], src[key])
      }
    }
    return obj
  }

  /**
   * [description] 去除paths中的属性
   * @param  {[type]} obj   [description]
   * @param  {[type]} paths [description]
   * @return {[type]}       [description]
   */
  omit = (obj, paths) => {
    for (let key of paths) {
      delete obj[key]
    }
    return obj
  }

  /**
   * [description]
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  omitBy = (obj, predicate) => {
    predicate = iteratee(predicate)
    for (let key in obj) {
      if(predicate(obj[key])) {
        delete obj[key]
      }
    }
    return obj
  }

  /**
   * [description]
   * @param  {[type]}    obj   [description]
   * @param  {...[type]} paths [description]
   * @return {[type]}          [description]
   */
  pick = (obj, paths) => {
    let newObj = {}
    for (let key of paths) {
      newObj[key] = obj[key]
    }
    return newObj
  }

  /**
   * [description]
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  pickBy = (obj, predicate) => {
    predicate = iteratee(predicate)
    let newObj = {}
    for (let key in obj) {
      if (predicate(obj[key])) {
        newObj[key] = obj[key]
      }
    }
    return newObj
  }

  /**
   * [description]
   * @param  {[type]} obj          [description]
   * @param  {[type]} path         [description]
   * @param  {[type]} defaultValue [description]
   * @return {[type]}              [description]
   */
  result = (obj, path, defaultValue) => {
    let paths = toPath(path)
    for (let val of paths) {
      obj = obj[val]
    }
    if (!obj) {
      return defaultValue
    } else {
      return obj
    }
  }

  /**
   * [description]
   * @param  {[type]} obj   [description]
   * @param  {[type]} path  [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  set = (obj, path, value) => {
    let paths = toPath(path)
    let objV = obj
    for (let i = 0; i < paths.length; i++) {
      if (i === paths.length - 1) {
        objV[paths[i]] = value
      } else {
        objV = objV[paths[i]]
      }
    }
    return obj
  }

  setWith = (obj, path, value, customizer) => {

  }

  /**
   * [description]
   * @param  {[type]} obj       [description]
   * @param  {[type]} predicate [description]
   * @param  {[type]} accu      [description]
   * @return {[type]}           [description]
   */
  transform = (obj, predicate, accu) => {
    predicate = iteratee(predicate)
    for (let key in obj) {
      //此处需要显性的返回false 只能用 ===
      if (predicate(accu, obj[key], key, obj) === false) {
        return accu
      }
      // predicate(accu, obj[key], key, obj)
    }
    return accu
  }

  unset = (obj, path) => {
    let paths = toPath(path)
    let objV = obj
    for (let i = 0; i < paths.length; i++) {
      if (i === paths.length - 1) {
        return delete objV[paths[i]]
      } else {
        objV = objV[paths[i]]
      }
    }
  }

  update = (obj, path, undater) => {
    let paths = toPath(path)
    let objV = obj
    for (let i = 0; i < paths.length; i++) {
      if (i === paths.length - 1) {
        objV[[paths[i]]] = undater(objV[paths[i]])
      } else {
        objV = objV[paths[i]]
      }
    }
    return obj
  }

  updataWith = (obj, path, updater, customizer) => {

  }

  function values(object) {
    let result = []
    if (isObject(object)) {
      let hasOwn = Object.prototype.hasOwnProperty
      for (let e in object) {
        if (hasOwn.call(object, e)) {
          result.push(object[e])
        }
      }
    }
    if (isString(object)) {
      return object.split("")
    }
    return result
  }

  function valuesIn(object) {
    let result = []
    if (isObject(object)) {
      for (let e in object) {
        result.push(object[e])
      }
    }
    return result
  }
  /**
   * [description]
   * @param  {String} string   [description]
   * @param  {[type]} target   [description]
   * @param  {[type]} position [description]
   * @return {[type]}          [description]
   */
  endsWith = (string = "", target, position = string.length) => string[position - 1] === target


  function toLower(string = "") {
    let result = ""
    for (let s of string) {
      if (s.charCodeAt() > 64 && s.charCodeAt() < 90) {
        result += String.fromCharCode(s.charCodeAt(0) + 32)
        continue
      }
      result += s
    }
    return result
  }

  function lowerFirst(string = "") {
    let result = ""
    let flag = true
    for (let i = 0; i < string.length; i++) {
      if (string[0].charCodeAt() < 90 && flag) {
        result += String.fromCharCode(string[0].charCodeAt(0) + 32)
        flag = false
        continue
      }
      result += string[i]
    }
    return result
  }

  function capitalize(string = "") {
    let result = ""
    for (let i = 1; i < string.length; i++) {
      if (string[i].charCodeAt() <= 90) {
        result += String.fromCharCode(string[i].charCodeAt(0) + 32)
      }
    }
    return result = string[0] + result
  }

  function toPairs(object) {
    let result = []
    let hasOwn = Object.prototype.hasOwnProperty
    for (let e in object) {
      if (hasOwn.call(object, e)) {
        let arr = []
        arr.push(e, object[e])
        result.push(arr)
      }
    }
    return result
  }

  function toPairsIn(object) {
    let result = []
    for (let e in object) {
      let arr = []
      arr.push(e, object[e])
      result.push(arr)
    }
    return result
  }

  function toNumber(value) {
    if (typeof value === 'number') {
      return value
    }
    if (typeof value === 'string' && typeof + value === 'number') {
      return +value
    }
  }

  function toFinite(value) {
    if (!isNaN(value)) {
      if (value === Infinity) {
        return Number.MAX_VALUE
      }

      if (value === -Infinity) {
        return -Number.MAX_VALUE
      }

      return Number(value)
    }

  }



  camelCase = (str = "") => str.toLocaleLowerCase().replace(/\W+|_+/g, " ").trim().replace(/ \w/, it => it.toUpperCase()).replace(/\W/, "")

  escape = (string = "") => string.replace(/[&|>|<|"|']/, it => {
    if (it == '"') return "&quot;"
    if (it == "&") return "&amp;"
    if (it == "<") return "&lt;"
    if (it == ">") return "&gt;"
    if (it == "'") return "&apos;"
  })

  escapeRegExp = (string = "") => string.replace(/\^|\&|\,|\.|\*|\+|\?|\(|\)|\[|\]|\{|\}|\|/g, it => "\\" + it)

  kebabCase = (string = "") => string.replace(/([a-z])([A-Z])/, "$1 $2").toLocaleLowerCase().replace(/\W+|_+/g, " ").trim().replace(/(\w+)[^](\w+)/, "$1-$2")

  lowerCase = (string = "") => string.replace(/([a-z])([A-Z])/, "$1 $2").toLocaleLowerCase().replace(/\W+|_+/g, " ").trim().replace(/(\w+)[^](\w+)/, "$1 $2")

  pad = (string = "", length = 0, chars = " ") => {
    let charsLength = length - string.length
    let charsLeftL = charsLength / 2 | 0
    let charsRightL = Math.ceil(charsLength / 2)
    let strLeft = chars.repeat(charsLength).slice(0, charsLeftL)
    let strRight = chars.repeat(charsLength).slice(0, charsRightL)
    return strLeft + string + strRight
  }

  padEnd = (string = "", length = 0, chars = " ") => string + chars.repeat(length).slice(0, length - string.length)


  padStart = (string = "", length = 0, chars = " ") => chars.repeat(length).slice(0, length - string.length) + string

  parseInt = (string, radix = 10) => Number.parseInt(string, radix)

  repeat = (string = "", n = 1) => {
    if (n === 0) return ""
    let res = string
    for (let i = 0; i < n - 1; i++) {
      res += string
    }
    return res
  }

  replace = (string = "", pattern, replacement) => string.split(pattern).join("").concat(replacement)

  snakeCase = (string = "") => string.replace(/([a-z])([A-Z])/, "$1 $2").toLocaleLowerCase().replace(/\W+|_+/g, " ").trim().replace(/(\w+)[^](\w+)/, "$1_$2")

  split = (string = "", separator, limit) => string.split(separator, limit)

  startCase = (str = "") => str.replace(/([a-z])([A-Z])/, "$1 $2").replace(/\w/, it => it.toUpperCase()).replace(/\W+|_+/g, " ").trim().replace(/(\w+)[^](\w+)/, "$1 $2").replace(/ \w/, it => it.toUpperCase())

  startsWith = (string = "", target, position = 0) => string[position] === target

  function toUpper(string = "") {
    let res = ""
    for (let s of string) {
      if (s.charCodeAt() >= 97 && s.charCodeAt() <= 122) {
        res += String.fromCharCode(s.charCodeAt(0) - 32)
        continue
      }
      res += s
    }
    return res
  }

  function trim(string = "", chars = "\\s") {
    return string.replace(RegExp(`^[${chars}]+|[${chars}]+$`, 'gi'), "")
  }


  trimEnd = (string = "", chars = "\\s") => string.replace(RegExp(`[${chars}]+$`, "gi"), "")

  trimStart = (string = "", chars = " ") => {
    let str = string.split("")
    let flag = true
    let res = ""
    for (let n of str) {
      if (chars.includes(n) && flag) {
        continue
      }
      flag = false
      res += n
    }
    return res
  }

  function unescape(string = "") {
    return string.replace(/\&\w+;/, it => {
      if (it == "&quot;") {
        return '"'
      }
      if (it == "&amp;") {
        return "&"
      }
      if (it == "&lt;") {
        return "<"
      }
      if (it == "&gt;") {
        return ">"
      }
      if (it == "&apos;") {
        return "'"
      }
    })
  }

  upperCase = string => string.replace(/([a-z])([A-Z])/, "$1 $2").toUpperCase().replace(/\W+|_+/g, " ").trim().replace(/(\w+)[^](\w+)/, "$1 $2")

  upperFirst = string => string.replace(/\w/, it => it.toUpperCase())

  words = (string, pattern = /(\w+)/g) => string.match(pattern)

  /**
   * [description]
   * @param  {[type]} value        [description]
   * @param  {[type]} defaultValue [description]
   * @return {[type]}              [description]
   */
  defaultTo = (value, defaultValue) => {
    if (!value) {
      return defaultValue
    } else {
      return value
    }
  }

  /**
   * [range description]
   * @param  {Number} start [description]
   * @param  {[type]} end   [description]
   * @param  {Number} step  [description]
   * @return {[type]}       [description]
   */
  function range(start = 0, end, step = 1) {
    // 需要知道箭头函数并不是适合所有的情形
    // 当在对象的原型的使用箭头函数时 必须要明确this的指向
    // 不然会造成错误
    //也不要滥用箭头函数  箭头函数没有this 也没有arguments
    //如果有arguments 也是父级作用域的arguments
    let res = []
    if (arguments.length === 1) {
      start = 0
      end = arguments[0]
    }
    if (start > end) {
      let item = start
      start = end + 1
      end = item + 1
    }
    if (step === 0) {
      return Array(end - start - 1).fill(start)
    }
    if (step < 0) {
      step = -step
    }
    for (let i = start; i < end; i += step) {
      res.push(i)
    }
    return res
  }

  /**
   * [rangeRight description]
   * @param  {Number} start [description]
   * @param  {[type]} end   [description]
   * @param  {Number} step  [description]
   * @return {[type]}       [description]
   */
  function rangeRight(start = 0, end, step = 1) {
    let res = range(start, end, step)
    return res.reverse()
  }

  mixin = (obj, source, options) => {
    if (isObject(obj)) {
      for (let key in source) {
        obj[key] = source[key]
      }
    }
    if (isFunction(obj)) {
      for (let key in source) {
        obj.prototype[key] = source[key]
      }
    }
    return obj
  }

  times = (n, predicate) => {
    let res = []
    predicate = iteratee(predicate)
    for (let i = 0; i < n; i++) {
      res.push(predicate(i))
    }
    return res
  }

  /**
   * [description]
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  toPath = path => {
    if (isString(path)) {
      paths = path.split('.')
      paths = flatten(paths.map(it => {
        if (it.includes(']')) {
          return it.split('[').join("").split(']').join("").split("")
        } else {
          return it
        }
      }))
    } else {
      paths = path
    }
    return paths
  }

  (function() {
    let n = 1
    uniqueId = (prefix = '') => prefix + n++
  })()

  let cloneDeep = (function() {
  let originCloning = [] //正在克隆的对象
  let targetCloning = [] //已经克隆的对象

  return function cloneDeep(obj) {

  let idx = originCloning.indexOf(obj) //检查正在克隆的对象是否已经存在

  if (idx >= 0) {
    return targetCloning[idx]
  }

  let res = {}
  originCloning.push(obj)
  targetCloning.push(res)

  for (let key in obj) {
    let val = obj[key]

    if (typeof val === 'object') {
        res[key] = cloneDeep(val)
    } else {
        res[key] = val
    }
  }
  return res
  }
}())


  /**
   * [description]返回一个新函数被调用了n次之后再调用func
   * @param  {[type]} n    [description]
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  after = (n, func) => {
    let calledTimes = 0
    return function(...args) {
      calledTimes++
      if (calledTimes >= n) {
        return func(...args)
      }
    }
  }

  /**
   * [description] 返回一个新函数函数被调用少于n次之前调用func
   * @param  {[type]} n    [description]
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  before = (n, func) => {
    let calledTimes = 0
    return function(...args) {
      calledTimes++
      if (calledTimes < n) {
        return func(...args)
      }
    }
  }

  /**
   * [description] 接受一个函数返回一个函数创建一个函数最多只能接受一个参数
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  unary = (func) => {
    return function(...args) {
      let first = args.slice(0, 1)
      return func(...first)
    }
  }

  /**
   * [description]接受一个函数和一个数字 返沪一个函数创建一个函数接受n个参数
   * @param  {[type]} func [description]
   * @param  {[type]} n    [description]
   * @return {[type]}      [description]
   */
  ary = (func, n = func.length) => { //函数的长度等于函数函数形参固定参数的长度
    return function(...args) { //
      let initials = args.slice(0, n)
      return func(...initials)
    }
  }

  /**
   * [flip description] 接收一个函数 返回一个新的函数 调用给其传参 其将传参的倒叙传入原传入函数
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  flip = (func) => {
    return function(...args) {
      return func(...args.reverse())
    }
  }

  /**
   * [negate description]接受一个函数返回一个函数接受参数否定掉接受的函数的结果
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  function negate(predicate) {
    return function(...args) {
      return !predicate(...args)
    }
  }

  function spread(func, start = 0) { //类似于...展开运算符
    return function(array) {
      return func(...array)
    }
  }

  /**
   * [description]函数柯里化
   * @param  {[type]} func   [description]
   * @param  {[type]} artity [description]
   * @return {[type]}        [description]
   */

  curry = (func, artity = func.length) => { //函数柯里化
    return function(...args) { //传入一个函数 返回一个新的函数  再对其传参
      if (args.length >= artity) {
        return func(...args)
      } else { //当所传参数个数不够时接着返回一个储存传入参数的函数
        return curry(func.bind(null, ...args))
      }
    }
  }

  once = func => {
    let flag = false, returnVal
    return function(...args) {
      if (!flag) {
        flag = true
        returnVal = func.bind(this, ...args)
      }
      return returnVal
    }
  }



  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    fill,
    findIndex,
    findLastIndex,
    flatten,
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    intersectionBy,
    intersectionWith,
    join,
    last,
    lastIndexOf,
    nth,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,
    pullAt,
    remove,
    reverse,
    slice,
    sortedIndex,
    sortedIndexBy,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexBy,
    sortedLastIndexOf,
    sortedUniq,
    sortedUniqBy,
    tail,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    union,
    unionBy,
    unionWith,
    uniq,
    uniqBy,
    uniqWith,
    unzip,
    unzipWith,
    without,
    xor,
    xorBy,
    xorWith,
    zip,
    zipObject,
    zipObjectDeep,
    zipWith,
    countBy,
    every,
    filter,
    find,
    findLast,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    forEach,
    forEachRight,
    groupBy,
    includes,
    invokeMap,
    keyBy,
    map,
    orderBy,
    partition,
    reduce,
    reduceRight,
    reject,
    sample,
    sampleSize,
    shuffle,
    size,
    sortBy,
    defer,
    delay,
    castArray,
    conformsTo,
    eq,
    gt,
    gte,
    isBoolean,
    isObject,
    isEqual,
    isEqualWith,
    isEmpty,
    lt,
    lte,
    toArray,
    add,
    ceil,
    divide,
    floor,
    max,
    maxBy,
    mean,
    meanBy,
    min,
    minBy,
    multiply,
    round,
    subtract,
    sum,
    sumBy,
    clamp,
    inRange,
    random,
    assignIn,
    at,
    defaults,
    defaultsDeep,
    findKey,
    findLastKey,
    forIn,
    forInRight,
    forOwn,
    forOwnRight,
    functions,
    functionsIn,
    get,
    has,
    hasIn,
    invert,
    invertBy,
    invoke,
    keys,
    keysIn,
    mapKeys,
    mapValues,
    merge,
    mergeWith,
    omit,
    omitBy,
    pick,
    pickBy,
    result,
    set,
    setWith,
    transform,
    unset,
    update,
    updataWith,
    values,
    valuesIn,
    some,
    isArray,
    isFunction,
    isNull,
    isNumber,
    isString,
    isArguments,
    isArrayBuffer,
    isArrayLike,
    isArrayLikeObject,
    isDate,
    isElement,
    isError,
    isFinite,
    isInteger,
    isLength,
    isMap,
    isMatch,
    isMatchWith,
    isNaN,
    isNil,
    isNull,
    isNative,
    isObjectLike,
    isPlainObject,
    isRegExp,
    isSafeInteger,
    isSet,
    isSymbol,
    isTypedArray,
    isUndefined,
    isWeakMap,
    isWeakSet,
    toInteger,
    toLength,
    toSafeInteger,
    endsWith,
    identity,
    toLower,
    lowerFirst,
    capitalize,
    forOwn,
    assign,
    toPairs,
    toPairsIn,
    toNumber,
    toFinite,
    camelCase,
    escape,
    escapeRegExp,
    kebabCase,
    lowerCase,
    pad,
    padEnd,
    padStart,
    parseInt,
    repeat,
    replace,
    snakeCase,
    split,
    startCase,
    startsWith,
    toUpper,
    trim,
    trimEnd,
    trimStart,
    unescape,
    upperCase,
    upperFirst,
    words,
    defaultTo,
    range,
    rangeRight,
    mixin,
    times,
    toPath,
    uniqueId,
    cloneDeep,
    after,
    before,
    unary,
    ary,
    flip,
    negate,
    spread,
    curry,
    once,
    property,
    matches,
    iteratee,
    matchesProperty,
  }

}()
