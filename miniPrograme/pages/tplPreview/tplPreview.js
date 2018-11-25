const app = getApp();
const util = require('../../utils/util.js');
const tplConfig = require('../../utils/tplConfig.js');
Page({
    data: {
        tplInfo: {},
        isReady: false
    },

    onLoad: function () {
        try {
            var tplInfo = wx.getStorageSync('tplInfo');
            console.log(JSON.stringify(tplInfo));
            if (tplInfo) {
                // Do something with return value
                this.setData({
                    isReady: true,
                    tplInfo: tplInfo
                });
            }else{
                if(util.isDev()){
                    this.setData({
                        isReady: true,
                        tplInfo: tplConfig.mockTpl
                    });
                }
            }
        } catch (e) {
            // Do something when catch error
        }
    }
});
