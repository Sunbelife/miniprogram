const util = require('../../utils/util.js');
// 写评论
const api = require('../../utils/api.js');
/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        noClose: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        dateStart: util.dateFormat(new Date(), "yyyy-MM-dd"),
        date: '',
        address: '',
        time: '12:00',
        latitude: 0,
        longitude: 0,
        nameLady: "",
        nameGentleman: "",
        ready: false,
        isMapShow: true,
        markers: [{
            // id: 1,
            // latitude: 23.099994,
            // longitude: 113.324520,
            // name: 'T.I.T 创意园'
        }],
        covers: [{
            // latitude: 23.099994,
            // longitude: 113.344520,
            // iconPath: '/images/location.png'
        }, {
            // latitude: 23.099994,
            // longitude: 113.304520,
            // iconPath: '/images/location.png'
        }]
    },
    mapCtx: {},
    ready() {

        this.init();
        setTimeout(() => {
            // 页面 地图 表单影响加载。先这样处理
            this.setData({
                ready: true
            });
        }, 300);

        this.mock();

    },
    methods: {
        mock() {

            if (util.isDev() || getApp().globalData.isMock) {
                this.setData({
                    address: "北海公园",
                    nameLady: "翠花",
                    nameGentleman: "张三丰"
                });
            }
        },
        init() {


            this.mapCtx = wx.createMapContext('myMap');
            const that = this;
            try {
                let tplInfo = wx.getStorageSync('tplInfo');
                var invitationInfo = tplInfo.invitationInfo;

                // wx.getLocation({
                //     type: 'wgs84',
                //     success(res) {
                //         console.log(res);
                //         that.setLocation(res);
                //     }
                // })
                // console.log(invitationInfo.address);
                if (invitationInfo) {
                    this.setData({
                        address: invitationInfo.address,
                        date: invitationInfo.date,
                        time: invitationInfo.time,
                        latitude: invitationInfo.latitude,
                        longitude: invitationInfo.longitude,
                        nameLady: invitationInfo.nameLady,
                        nameGentleman: invitationInfo.nameGentleman
                    });
                } else {
                    this.setData({
                        date: util.getCurDate()
                    });
                    wx.getLocation({
                        type: 'wgs84',
                        success(res) {
                            console.log(res);
                            that.setLocation(res);
                        }
                    })
                }
            } catch (e) {
                // Do something when catch error
            }


        },
        setLocation(res) {
            const that = this;
            that.setData({
                latitude: res.latitude,
                longitude: res.longitude

            });
            that.setData({
                markers: [{
                    id: 1,
                    latitude: this.data.latitude,
                    longitude: this.data.longitude
                    // name: 'T.I.T 创意园'
                }]
            });
        },
        formSubmit(e) {

            const self = this;
            const value = e.detail.value;
            // console.log(e.detail.value);
            // console.log(this.properties);
            const address = value.address;
            const nameLady = value.nameLady;
            const nameGentleman = value.nameGentleman;

            if (!nameGentleman) {
                util.toast("新郎姓名为空，请输入");
                return;
            }

            if (!nameLady) {
                util.toast("新娘姓名为空，请输入");
                return;
            }

            if (!address) {
                util.toast("地址为空，请输入");
                return;
            }


            if (this.data.isLoading) {
                return;
            }
            // 防止重复提交
            this.setData({
                isLoading: true
            });
            wx.showLoading({
                title: '修改中...'
            });

            const req = {
                latitude: this.data.latitude,
                longitude: this.data.longitude,
                date: this.data.date,
                time: this.data.time,
                address: address,
                nameLady: nameLady,
                nameGentleman: nameGentleman
            };

            let tplInfo = {};
            try {
                tplInfo = wx.getStorageSync('tplInfo');
                util.extend(true, tplInfo, {
                    invitationInfo: req
                });

                try {
                    wx.setStorageSync('tplInfo', tplInfo);
                    // 修改
                    util.tplALL.updateOne(tplInfo, () => {

                        setTimeout(() => {
                            self.setData({
                                isLoading: false
                            });
                            wx.hideLoading();

                            self.triggerEvent('submit');

                        }, 300);


                    })
                } catch (e) {
                }

            } catch (e) {
                // Do something when catch error
            }


        },

        hidePage() {
            this.triggerEvent('hidePage');
        },
        mapHide() {
            this.setData({
                isMapShow: false
            });
        },
        mapShow() {
            this.setData({
                isMapShow: true
            });
        },
        chooseLocation() {
            const that = this;
            wx.chooseLocation({
                success(e) {
                    console.log("success", e);
                    that.setLocation(e);

                    // 选择地址获取地址，设置值
                    that.setData({
                        address: e.name
                    });
                },
                error(e) {
                    util.toast("选择地址出错");
                },
                complete(e) {
                    // console.log("complete", e);
                }
            });
        },
        clickMap() {
            // util.toast("click map");
            // // console.log("click map");
        },
        bindDateChange: function (e) {
            // console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                date: e.detail.value
            })
        },
        bindTimeChange: function (e) {
            // console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                time: e.detail.value
            })
        },
        getCenterLocation: function () {
            this.mapCtx.getCenterLocation({
                success: function (res) {
                    // console.log(res.longitude)
                    // console.log(res.latitude)
                }
            })
        },
        moveToLocation: function () {
            this.mapCtx.moveToLocation()
        },
        translateMarker: function () {
            this.mapCtx.translateMarker({
                markerId: 1,
                autoRotate: true,
                duration: 1000,
                destination: {
                    latitude: 23.10229,
                    longitude: 113.3345211,
                },
                animationEnd() {
                    // console.log('animation end')
                }
            })
        },
        includePoints: function () {
            this.mapCtx.includePoints({
                padding: [10],
                points: [{
                    latitude: 23.10229,
                    longitude: 113.3345211,
                }, {
                    latitude: 23.00229,
                    longitude: 113.3345211,
                }]
            })
        }
    }

});