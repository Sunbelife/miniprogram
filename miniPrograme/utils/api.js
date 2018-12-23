let apiUrl = getApp().globalData.domain + '/wx/api';
const apiUrlDev = getApp().globalData.domainDev + '/wx';
const url4Mp3 = getApp().globalData.domain + '/web/manage/get_music_list';


const wxRequest = (params, url) => {
    console.log(params, url);
    // wx.showLoading({
    //     title: '加载中...'
    // });

    const Token = wx.getStorageSync('Token');
    console.log('Token', Token);
    wx.request({
        url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            WZToken: Token ? Token : '',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        success(res) {
            console.log(res);
            if (params.success) {
                params.success(res);
            }
        },
        fail(res) {
            console.log(res);
            if (params.fail) {
                params.fail(res);
            }
        },
        complete(res) {
            console.log(res);
            // wx.hideLoading();
            if (params.complete) {
                params.complete(res);
            }
        }
    });

};


const urlsDev = {
    // 登录
    login: '/login',
    // 登录解密
    loginEncrypted: '/loginEncrypted',
    // 已编辑的请帖列表
    hadEditTpl: "/hadEditTpl",
    // 已编辑的请帖一个
    hadEditTplOne: "/hadEditTplOne",


    // 宾客回复提示
    guestReplyTip: "/guestReplyTip",
    // 宾客回复已读
    guestReplyRead: "/guestReplyRead",
    // 回复祝福
    replyWish: "/replyWish",
    // 赴宴信息列表
    banquetInfoList: "/banquetInfoList",


    // 模板列表
    tplList: "/tplList",
    // 模板拷贝
    tplCopy: "/tplCopy",
    // 模板删除
    tplDelete: "/tplDelete",

    // mp3列表
    mp3List: "/mp3List",

    // 模板保存
    tplSave: "/tplSave",

    // 修改图片的截取
    updateImgCut: "/updateImgCut",

    // 用户微信分享图片获取
    userShareImgGet: "/userShareImgGet",
    // 获取弹幕列表
    barrageList: "/barrageList",

    // 宾客弹幕保存
    barrageSave: "/barrageSave",
    // 宾客弹幕删除
    barrageDel: "/barrageDel",
    // 宾客弹幕回复
    barrageReply: "/barrageReply",
    // 赴宴信息填写接口
    banquetInfoFill: "/banquetInfoFill",
    // 模板获取
    tplGet: "/tplGet",
    // 全部已读
    allRead: "/allRead",


};

const urlsProd = {
    // 登录
    login: '/verify_user',
    // 登录解密
    loginEncrypted: '/get_union_id',
    // 已编辑的请帖列表
    hadEditTpl: "/get_shared_user_card",
    // 已编辑的请帖 一个
    hadEditTplOne: "/xxxxxxx",


    // 宾客回复提示
    guestReplyTip: "/get_barrage_msg_is_read",
    // 宾客回复已读
    guestReplyRead: "/guestReplyRead",
    // 回复祝福
    replyWish: "/replyWish",
    // 赴宴信息列表
    banquetInfoList: "/get_attend_info",


    // 模板列表
    tplList: "/xxxxxxx",
    // 模板拷贝
    tplCopy: "/xxxxxxx",
    // 模板删除
    tplDelete: "/del_user_card",

    // mp3列表
    mp3List: "/web/manage/get_music_list",

    // 模板保存
    tplSave: "/save_user_card",

    // 模板获取
    tplGet: "/get_user_card",

    // 修改图片的截取
    updateImgCut: "/upload_pic",

    // 用户微信分享图片获取
    userShareImgGet: "/gen_user_card_qr",
    // 获取弹幕列表
    barrageList: "/get_barrage_msg",

    // 宾客弹幕保存
    barrageSave: "/send_barrage_msg",
    // 宾客弹幕删除
    barrageDel: "/del_barrage_msg",
    // 宾客弹幕回复
    barrageReply: "/reply_barrage_msg",

    // 赴宴信息填写接口
    banquetInfoFill: "/send_attend_info",

    // 全部已读
    allRead: "/set_barrage_msg_is_read",
};

