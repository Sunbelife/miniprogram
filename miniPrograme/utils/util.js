const api = require('./api.js');

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
    if(!obj){
        return;
    }
    return obj.currentTarget.dataset[key];
}

// arrToObj
function arrToObj(arr, key) {
    if (!key) {
        console.error('你的key呢');
    }
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i][key]] = {};
        extend(true, obj[arr[i][key]], arr[i]);
    }
    return obj;
}

// arrToObj
function arrToObjKV(arr, key, value) {
    if (!key) {
        console.error('你的key呢');
    }
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i][key]] = arr[i][value];
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

//  k,v
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
    return rpx / 750 * wx.getSystemInfoSync().windowWidth;
};

function getCurDate() {

    return dateFormat(new Date(), 'yyyy-MM-dd');
}

var dateFormat = function (date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

var getParamGen = function (param) {
    let paramStr = "";
    let paramCount = 0;
    for (let k in param) {
        paramCount++;
        let pre = "?";
        if (paramCount > 1) {
            pre = "&";
        }
        paramStr += `${pre}${k}=${encodeURIComponent(param[k])}`
    }
    return paramStr;
};

var pages = {

    // 模板设置
    tplSetting: '../tplSetting/tplSetting',
    // 新增页面
    tplNewPage: '../tplNewPage/tplNewPage',
    // 音乐选择
    tplMusicChoose: '../tplMusicChoose/tplMusicChoose',
    // 图片裁剪
    tplImageCut: '../tplImageCut/tplImageCut',
    // 模板选择
    tplChoose: '../tplChoose/tplChoose',
    // 请帖发送
    invitationSend: '../invitationSend/invitationSend',
    // 请帖编辑
    invitationEdit: '../invitationEdit/invitationEdit',
    // 宾客回复
    guestReply: '../guestReply/guestReply',
    // 赴宴信息填写
    banquetInfoFill: '../banquetInfoFill/banquetInfoFill',
    // 请帖信息
    invitationInfo: '../invitationInfo/invitationInfo',
    // 模板预览
    tplPreview: '../tplPreview/tplPreview',
    // 首页
    home: '../home/home',
    // 开始制作
    startMake: '../startMake/startMake',
    // 分享发送成功
    shareSuccess: '../shareSuccess/shareSuccess',

    X: '../X/X'
};


function goPage(e,params) {
    let page = "";
    let id = "";
    let handle = "";
    if (e.currentTarget) {
        page = data(e, "page");
        id = data(e, "id");
        handle = data(e, "handle");
    } else {
        // 字符串
        page = e;
        if(params){
            id = params.id;
            handle = params.handle;
        }
    }
    console.log(page);

    let url = pages[page];
    // 参数放数组，再变成参数
    const args = [];
    // id 参数
    if (id) {
        args.push({
            key: "id",
            value: id
        });
    }
    if (handle) {
        args.push({
            key: "handle",
            value: handle
        });
    }
    if (args.length > 0) {
        url += getParamGen(arrToObjKV(args, "key", "value"));
    }


    console.log(url);
    wx.navigateTo({
        url: url
    })
}

function randomName() {
    var arr = ["香蕉", "橘子", "椰子", "桃子", "西瓜"];

    return randomArrOne(arr);
}

function randomArrOne(arr) {
    var index = Math.floor((Math.random() * arr.length));
    return arr[index];
}

/**
 * 数组元素交换位置
 * @param {array} arr 数组
 * @param {number} index1 添加项目的位置
 * @param {number} index2 删除项目的位置
 * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
 */
function swapArray(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}


function wxUpload(config) {
    wx.showLoading({
        title: '正在上传图片...'
    });

    wx.uploadFile({
        url: config.url,
        filePath: config.path,
        name: config.name,//这里根据自己的实际情况改
        formData: null,//这里是上传图片时一起上传的数据
        success: (resp) => {
            if (resp.statusCode === 200) {
                const myData = JSON.parse(resp.data);
                config.success(myData);
            }
        },
        fail: (fail) => {
            console.log("fail:" + fail);
            config.success(fail);
            toast("上传图片失败");
        },
        complete: () => {
            wx.hideLoading();
        }
    });
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
                // console.log(source)
                for (var property in source) {
                    obj = source[property]
                    if (isDeep && ( isObject(obj) || isArray(obj) )) {
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
})()

function toast(text) {
    wx.showToast({
        title: text,
        icon: 'none',
        duration: 2000
    })
}

function setTimeOutFlag(that, count, cur) {
    setTimeout(()=> {
        that.setData({
            ['animatedStep' + cur]: true
        });
        cur++;
        if (cur <= count) {
            setTimeOutFlag(that, count, cur);
        }
    }, 300)
}
function setTimeOutFlagHide(that, count) {

    each(new Array(count).fill("12312"), (k, v)=> {
        that.setData({
            ['animatedStep' + k]: false
        });
        // console.log(that.data['animatedStep' + k]);
    });


}

function echoPage() {
    let arr = [];
    let arrChild = [];
    arr = arr.concat([arrChild]);
    for (let i = 1; i <= 70; i++) {
        console.log(i);
        if (arrChild.length < 7) {
            arrChild.push(i);
        } else {
            arrChild = [];
            arr = arr.concat([arrChild]);
            arrChild.push(i);
        }
    }
    console.log(arr);
    console.log(JSON.stringify(arr));
}
function isDev() {
    return getApp().globalData.isDev;
}
function pageComponent() {
    const pageComponent = {};
    for (let i = 1; i <= 70; i++) {
        pageComponent["p" + i] = `/components/pages/p${i}/p${i}`
    }
    console.log(pageComponent);
}

function conponentRef() {
    const arr = [];
    for (let i = 1; i <= 70; i++) {
        let a = `<p${i} id="{{index}}" wx:if="{{item.id === ${i}}}"></p${i}>`;
        arr.push(a);
    }
    // console.log(JSON.stringify(arr));
}
// conponentRef();

function isNotUndefined(val) {
  return typeof val !== "undefined";
}




function posCssComplete(arr) {
    // 对象补齐
    each(arr, (k, v)=> {
        if (!v.left) {
            v.left = "auto";
        }
        if (!v.right) {
            v.right = "auto";
        }
        if (!v.top) {
            v.top = "auto";
        }
        if (!v.bottom) {
            v.bottom = "auto";
        }
    });
}



function login(callLoginSuccess) {

    let WZToken = wx.getStorageSync('WZToken');

    // 根据过期时间去掉token
    const WZTokenLostTime = wx.getStorageSync('WZTokenLostTime');
    console.log(WZTokenLostTime, "==========");
    if (WZTokenLostTime) {
        //当前时间大于过期时间
        if (new Date().getTime() >= new Date(WZTokenLostTime).getTime()) {
            console.log('当前时间大于过期时间', WZTokenLostTime);
            WZToken = '';
            wx.clearStorageSync();
        } else {
            console.log('当前时间小于过期时间');
        }
    }

    if (WZToken) {
        callLoginSuccess();
    } else {
        wx.login({
            success: (res) => {
                if (res.code) {
                    const loginReq = {
                        code: res.code
                    };

                    api.login({
                        // method: "POST",
                        data: loginReq,
                        success: (resLogin) => {
                            console.log(resLogin);
                            getUserInfo(resLogin, callLoginSuccess);
                        }
                    });


                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        });
    }


}

function getUserInfo(resLogin, callLoginSuccess) {
    console.log(resLogin);
    wx.getUserInfo({
        success: (res) => {
            console.log(res);
            wx.setStorageSync('userOpenid', resLogin.data.openid);
            const userOpenid = wx.getStorageSync('userOpenid');
            console.log(userOpenid);

            // const reqGetUserInfo = {
            //     open_id: resLogin.data.data.open_id,
            //     session_key: resLogin.data.session_key,
            //     resinfo: JSON.parse(JSON.stringify(res))
            // };
            const reqGetUserInfo = JSON.parse(JSON.stringify(res));
            reqGetUserInfo.open_id = resLogin.data.data.open_id;
            reqGetUserInfo.session_key = resLogin.data.data.session_key;
            reqGetUserInfo.iv = encodeURIComponent(reqGetUserInfo.iv);


            console.log(reqGetUserInfo);


            api.loginEncrypted({
                method: "POST",
                data: reqGetUserInfo,
                success: (resGetUserInfo) => {
                    console.log(resGetUserInfo);
                    // wx.setStorageSync('WZToken', resGetUserInfo.data.WZToken);
                    // 30分钟过期
                    // wx.setStorageSync('WZTokenLostTime', dateAdd(new Date(), 'n', 30));
                    callLoginSuccess();
                }
            });

        },
        fail: function (e) {
            console.log(e);
            wx.navigateTo({
                url: '../a_auth/a_auth'
            })
        }
    });
}




module.exports = {
    posCssComplete,
    isDev,
    login,
    echoPage,
    pageComponent,
    setTimeOutFlag,
    setTimeOutFlagHide,
    toast,
    extend,
    wxUpload,
    isNotUndefined,
    swapArray,
    randomName,
    randomArrOne,
    getParamGen,
    getCurDate,
    dateFormat,
    goPage,
    rpx2px,
    arrToObjKV,
    arrToObj,
    objToArr,
    each,
    data,
    formatTime: formatTime
};
