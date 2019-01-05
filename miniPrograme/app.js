//app.js
App({
    isPublish: false,
    globalData: {
        // 当前开发的模板
        devTpl: 3,
        // 当前开发的页面
        devPage: 7,
        // 当前开发的图片进度
        devPageImgProcess: {
            tpl: 3,
            page: 7,
        },


        // TODO 改回去
        // isAutoPlayMusic: true,
        isAutoPlayMusic: false,
        domain: "https://xcx.lyy99.com",
        domainDev: "http://localhost:3000",
        // TODO 改回去

        imgPre: "/images",
        // imgPre:"https://xcx.lyy99.com/uploads",
        // imgPre:"http://xcx.lyy99.com/uploads/tpl_1/",


        isDev: 1,
        // isDev: 0,

        // TODO 改回去
        // isMock: 1,
        isMock: 0,
        userInfo: null
    },
    systemInfo: null,
    onLaunch: function () {

        const self = this;
        wx.getSystemInfo({
            success(res) {
                self.systemInfo = res;

            }
        });


        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    }
});