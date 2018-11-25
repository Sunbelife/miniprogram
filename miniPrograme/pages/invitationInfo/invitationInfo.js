const app = getApp();
const util = require('../../utils/util.js');
/*
*  TODO 红色的标点
*  
* */
Page({
    data: {
    },
    onLoad: function () {


    },
    submit: function (e) {
            console.log(e.detail);

        try {
            var invitationInfo = wx.getStorageSync('invitationInfo');
            
            console.log(invitationInfo);
            if (invitationInfo) {
                // Do something with return value
            }
        } catch (e) {
            // Do something when catch error
        }
        util.goPage("invitationEdit");
        
      
    }

});
