const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
const tplConfig = require('../../utils/tplConfig.js');

const app = getApp();
/* 用户查看 */

// 告诉最后一个页面需要按钮
// 从最后一个页面传递上来显示填写

Page({
    data: {
        // blessing:["真好真好真好真好真好真好真好真好"],
        blessing: [],
        // blessing: ["真好", "真好2", "真好3"],
        isBanquetInfoFill: false,
        blessingConfig: {
            duration: 2000,
            transition: 0.6
        },
        blessingScrollH: 0,
        blessingScrollIndex: 0,
        blessingScrollDuration: 0,
        blessingScrollTransition: 0,
        isSaySomething: false,
        isReady: false,
        tplInfo: {},
        id: ''

    },

    onLoad: function (options) {
        let id = options.id;

        // TODO 删除
        // id = "10c0e5f98d0c77216a7bd840941eaab7";


        this.setData({
            id: id
        });


        this.getTplInfo();

    },
    getTplInfo: function () {

        const loginReq = {
            card_id: this.data.id,
        };

        api.tplGet({
            // method: "POST",
            data: loginReq,
            success: (resLogin) => {
                console.log(resLogin);
                this.setData({
                    open_id: resLogin.data.data.open_id
                });
                console.log(this.data.open_id);


                this.init(JSON.parse(resLogin.data.data.changed_log));


            }
        });

    },
    init(tplInfo) {

        try {
            if (tplInfo) {
                // Do something with return value
                this.setData({
                    isReady: true,
                    tplInfo: tplInfo
                });
            } else {
                if (util.isDev()) {
                    this.setData({
                        isReady: true,
                        tplInfo: tplConfig.mockTpl
                    });
                }
            }
        } catch (e) {
            // Do something when catch error
        }

        let title = `${this.data.tplInfo.invitationInfo.nameGentleman}&${this.data.tplInfo.invitationInfo.nameLady}的婚礼邀请`;

        wx.setNavigationBarTitle({
            title: title
        });
        this.getBlessing();


        if (this.data.tplInfo.toGuestsHas) {
            this.data.tplInfo.pages.push(this.data.tplInfo.toGuestsPage);
        }


        this.setData({
            tplInfo: this.data.tplInfo
        });


        // TODO 删除
        // this.showBanquetInfoFill();


        if (util.isDev()) {

        }


        console.log(this.data.tplInfo);


    },

    getBlessing() {
        const loginReq = {
            open_id: this.data.open_id
        };
console.log(loginReq);
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

    scrollItemFill() {
        let blessing = this.data.blessing;

        blessing.push(blessing[0]);
        this.setData({
            blessing: blessing
        });
    },

    scroll() {
        setTimeout(() => {
            let blessingScrollIndex = this.data.blessingScrollIndex;
            let blessingScrollH = this.data.blessingScrollH;
            let blessing = this.data.blessing;
            // console.log(blessingScrollIndex, blessing.length - 1);
            if (blessingScrollIndex < blessing.length - 1) {
                blessingScrollIndex++;
                blessingScrollH = blessingScrollH - util.rpx2px(60);
                this.setData({
                    blessingScrollH: blessingScrollH,
                    blessingScrollDuration: this.data.blessingConfig.duration,
                    blessingScrollIndex: blessingScrollIndex,
                    blessingScrollTransition: this.data.blessingConfig.transition
                });

                this.scroll();
            } else {
                this.setData({
                    blessingScrollDuration: 0,
                    blessingScrollIndex: 0,
                    blessingScrollTransition: 0,
                    blessingScrollH: 0
                });
                this.scroll();
            }

        }, this.data.blessingScrollDuration);

    },

    // 显示 填写宾客信息
    showBanquetInfoFill() {
        this.setData({
            isBanquetInfoFill: true
        });
    },
    // 隐藏 填写宾客信息
    hideBanquetInfoFill() {
        this.setData({
            isBanquetInfoFill: false
        });
    },
    // 显示 说些什么
    showSaySomething() {
        this.setData({
            isSaySomething: true
        });
    },
    // 隐藏 说些什么
    hideSaySomething() {
        this.getBlessing();

        this.setData({
            isSaySomething: false
        });
    }
});
