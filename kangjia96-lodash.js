var kangjia96 = {

  chunk: function chunk(ary, size = 1) {
    let sum = [];
    for (let i = 0; i < ary.length; i += size) {
      sum.push(ary.slice(i, i + size))
    }
    return sum 
  },

  compact: function compact(ary) {
    let result = []
    for (let n of ary) {
      if (n) {
        result.push(n)
      }
    }
    return result
  },

  concat: function concat(array,...values) {
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
  },

  difference: function difference (array, ...values) {
    let map = {} // 申请一个对象
    let result = []
    for (let a of values) {//遍历参数
      if (Array.isArray(a)) {//判断参数是否为数组
        for (let s of a) {//遍历数组 放进对象
          if (!map[s]) {
            map[s] = 1
          }
        }
      } else if (!map[s]) { //遍历参数放进对象
        map[s] = 1
      }
    }
    for (let n of array) { //数组所给数组 返回对象中没有的属性
      if (!map[n]) {
        result.push(n)
      }
    }
    return result
  },

  drop: function drop(array, n = 1) {
    if (n >= array.length) { // 舍弃的长度大于数组长度 返回空数组
      return []
    }
    for (let i = 0; i < n; i++) {
      array.shift()
    }
    return array 
  },

  dropRight: function dropRight(array, n = 1) {
    if (n >= array.length) {
      return []
    }
    for (let i = 0; i < n; i++) {
      array.pop()
    }
    return array
  },

  fill: function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
        array[i] = value
    } 
    return array
  },

  head: function head(array) {
    if (array.length === 0) return undefined
    return array[0]
  },

  indexOf: function indexOf(array, value, fromIndex = 0) {
    if (fromIndex >= array.length) return -1
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
  },

  initial: function initial(array) {
    array.pop()
    return array
  },

  intersection: function intersection(...array) {
    let map = {}
    let result = []
    for (let n of array) {
      for (let s of n) {
        if (!map[s]) {
          map[s] = 1
        } else {
          map[s]++
        }
      }
    }
    for (let e in map) {
      if (map[e] === array.length) {
        result.push(+e)
      }
    }
    return result
  },

  join: function join(array, separator = ",") {
    let result = ""
    for (let i = 0; i < array.length - 1; i++) {
      separator += ""
      result += array[i] + separator
    }
    return result + array[array.length - 1]
  },

  last: function last(array) {
    return array[array.length - 1]
  },
 
  lastIndexOf: function lastIndexOf(array, value, fromIndex = array.length - 1) {
    if(fromIndex < 0) return -1
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
  },

  nth: function nth(array, n = 0) {
    if (n >= 0) {
      return array[n] 
    } else {
      return array[array.length + n]
    }
  },

  pull: function pull (array, ...values) {
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
  },

  pullAll: function pullAll (array, values) {
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
  },

  pullAt: function pullAt (array, indexes) {
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
  },

  reverse: function reverse(array) {
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
  },

  // sortedIndex: function sortedIndex(array,value) {
  //   array.push(value)
  //   array.sort((a,b) => a - b)
  //   return array.indexOf(value)
  // },


  tail: function tail(array) {
    array.shift()
    return array
  },

  take: function take(array, n = 1) {
    if (n === 0) return []
    if (n > array.length) return array
    let len = array.length - n
    for (let i = 0; i < len; i++) {
      array.pop()
    }
    return array
  },

  takeRight: function takeRight(array, n = 1) {
    if (n === 0) return []
    if (n > array.length) return array
    let len = array.length - n
    for (let i = 0; i < len; i++) {
      array.shift()
    }
    return array
  },

  without: function without (array, ...values) {
    let map = {}
    let arr = []
    for (let n of values) {
      if (!map[n]) {
        map[n] = 1
      }
    }
    for (let s of array) {
      let a = s + ""
      if (!map[a]) {
        arr.push(s)
      }
    }
    return arr
  },

  xor: function xor (...arrays) {
    let map = {}
    let arr = []
    for (let n of arrays) {
      for (let s of n) {
        if (!map[s]) {
          map[s] = 1
        } else {
          map[s]++
        }
      }
    }
    for (let e in map) {
      if (map[e] === 1) {
        arr.push(+e)
      }
    }
    return arr
  }

}



  // return {
  //   chunk: chunk,
  //   compact: compact,
  //   concat: concat,
  //   difference: difference,
  //   drop: drop,
  //   dropRight: dropRight,
  //   head: head,
  //   indexOf: indexOf,
  //   initial: initial,
  //   intersection: intersection,
  //   join: join,
  //   last: last,
  //   lastIndexOf: lastIndexOf,
// } ()