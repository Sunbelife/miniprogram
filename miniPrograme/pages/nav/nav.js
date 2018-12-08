const app = getApp();
const util = require('../../utils/util.js');

Page({
    data: {
        mapPage: [
            {
                page: "模板设置",
                isOk: false,
                path: "pages/tplSetting/tplSetting"
            },
            {
                page: "新增页面",
                isOk: false,
                path: "pages/tplNewPage/tplNewPage"
            },
            {
                page: "音乐选择",
                isOk: false,
                path: "pages/tplMusicChoose/tplMusicChoose"
            },
            {
                page: "图片裁剪",
                isOk: false,
                path: "pages/tplImageCut/tplImageCut"
            },
            {
                page: "模板选择",
                isOk: false,
                path: "pages/tplChoose/tplChoose"
            },
            {
                page: "请帖发送",
                isOk: false,
                path: "pages/invitationSend/invitationSend"
            },
            {
                page: "请帖编辑",
                isOk: false,
                path: "pages/invitationEdit/invitationEdit"
            },
            {
                page: "宾客回复",
                isOk: false,
                path: "pages/guestReply/guestReply"
            },
            {
                page: "赴宴信息填写",
                isOk: false,
                path: "pages/banquetInfoFill/banquetInfoFill"
            },
            {
                page: "请帖信息",
                isOk: false,
                path: "pages/invitationInfo/invitationInfo"
            },
            {
                page: "模板预览",
                isOk: false,
                path: "pages/tplPreview/tplPreview"
            },
            {
                page: "首页",
                isOk: false,
                path: "pages/home/home"
            },
            {
                page: "开始制作",
                isOk: false,
                path: "pages/startMake/startMake"
            },
            {
                page: "分享发送成功",
                isOk: false,
                path: "pages/shareSuccess/shareSuccess"
            }
        ]
    },

    onLoad: function () {
        // util.echoPage();
    }
});
