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
        objectArrayObj:{}
    },

    onLoad: function () {

        this.setData({
            objectArrayObj: util.arrToObj(this.data.objectArray,'id')
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
    replay: function (e) {
        const id = util.data(e, "id");

        wx.showActionSheet({
            itemList: ['回复', '删除'],
            success(res) {
                let handleIndex = res.tapIndex;

                if (handleIndex === 0) {
                    console.log("回复");

                    // TODO 显示 回复祝福组件
                    // replayWish
                }
                if (handleIndex === 1) {


                    // TODO 显示 删除确认

                    console.log("删除");

                }

            },
            fail(res) {
                console.log(res.errMsg)
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
                console.log(res);
                const blessing = [];


                util.each(data.data, (k, v) => {
                    console.log(k, v);
                    let blessingItem = {};
                    blessingItem.msg = v.message;
                    blessingItem.name = v.user_name;
                    blessingItem.time = v.time;
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
                console.log(res);
                const banquetInfo = [];


                util.each(data.data, (k, v) => {
                    console.log(k, v);
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
