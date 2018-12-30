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
        tplConfig.tpls[0].pages = tplConfig.tpls[0].pages.concat(tplConfig.tpls[0].toGuestsPage);
        tplConfig.tpls[0].toGuestsHas = true;
        this.setData({
            isReady: true,
            tplInfo: tplConfig.tpls[0]
        });

        console.log( tplConfig.tpls[0]);

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
