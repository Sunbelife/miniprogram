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
    goPage(e) {
        const index = util.data(e, "index");
        try {
            let tpl = this.data.tpl[index];
            wx.setStorageSync('tplInfo', tpl);

            util.tplALL.addOne(tpl, (tpl) => {

                wx.setStorageSync('tplInfo', tpl);
                util.goPage(e);
            })


        } catch (e) {
        }

    },

    loadMore() {

    }
});
