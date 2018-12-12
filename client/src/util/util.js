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

export default {
    isLocal: isLocal(),
    extend,
    each
}
