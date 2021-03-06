const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Page({
    data: {
        activeType: 1,
        banquetInfo: [],
        blessing: [],
        type: [
            {
                name: "宾客祝福(0)",
                number: 1
            },
            {
                name: "赴宴(0)",
                number: 2
            }
        ],
        objectArray: [
            {
                id: 1,
                name: '自驾'
            },
            {
                id: 2,
                name: '公交'
            },
            {
                id: 3,
                name: '打车'
            },
            {
                id: 4,
                name: '步行'
            },
            {
                id: 5,
                name: '其他'
            }
        ],
        isShowReplayWish: false,
        blessingNeedReply: {},
        objectArrayObj: {}
    },

    onLoad: function () {

        this.setData({
            objectArrayObj: util.arrToObj(this.data.objectArray, 'id')
        });


        this.allRead();
        this.getBlessing();
        this.getBanquetInfoList();

    },
    chooseType: function (e) {
        const type = util.data(e, "type");
        this.setData({
            activeType: type
        });
    },
    deleteMsg: function (id,is_reply) {
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success(res) {
                if (res.confirm) {
                    // console.log('用户点击确定');

                    that.deleteMsgDo(id,is_reply);
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        });
    },
    deleteMsgDo: function (id,is_reply) {

        const loginReq = {
            msg_id: id,
            is_reply: is_reply,
        };

        api.barrageDel({
            // method: "POST",
            data: loginReq,
            success: (res) => {
                let data = res.data;
                // console.log(data);
                if (data.code === 200) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'none',
                        duration: 2000
                    });
                    this.getBlessing();

                } else {
                    wx.showToast({
                        title: '删除失败',
                        icon: 'none',
                        duration: 2000
                    });
                }

            }
        });
    },
    // 回复祝福提交
    replayWishSubmit() {
        this.setData({
            isShowReplayWish: false,
        });
        this.getBlessing();
    },
    handleBlessing: function (e) {
        const id = util.data(e, "id");
        const index = util.data(e, "index");
        const is_reply = util.data(e, "is_reply");
        let that = this;

        let itemListHandle = ['回复', '删除'];

        if (is_reply) {
            itemListHandle = ['删除'];
        }

        // 下一个是回复的也不能再回复了
        let nextBlessing = this.data.blessing[index+1];
        if(nextBlessing){
            if(nextBlessing.name.startsWith("回复 @")){
                itemListHandle = ['删除'];
            }
        }


        wx.showActionSheet({
            itemList: itemListHandle,
            success(res) {
                let handleIndex = res.tapIndex;

                if (itemListHandle[handleIndex] === '回复') {
                    // console.log("回复");

                    let blessingNeedReply = {};
                    util.extend(true, blessingNeedReply, that.data.blessing[index]);

                    that.setData({
                        isShowReplayWish: true,
                        blessingNeedReply: blessingNeedReply
                    });
                }
                if (itemListHandle[handleIndex] === '删除') {
                    that.deleteMsg(id,is_reply);
                }

            },
            fail(res) {
                // console.log(res.errMsg)
            }
        })


    },
    getBlessing() {

        const userOpenid = wx.getStorageSync('userOpenid');

        const loginReq = {
            open_id: userOpenid
        };

        api.barrageList({
            // method: "POST",
            data: loginReq,
            success: (res) => {
                let data = res.data;
                // console.log(res);
                const blessing = [];


                util.each(data.data, (k, v) => {
                    // console.log(k, v);
                    let blessingItem = {};
                    blessingItem.id = v.msg_id;
                    blessingItem.msg = v.message;
                    blessingItem.name = v.user_name;
                    blessingItem.time = v.time;
                    blessingItem.is_reply = v.is_reply;
                    blessing.push(blessingItem);

                });
                this.setData({
                    blessing: blessing,
                    'type[0].name': `宾客祝福(${blessing.length})`,
                });

            }
        });
    },
    allRead() {

        const userOpenid = wx.getStorageSync('userOpenid');

        const loginReq = {
            open_id: userOpenid
        };

        api.allRead({
            // method: "POST",
            data: loginReq,
            success: (res) => {

            }
        });
    },
    getBanquetInfoList() {
        const userOpenid = wx.getStorageSync('userOpenid');

        const loginReq = {
            open_id: userOpenid
        };

        api.banquetInfoList({
            // method: "POST",
            data: loginReq,
            success: (res) => {
                let data = res.data;
                // console.log(res);
                const banquetInfo = [];


                util.each(data.data, (k, v) => {
                    // console.log(k, v);
                    let banquetInfoItem = {};
                    banquetInfoItem.name = v.user_name;
                    banquetInfoItem.attend_num = v.attend_num;
                    banquetInfoItem.tel = v.phone_num;
                    banquetInfoItem.transit_type = this.data.objectArrayObj[v.transit_type].name;
                    banquetInfo.push(banquetInfoItem);

                });

                this.setData({
                    banquetInfo: banquetInfo,
                    'type[1].name': `赴宴(${banquetInfo.length})`,
                });

            }
        });
    },

});
