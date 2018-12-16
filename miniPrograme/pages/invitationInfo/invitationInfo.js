const app = getApp();
const util = require('../../utils/util.js');
/*
 *  TODO 红色的标点
 *
 * */
Page({
    data: {
        id: "",
        handle: ""
    },
    onLoad: function (options) {
        console.log("onload");
        if (!options.id) {
            options.id = "1";
        }
        if (!options.handle) {
            options.handle = "new";
        }
        this.setData({
            handle: options.handle,
            id: options.id
        });

    },
    submit: function (e) {
        console.log(e.detail);


        util.goPage("invitationEdit");


    }

});
