const app = getApp();
const util = require('../../utils/util.js');
const tplConfig = require('../../utils/tplConfig.js');
Page({
    data: {
        tplInfo: {},
        isReady: false
    },
    send() {
        this.goPage("invitationSend");
    },
    goPage: util.goPage,
    onLoad: function () {
        try {
            var tplInfo = wx.getStorageSync('tplInfo');
            // console.log(JSON.stringify(tplInfo));
            if (tplInfo) {
                util.tplALL.fixToGuestsHas(tplInfo);

                // Do something with return value
                this.setData({
                    isReady: true,
                    tplInfo: tplInfo
                });
            } else {
                if (util.isDev()) {
                    this.setData({
                        isReady: true,
                        tplInfo: tplConfig.mockTpl
                    });
                }
            }
        } catch (e) {
            // Do something when catch error
        }
    },
    onHide(){
        // console.log("hide");
        this.selectComponent("#tpl1").playStop();

    },
    onUnload(){
        // 返回
        // console.log("onUnload");
        this.selectComponent("#tpl1").playStop();

    },
})
;
