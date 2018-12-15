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
        const index = util.data(e,"index");
        try {
            wx.setStorageSync('tplInfo', this.data.tpl[index])
        } catch (e) {
        }

        util.goPage(e);
    },

    loadMore(){

    }
});