let urls = urlsProd;
// 开发环境
if (getApp().globalData.isDev) {
    urls = urlsDev;
    apiUrl = apiUrlDev;
}

// 登录
const login = (params) => {
    wxRequest(params, `${apiUrl}${urls.login}`);
};

// 登录解密
const loginEncrypted = (params) => {
    wxRequest(params, `${apiUrl}${urls.loginEncrypted}`);
};

// 已编辑的请帖列表
const hadEditTpl = (params) => {
    wxRequest(params, `${apiUrl}${urls.hadEditTpl}`);
};

// 已编辑的请帖列表
const hadEditTplOne = (params) => {
    wxRequest(params, `${apiUrl}${urls.hadEditTplOne}`);
};

// 宾客回复提示
const guestReplyTip = (params) => {
    wxRequest(params, `${apiUrl}${urls.guestReplyTip}`);
};

// 全部已读
const allRead = (params) => {
    wxRequest(params, `${apiUrl}${urls.allRead}`);
};

// 模板列表
const tplList = (params) => {
    wxRequest(params, `${apiUrl}${urls.tplList}`);
};

// 模板拷贝
const tplCopy = (params) => {
    wxRequest(params, `${apiUrl}${urls.tplCopy}`);
};

// 模板删除
const tplDelete = (params) => {
    wxRequest(params, `${apiUrl}${urls.tplDelete}`);
};

// mp3列表
const mp3List = (params) => {
    // wxRequest(params, `${apiUrl}${urls.mp3List}`);
    wxRequest(params, `${url4Mp3}`);
};

// 模板保存
const tplSave = (params) => {
    wxRequest(params, `${apiUrl}${urls.tplSave}`);
};

// 修改图片的截取
const updateImgCut = (params) => {
    wxRequest(params, `${apiUrl}${urls.updateImgCut}`);
};

// 用户微信分享图片获取
const userShareImgGet = (params) => {
    wxRequest(params, `${apiUrl}${urls.userShareImgGet}`);
};

// 获取弹幕列表
const barrageList = (params) => {
    wxRequest(params, `${apiUrl}${urls.barrageList}`);
};

// 宾客弹幕保存
const barrageSave = (params) => {
    wxRequest(params, `${apiUrl}${urls.barrageSave}`);
};
// 宾客弹幕保存
const barrageDel = (params) => {
    wxRequest(params, `${apiUrl}${urls.barrageDel}`);
};
// 宾客弹幕保存
const barrageReply = (params) => {
    wxRequest(params, `${apiUrl}${urls.barrageReply}`);
};

// 赴宴信息填写接口
const banquetInfoFill = (params) => {
    wxRequest(params, `${apiUrl}${urls.banquetInfoFill}`);
};


// 赴宴信息填写接口
const banquetInfoList = (params) => {
    wxRequest(params, `${apiUrl}${urls.banquetInfoList}`);
};

// 赴宴信息填写接口
const guestReplyRead = (params) => {
    wxRequest(params, `${apiUrl}${urls.guestReplyRead}`);
};

// 赴宴信息填写接口
const replyWish = (params) => {
    wxRequest(params, `${apiUrl}${urls.replyWish}`);
};

// 模板获取
const tplGet = (params) => {
    wxRequest(params, `${apiUrl}${urls.tplGet}`);
};


function getUrl(name) {
    return `${apiUrl}${urls[name]}`
}


module.exports = {
    login,
    urls,
    apiUrl,
    guestReplyRead,
    tplGet,
    allRead,
    replyWish,
    loginEncrypted,
    banquetInfoList,
    hadEditTpl,
    hadEditTplOne,
    guestReplyTip,
    tplList,
    tplCopy,
    tplDelete,
    mp3List,
    tplSave,
    updateImgCut,
    userShareImgGet,
    barrageList,
    barrageSave,
    barrageDel,
    barrageReply,
    banquetInfoFill,
};
