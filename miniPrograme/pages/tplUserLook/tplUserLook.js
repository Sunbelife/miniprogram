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
        isShowBlessing: false,
        tplInfo: {},
        card_id: '',
        id: ''

    },

    onLoad: function (options) {
        let id = options.id;

        // TODO 删除
        // id = "80faef93c12c63360aa9714edf3705fd";

        if (util.isDev()) {
            id = "dfce632a831a27dbf5c88980fd27985f";
        }

        this.setData({
            id: id
        });


        if (util.isDev()) {

            let index = getApp().globalData.devTpl - 1;
            tplConfig.tpls[index].pages = tplConfig.tpls[index].pages
                .concat(tplConfig.tpls[index].toGuestsPage);
            this.setData({
                tplInfo: tplConfig.tpls[index],
                isReady: true
            });

        } else {
            this.getTplInfo();

        }

        if (util.isDev()) {
            setTimeout(()=>{
                this.showBanquetInfoFill();
                // this.showSaySomething();
            },300);

        }


    },
    catchScroll() {


    },
    goPage: util.goPage,
    getTplInfo: function () {
        wx.showLoading({
            title: '加载中...'
        });
        const loginReq = {
            card_id: this.data.id,
        };

        api.tplGet({
            // method: "POST",
            data: loginReq,
            success: (resLogin) => {
                // console.log(resLogin);
                // resLogin.data.code = 500
                if (resLogin.data.code === 200) {
                    this.setData({
                        open_id: resLogin.data.data.open_id,
                        card_id: resLogin.data.data.card_id
                    });
                    // console.log(this.data.open_id);


                    this.init(JSON.parse(resLogin.data.data.changed_log));
                    wx.hideLoading();
                } else {
                   this.delHandle();
                }

            }
        });

    },

    delHandle(){
        wx.showToast({
            title: '请帖已被删除',
            icon: 'none',
            duration: 2000
        });

        setTimeout(() => {

            wx.reLaunch({
                url: '../home/home'
            })
        }, 2000)
    },
    init(tplInfo) {

        try {
            if (tplInfo) {
                // Do something with return value
                this.setData({
                    tplInfo: tplInfo
                });
            } else {
                if (util.isDev()) {
                    this.setData({
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

        // this.data.tplInfo.barrageHas = false;

        console.log(this.data.tplInfo);
        if (this.data.tplInfo.barrageHas) {


            this.getBlessing();
        }


        // 最后提交，pages 已经合一起了
        // if (this.data.tplInfo.toGuestsHas) {
        // this.data.tplInfo.pages.push(this.data.tplInfo.toGuestsPage);
        // }


        this.setData({
            tplInfo: this.data.tplInfo
        });











        // console.log(this.data.tplInfo);

        this.setData({
            isReady: true
        });
    },

    pageMove(e) {
        console.log(e.detail);
        let index = e.detail.index;
        let pageInfo = e.detail.pageInfo;

        let isShowBlessing = false;
        // 首页 ，致宾客页面，制作页面没有 弹幕
        if (index === 0 || pageInfo.id === "make" || pageInfo.type === "toGuests") {

        } else {
            isShowBlessing = true;

        }

        if (isShowBlessing) {
            this.scrollInit();
            setTimeout(() => {
                this.scroll();
            }, 300)
        }

        this.setData({
            isShowBlessing: isShowBlessing
        });
    },
    scrollInit() {
        // 重新滚动
        this.setData({
            blessingScrollIndex: 0,
            blessingScrollH: 0
        });
    },

    getBlessing() {
        const loginReq = {
            open_id: this.data.open_id
        };
        // console.log(loginReq);
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
                    blessingItem.msg = v.message;
                    blessingItem.name = v.user_name;
                    blessing.push(blessingItem);

                });
                console.log(blessing);
                this.setData({
                    blessing: blessing
                });

                this.scrollItemFill();
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
    scrollTimer: {},
    scroll() {
        // 防止累加
        if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = setTimeout(() => {
            let blessingScrollIndex = this.data.blessingScrollIndex;
            let blessingScrollH = this.data.blessingScrollH;
            let blessing = this.data.blessing;
            // // console.log(blessingScrollIndex, blessing.length - 1);
            if (blessingScrollIndex < blessing.length - 1) {
                blessingScrollIndex++;
                blessingScrollH = blessingScrollH - util.rpx2px(80);
                this.setData({
                    blessingScrollH: blessingScrollH,
                    blessingScrollDuration: this.data.blessingConfig.duration,
                    blessingScrollIndex: blessingScrollIndex,
                    blessingScrollTransition: this.data.blessingConfig.transition
                });

                setTimeout(() => {
                    this.scroll();
                }, 20)

            } else {
                this.setData({
                    blessingScrollDuration: 0,
                    blessingScrollIndex: 0,
                    blessingScrollTransition: 0,
                    blessingScrollH: 0
                });

                setTimeout(() => {
                    this.scroll();
                }, 20)
            }


        }, this.data.blessingScrollDuration);

    },

    // 显示 填写宾客信息
    showBanquetInfoFill() {
        // console.log("showBanquetInfoFill at");
        this.setData({
            isBanquetInfoFill: true
        });

        this.setData({
            isBanquetInfoFillAnimate: true,
        });

    },
    // 隐藏 填写宾客信息
    hideBanquetInfoFill() {

        this.setData({
            isBanquetInfoFill: false
        });


        setTimeout(() => {
            this.selectComponent("#tpl1") && this.selectComponent("#tpl1").hideBanquetInfo();
        }, 10)
    },
    // 显示 说些什么
    showSaySomething() {
        this.setData({
            isSaySomething: true
        });
        this.setData({
            isSaySomethingAnimate: true,
        });
        setTimeout(() => {
            this.selectComponent("#tpl1") && this.selectComponent("#tpl1").hideMap();
        }, 10)
        console.log(this.data.isSaySomething);

    },
    // 隐藏 说些什么
    hideSaySomething() {
        this.getBlessing();

        this.setData({
            isSaySomething: false
        });

        setTimeout(() => {
            this.selectComponent("#tpl1") && this.selectComponent("#tpl1").showMap();
        }, 10)


    },
    onHide() {
        // console.log("hide");
        this.selectComponent("#tpl1") && this.selectComponent("#tpl1").playStop();

    },
    onUnload() {
        // 返回
        // console.log("onUnload");
        this.selectComponent("#tpl1") && this.selectComponent("#tpl1").playStop();

    },

});
