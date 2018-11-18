const util = require('../../utils/util.js');
// 写评论
const api = require('../../utils/api.js');
const app = getApp();

/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        item: null // 简化的定义方式
    },
    data: {
     
    },
    ready(){

    },
    methods: {
        hidePage(){
            this.triggerEvent('hidePage');
        },
        showInvitationInfo(){
            this.triggerEvent('showInvitationInfo');
        },
        showMusicChoose(){
            this.triggerEvent('showMusicChoose');
        },
        copyTpl(){
            wx.showToast({
                title: '已为您备份一份',
                icon: 'none',
                duration: 2000
            });
        },
        deleteTpl(){
            wx.showModal({
                title: '提示',
                content: '确认要删除吗？',
                success (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    }

});