const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
};

// data key
function data(obj, key) {
  return obj.currentTarget.dataset[key];
}

// arrToObj
function arrToObj(arr, key) {
  if (!key) {
    console.error('你的key呢');
  }
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i][key]] = arr[i];
  }
  return obj;
}
function isDev() {
  return !getApp().isPublish;
}

// objToArr
function objToArr(obj) {
  const arr = [];
  for (let k in obj) {
    arr.push(obj[k]);
  }
  return arr;
}

// 通过字面量方式实现的函数each
function each(object, callback) {
  var type = (function () {
    switch (object.constructor) {
      case Object:
        return 'Object';
        break;
      case Array:
        return 'Array';
        break;
      case NodeList:
        return 'NodeList';
        break;
      default:
        return 'null';
        break;
    }
  })();
  // 为数组或类数组时, 返回: index, value
  if (type === 'Array' || type === 'NodeList') {
    // 由于存在类数组NodeList, 所以不能直接调用every方法
    [].every.call(object, function (v, i) {
      return callback.call(v, i, v) === false ? false : true;
    });
  }
  // 为对象格式时,返回:key, value
  else if (type === 'Object') {
    for (var i in object) {
      if (callback.call(object[i], i, object[i]) === false) {
        break;
      }
    }
  }
}

const rpx2px = rpx => {
  return  rpx / 750 * wx.getSystemInfoSync().windowWidth;
};

function getCurDate(){
  
  return dateFormat(new Date(), 'yyyy-MM-dd');
}

var dateFormat = function(date,fmt) {
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
};


module.exports = {
  getCurDate,
  dateFormat,
  rpx2px,
  isDev,
  arrToObj,
  objToArr,
  each,
  data,
  formatTime: formatTime
};
