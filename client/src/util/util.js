function isLocal() {
    return location.host.indexOf('127.0.0.1') !== -1
        || location.host.indexOf('localhost') !== -1
        || location.host.indexOf('192.168.1') !== -1;
}

var extend = (function () {
    var isObjFunc = function (name) {
        var toString = Object.prototype.toString
        return function () {
            return toString.call(arguments[0]) === '[object ' + name + ']'
        }
    }
    var isObject = isObjFunc('Object'), isArray = isObjFunc('Array'), isBoolean = isObjFunc('Boolean')
    return function extend() {
        var index = 0, isDeep = false, obj, copy, destination, source, i
        if (isBoolean(arguments[0])) {
            index = 1
            isDeep = arguments[0]
        }
        for (i = arguments.length - 1; i > index; i--) {
            destination = arguments[i - 1]
            source = arguments[i]
            if (isObject(source) || isArray(source)) {
                console.log(source)
                for (var property in source) {
                    obj = source[property]
                    if (isDeep && (isObject(obj) || isArray(obj))) {
                        copy = isObject(obj) ? {} : []
                        var extended = extend(isDeep, copy, obj)
                        destination[property] = extended
                    } else {
                        destination[property] = source[property]
                    }
                }
            } else {
                destination = source
            }
        }
        return destination
    }
})();

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


function arrToObj(arr, key) {
    const retOb = {};
    each(arr, function (index, item) {
        const newItem = {};
        extend(true, newItem, item);
        retOb[item[key]] = newItem;
    });
    return retOb;
}
const dateFormat = (dateStr, fmt) => {
    let date = dateStr;

    if (dateStr instanceof Date) {
    } else {
        date = new Date(dateStr);
    }

    if (isNaN(date.getDate())) {
        dateStr = dateStr.replace(/-/g, "/");
        date = new Date(dateStr);
    }


    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

};


/**
 *js中更改日期
 * y年， m月， d日， h小时， n分钟，s秒
 */
function dateAdd(date, part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case 'y':
            date.setFullYear(date.getFullYear() + value);
            break;
        case 'm':
            date.setMonth(date.getMonth() + value);
            break;
        case 'd':
            date.setDate(date.getDate() + value);
            break;
        case 'h':
            date.setHours(date.getHours() + value);
            break;
        case 'n':
            date.setMinutes(date.getMinutes() + value);
            break;
        case 's':
            date.setSeconds(date.getSeconds() + value);
            break;
        default:

    }
    return date;
}

function isNotUndefined(item) {
    return typeof(item) !== "undefined";
}



export default {
    isLocal: isLocal(),
    isNotUndefined,
    dateAdd,
    dateFormat,
    extend,
    arrToObj,
    each
}
