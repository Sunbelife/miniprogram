const app = getApp();
const util = require('../../utils/util.js');

Page({
    data: {
        tpl: new Array(10).fill({
            id: 12
        })
    },

    onLoad: function () {
        console.log(this.data.tpl);
    },
    goPage: util.goPage,

    loadMore(){

    }
});
