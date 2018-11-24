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
    goPage: util.goPage,

    loadMore(){

    }
});
