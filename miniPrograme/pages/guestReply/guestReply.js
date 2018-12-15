const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Page({
    data: {
        activeType: 1,
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

                this.scrollItemFill();
                this.scroll();
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

                this.scrollItemFill();
                this.scroll();
            }
        });
    },

});
