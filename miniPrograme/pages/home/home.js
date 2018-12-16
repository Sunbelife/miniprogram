const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
const tplConfig = require('../../utils/tplConfig.js');
/*
*
*   TODO  tpl  要维护到 4个。再新加就要删除第一个了。要给提示
*
*   */
Page({
    data: {
        activeType: 1,
        type: [
            {
                name: "单图",
                number: 1
            },
            {
                name: "双图",
                number: 2
            },
            {
                name: "多图",
                number: 3
            },
            {
                name: "纯文字",
                number: 4
            }
        ],
        tpl: [],
        // 需要顶部固定吗？
        scrollTopPage: 0,
        isNeedFixed: false,
        guestReplyTipNum: 0,
        // px
        tabOffsetTop: 90
    },

    onLoad: function () {



    },
    onShow: function () {

        util.login(() => {
            // debugger;
            console.log("登录成功啦~~");
            // this.genEwm();
            this.guestReplyTip();

            // 显示就要去请求或者看本地
            this.getInitData();


        });





    },
    genEwm: function () {

        const loginReq = {
            page: 'page/home/home',
            // 再说
            scene: "id"
            // scene:"id%3D123%26name%3D123"
        };

        api.userShareImgGet({
            // method: "POST",
            data: loginReq,
            success: (resLogin) => {
                console.log(resLogin);

            }
        });

    },
    guestReplyTip: function () {
        const userOpenid = wx.getStorageSync('userOpenid');

        const loginReq = {
            open_id: userOpenid,
            page: 'page/home/home',
            // 再说
            scene: "id"
            // scene:"id%3D123%26name%3D123"
        };

        api.guestReplyTip({
            // method: "POST",
            data: loginReq,
            success: (resLogin) => {
                console.log(resLogin);
                this.setData({
                    guestReplyTipNum: resLogin.data.data.is_read_sum
                })
            }
        });

    },
    getInitData: function (e) {
        const userOpenid = wx.getStorageSync('userOpenid');
        api.hadEditTpl({
            // method: "POST",
            data: {
                open_id: userOpenid
            },
            success: (res) => {
                console.log(res);
                // TODO 。已编辑模板接口   也要添加  storageId~！！
                // tpl

                try {
                    var tplInfo_all = wx.getStorageSync('tplInfo_all');
                    console.log(JSON.stringify(tplInfo_all));
                    if (tplInfo_all) {
                        this.setData({
                            tpl: tplInfo_all
                        });
                    }
                    console.log("模板数据", this.data.tpl);
                } catch (e) {
                    // Do something when catch error
                }

            }
        })
    },
    onGotUserInfo: function (e) {

        const that = this;
        // 存在说明授权成功
        if (e.detail.userInfo) {

            // TODO  tpl  要维护到 4个。再新加就要删除第一个了。要给提示

            if (this.data.tpl.length >= 4) {
                wx.showModal({
                    title: '提示',
                    content: '最多可以保存4个模板，新增会把最早的一个删除',
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            util.tplALL.removeFirst(() => {
                                that.goPage("tplChoose");
                            });
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                });
            } else {
                that.goPage("tplChoose");
            }


        }
    },
    invitationEdit: function (e) {
        const storageId = util.data(e, "storageId");

        // TODO 需要设置为真实的

        try {

            util.tplALL.getOne(storageId, (one) => {
                wx.setStorageSync('tplInfo', one);
                util.goPage(e);
            });

        } catch (e) {
        }

    },
    goPage: util.goPage,
    chooseType: function (e) {
        const type = util.data(e, "type");
        this.setData({
            activeType: type
        });
    },
    loadMore() {

    },
    // 页面滚动回调
    pageScroll(e) {
        const px = util.rpx2px(this.data.tabOffsetTop);
        const scrollTop = e.detail.scrollTop;
        let isNeedFixed = false;

        if (scrollTop >= px) {
            isNeedFixed = true;
        }
        this.setData({
            isNeedFixed: isNeedFixed,
        });

        console.log(px);
        //
        console.log(e);
    },
});
