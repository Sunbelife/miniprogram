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
            let readyLength = util.tplALL.readyLength();
            if (readyLength >= 4) {
                wx.showModal({
                    title: '提示',
                    content: '最多可以保存4个模板，备份会把最早的一个删除',
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            this.copyDo();

                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                });
            } else {
               this.copyDo();
            }
        },
        copyDo(){
            /*
            *       复制请帖，
                当前编辑还是原来的那个
                就是编辑这个的时候点复制，就自动把当前状态复制了个新的
                现在状态不变
                最靠前的那个就是最后编辑的呀
            *
            * */
            try {
                let tplInfo = wx.getStorageSync('tplInfo');
                // 拷贝并且重新设置ID
                util.tplALL.addOne(tplInfo);

                wx.showToast({
                    title: '已为您备份一份',
                    icon: 'none',
                    duration: 2000
                });
            } catch (e) {
            }
        },
        goPage: util.goPage,
        deleteDoFirst(){
            let tplInfo = wx.getStorageSync('tplInfo');
            let card_id = tplInfo.card_id;
            if(card_id){
                // 存在cardID,才请求
                const loginReq = {
                    card_id: card_id,
                };

                api.tplDelete({
                    // method: "POST",
                    data: loginReq,
                    success: (resLogin) => {
                       this.deleteDo();
                    }
                });
            }else{
                this.deleteDo();
            }


        },
        deleteDo(){
            let tplInfo = wx.getStorageSync('tplInfo');
            util.tplALL.deleteOne(tplInfo);
            that.goPage('home')
        },
        deleteTpl(){
            const that = this;
            wx.showModal({
                title: '提示',
                content: '确认要删除吗？',
                success (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        that.deleteDoFirst();

                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    }

});