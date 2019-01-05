const util = require('../../utils/util.js');
const tplConfig = require('../../utils/tplConfig.js');
const app = getApp();

Page({
    data: {
        isReady: false,
        tplInfo: {}
    },

    onLoad: function () {
        this.init();

    },
    init() {

        let devPageIndex = getApp().globalData.devTpl - 1;


        tplConfig.tpls[devPageIndex].pages = tplConfig.tpls[devPageIndex].pages.concat(tplConfig.tpls[devPageIndex].toGuestsPage);
        tplConfig.tpls[devPageIndex].toGuestsHas = true;
        this.setData({
            isReady: true,
            tplInfo: tplConfig.tpls[devPageIndex]
        });

        console.log( tplConfig.tpls[devPageIndex]);

        /*try {
            var tplInfo = wx.getStorageSync('tplInfo');
            // console.log(JSON.stringify(tplInfo));
            if (tplInfo) {
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
        }*/


    },
});
