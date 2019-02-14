var kangjia96 = function(){

  function chunk(ary, size = 1) {
    let sum = [];
    for (let i = 0; i < ary.length; i += size) {
      sum.push(ary.slice(i, i + size))
    }
    return sum 
  }

  function compact(ary) {
    let result = []
    for (let n of ary) {
      if (n) {
        result.push(n)
      }
    }
    return result
  }

  function concat(array,...values) {
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

  function difference (array, ...values) {
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
  }

  function drop(array, n = 1) {
    if (n >= array.length) { // 舍弃的长度大于数组长度 返回空数组
      return []
    }
    for (let i = 0; i < n; i++) {
      array.shift()
    }
    return array 
  }


  function dropRight(array, n = 1) {
    if (n >= array.length) {
      return []
    }
    for (let i = 0; i < n; i++) {
      array.pop()
    }
    return array
  }

  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
        array[i] = value
    } 
    return array
  }

  function flatten(array) {
    let result = []
    for(let n of array) {
      if(!Array.isArray(n)) {
        result.push(n)
      } else {
        for (let s of n) {
          result.push(s)
        }
      }
    }
    return result
  }

  let flatten = array => [].concat(...array)

  function flattenDeep(array) {
    array.reduce((result, item) => {
      if(Array.isArray(item)) {
        result.push(...flattenDeep(item))
      } else {
        result.push(item)
      }
      return result
    },[])
  }



  // function flattenDeep(array) {
  //   let result = []
  //   for (let item of array) {
  //     if(Array.isArray(item)) {
  //       result.push(...flattenDeep(item))
  //     } else {
  //       result.push(item)
  //     }
  //   }
  //   return result 
  // }
  // 
    
    function flattenDepth(ary, depth = 1) {
      while (depth--) {

      }
    }

  function head(array) {
    if (array.length === 0) return undefined
    return array[0]
  }

  function indexOf(array, value, fromIndex = 0) {
    if (fromIndex >= array.length) return -1
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
  }

  function initial(array) {
    array.pop()
    return array
  }

  function intersection(...array) {
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
  }

  function join(array, separator = ",") {
    let result = ""
    for (let i = 0; i < array.length - 1; i++) {
      separator += ""
      result += array[i] + separator
    }
    return result + array[array.length - 1]
  }

  // function last(array) {
  //   return array[array.length - 1]
  // }
  last = array => array[array.length - 1]
 
  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    if(fromIndex < 0) return -1
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
  }

  function nth(array, n = 0) {
    if (n >= 0) {
      return array[n] 
    } else {
      return array[array.length + n]
    }
  }

  function pull (array, ...values) {
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

  function pullAll (array, values) {
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

  function pullAt(array, indexes) {
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

  // function remove(array, action) {
    
  // }
  
  function reverse(array) {
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

  function slice(array, start = 0, end = array.length) {
    let res = [] 
    for (let i = start; i < end; i++) {
      res.push(array[i])
    }
    return res
  }

  function sortedIndex(array,value) {
    array.push(value)
    array.sort((a,b) => a - b)
    return array.indexOf(value)
  }

  function sortedIndexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
  }

  function sortedLastIndex(array, value) {
    array.push(value)
    array.sort((a,b) => a - b)
    for(let i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
  }

  function sortedLastIndexOf(array, value) {
    for(let i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
  }

  function sortedUniq(array) {
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

  function sortedUniqBy(array, action) {
    let map = {}
    let arr = []
    for (let s of array) {
      let n = action(s)
      if (!map[n]) {
        map[n] = 1
        arr.push(s)
      }
    }
    return arr
  }

  function tail(array) {
    array.shift()
    return array
  }

  function take(array, n = 1) {
    if (n === 0) return []
    if (n > array.length) return array
    let len = array.length - n
    for (let i = 0; i < len; i++) {
      array.pop()
    }
    return array
  }

  function takeRight(array, n = 1) {
    if (n === 0) return []
    if (n > array.length) return array
    let len = array.length - n
    for (let i = 0; i < len; i++) {
      array.shift()
    }
    return array
  }

  function union(...arrays) {
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

  function uniq(array) {
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

  function unzip(array) {
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

  // function unzipWith(array, action) {
  //   let arr = []
  //   for (let i = 0; i < array[0].length; i++) {
  //     for (let n of array) {

  //     }
  //   }
  // }

  function without (array, ...values) {
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
  }

  function xor (...arrays) {
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

  function zip(...arrays) {
    let res = []
    for (let i = 0; i < arguments[0].length; i++) {
    let arr = []
      for (let n of arrays) {
        arr.push(n[i])
      }
      res.push(arr)
    }
    return res
  }

  function zipObject(props = [], values = []) {
    let map = {}
    for (let i = 0; i < props.length; i++) {
        map[props[i]] = values[i]
    }
    return map
  }

  function forEach(collection, action) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        action(collection[i], i, collection)
      }
    } else {
      for (let e in collection) {
        action(map[e], e, collection)
      }
    }
    retrun collection
  }

  function forEachRight(collection, action) {
    if (Array.isArray(collection)) {
      for (let i = collection.length - 1; i >= 0; i--) {
        action(collection[i])
      }
    } else {
      let arr = []
      for (let e in collection) {
        let value = map[e]
        let key = e
        arr.unshift(value,key)
      }
      for (let i = 0; i <= arr.length; i = i + 2) {
        action(arr[i] ,arr[i + 1])
      }
    }
  }

  function groupBy(ary, predicate) {
    let result = {}
    for (let i = 0; i < ary.length; i++) {
      if (predicate(ary[i], i, ary)) {
        let key = predicate(ary, i, ary)
        if (key in result) {
          result[key].push(ary[i])
        } else {
          result[key] = ary[i]
        }
      }
    }
  }


  function includes(collection, value, fromIndex = 0) {
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
      for (let i = fromIndex; i < collection.length; i++)  {
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

  function size(collection) {
    if (!Array.isArray(collection) && typeof collection === 'object') {
      let count = 0
      for (let e in collection) {
        count++
      }
      return count
    }
    return collection.length
  }

  // function every(array, Boolean) {

  // }
   
  // filter: function filter(collection, test) {
  //   let passed = []
  //   for (let e of collection) {
  //     if (test(e)) {
  //       passed.push(e.user)
  //     }
  //   }
  //   return passed
  // }

//   function isObject(n) {
//   if (typeof n !== 'object') {
//     return false
//   } 
//   if (Array.isArray(n)) {
//     return false
//   }

//   if (val === null) {
//     return false
//   }
//   return true
// }


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

    // if (Array.isArray(a) && isObject(b)) {
    //   return false
    // }

    // if (Array.isArray(b) && isObject(a)) {
    //   return false
    // }

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

  function gt(value, other) {
    return value > other
  }

  function gte(value, other) {
    return value >= other
  }

  function isBoolean(value) {
    return value + "" === 'false' || value + "" === 'true' ? true : false
  }


  function isObject(n) {
    if (typeof n !== 'object') {
      return false
    } 
    if (Array.isArray(n)) {
      return false
    }

    if (val === null) {
      return false
    }
    return true
  }


  function isEqual(a, b) {
    if (a === b) {
      return true
    }

    if (a !== a && b !== b) {
      return true
    }

    if (typeof a !== typeof b) {
      return false
    }

    if (Array.isArray(a) && isObject(b)) {
      return false
    }

    if (Array.isArray(b) && isObject(a)) {
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

  function isEmpty(value) {
    if(value === null) {
      return true
    } 
    if (typeof value === 'object') {
      return false
    }
    return true
  }

  function lt(value, other) {
    return value < other
  }

  function ite(value, other) {
    return value <= other
  }

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

  // function toFinite(value) {

  // }

  // function add(augend, addend) {
  //   return augend + addend
  // }

  let add = (augend, addend) => augend + addend

  function divide(dividend, divisor) {
    return divide / divisor
  }

  let divide(dividend)

  function max(array) {
    if (array.length === 0) return undefined
    let max = -Infinity
    for (let n of array) {
      if (n > max) {
        max = n
      }
    }
    return max
  }

  function mean(array) {
    return sum(array) / array.length
  }

  function min(array) {
    if (array.length === 0) return undefined
    let min = Infinity
    for (let n of array) {
      if (n < min) {
        min = n
      }
    }
    return min
  }

  function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  function sum(array) {
    let sum = 0
    for (let n of array) {
      sum += n
    }
    return sum
  }

  function mapValues(obj, mapper) {
    let res = {}
    for (let key in obj) {
      let val = obj[key]
      res[key] = mapper(val)
    }
    return res
  }

  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    drop: drop,
    dropRight: dropRight,
    fill: fill,
    flatten: flatten,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAt: pullAt,
    reverse: reverse,
    slice: slice,
    sortedIndex: sortedIndex,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    union: union,
    uniq: uniq,
    unzip: unzip,
    without: without,
    xor: xor,
    zip: zip,
    zipObject: zipObject,
    forEach: forEach,
    forEachRight: forEachRight,
    includes: includes,
    size: size,
    eq: eq,
    gt: gt,
    gte: gte,
    isBoolean: isBoolean,
    isObject: isObject,
    isEqual: isEqual,
    isEmpty: isEmpty,
    lt: lt,
    lte: lte,
    toArray: toArray,
    add: add,
    divide: divide,
    max: max,
    mean: mean,
    min: min,
    multiply: multiply,
    sum: sum,
  }

}()