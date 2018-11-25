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
        toGuestsHas: null, // 简化的定义方式
        barrageHas: null, // 简化的定义方式
        bgMusic: null, // 简化的定义方式
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
        switchChange(e){
            console.log('switch1 发生 change 事件，携带值为', e.detail.value)

            try {
                wx.setStorageSync('barrageHas', e.detail.value)
            } catch (e) { }
        },
        switchChangeToGuestsHas(e){
            console.log('switch1 发生 change 事件，携带值为', e.detail.value)

            try {
                wx.setStorageSync('toGuestsHas', e.detail.value)
            } catch (e) { }
            this.triggerEvent('toGuestsHasChange');
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