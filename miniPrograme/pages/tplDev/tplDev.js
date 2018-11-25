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

  }, init(){


    try {
      var tplInfo = wx.getStorageSync('tplInfo');
      console.log(JSON.stringify(tplInfo));
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
    }


  },
});
