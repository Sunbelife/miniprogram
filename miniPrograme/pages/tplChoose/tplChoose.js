const app = getApp();
const util = require('../../utils/util.js');
const tplConfig = require('../../utils/tplConfig.js');

Page({
    data: {
        tpl: tplConfig.tpls
    },

    onLoad: function () {
        console.log(this.data.tpl);
        
    },
    goPage(e){
        // 新建就移除上一次存储的，也可以不移除
        try {
            wx.removeStorageSync('invitationInfo')
        } catch (e) {
            // Do something when catch error
        }
        
        util.goPage(e);
    },

    loadMore(){

    }
});
