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
        ]
    },

    onLoad: function () {

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
                let handleIndex  = res.tapIndex;

                if(handleIndex === 0){
                    console.log("回复");

                    // TODO 显示 回复祝福组件
                    // replayWish
                }
                if(handleIndex === 1){


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
        const loginReq = {
            card_id: "123123"
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
                    blessing.push(blessingItem);

                });

                this.setData({
                    blessing: blessing
                });

            }
        });
    },
    getBanquetInfoList() {
        const loginReq = {
            card_id: "123123"
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
                    banquetInfoItem.name = v.attend_name;
                    banquetInfo.push(banquetInfoItem);

                });

                this.setData({
                    banquetInfo: banquetInfo
                });

            }
        });
    },

});
