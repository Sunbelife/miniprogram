const app = getApp();
const util = require('../../utils/util.js');

Page({
    data: {
        tpl: new Array(10).fill(0),
        pageSortWidth: 0

    },

    onLoad: function () {
        console.log(util.rpx2px(110 + 2));
        this.setData({
            pageSortWidth: util.rpx2px(180 + 20 + 2) * this.data.tpl.length + 'px'
        });
    }
});
