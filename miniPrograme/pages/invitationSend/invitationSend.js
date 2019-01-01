const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Page({
    data: {
        tplInfo: {},
        isShowImgCut: false,
        curCutImageInfo: {
            width: 500 / 2,
            height: 400 / 2,
        },
        curShowPage: 0,
        // TODO 默认分享图片
        // shareImg: 'https://dummyimage.com/200x300&text=hello',
        shareImg: '',
        shareImgOri: '备份比较',
    },

    onLoad: function () {
        // 备份比较
        this.setData({
            shareImgOri: this.data.shareImg,
        });

        this.loadTpl();
        this.save();
        
        // this.saveImgToFile('https://xcx.lyy99.com/uploads/tpl_1/cover.jpg');
    },
    // 保存图片
    saveImage(e) {

        // console.log(e);
        // console.log(e.detail);
        const curShowPage = e.detail.curShowPage;
        const cutImageInfo = e.detail.cutImageInfo;
        const newImageSrc = e.detail.newImageSrc;

        this.data.tplInfo.shareImg = newImageSrc;
        this.setData({
            tplInfo: this.data.tplInfo,
            shareImg: newImageSrc,
            isShowImgCut: false
        });
        this.save();

    },
    loadTpl() {
        try {
            var tplInfo = wx.getStorageSync('tplInfo');
            // console.log(JSON.stringify(tplInfo));
            if (tplInfo) {
                util.tplALL.fixToGuestsHas(tplInfo);

                // Do something with return value
                this.setData({
                    isReady: true,
                    shareImg: tplInfo.shareImg,
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

            // this.setData({
            //     shareImg:this.data.tplInfo.imgSrc
            // })



        } catch (e) {
            // Do something when catch error
        }
    },

    save() {
        wx.showLoading({
            title: '正在保存',
        });

        const userOpenid = wx.getStorageSync('userOpenid');

        const loginReq = {
            open_id: userOpenid,
            changed_log: JSON.stringify(this.data.tplInfo),
            cover_pic_url: '',
        };

        // 存在才传  把 card_id 传上去，就是更新
        // 不传 就是新建
        const card_id = this.data.tplInfo.card_id;
        if (card_id) {
            loginReq.card_id = card_id;
        }

        console.log(this.data.tplInfo);


        api.tplSave({
            method: "POST",
            data: loginReq,
            success: (resLogin) => {
                // console.log(resLogin);

                // if (!card_id) {
                if (resLogin.data.data) {
                    this.data.tplInfo.card_id = resLogin.data.data.card_id;
                    this.setData({
                        tplInfo: this.data.tplInfo
                    });
                }

                // }
                util.tplALL.updateOne(this.data.tplInfo);

                wx.hideLoading();
            }
        });

    },
    share: function () {

        let that = this;
        wx.showLoading({
            title: '正在生成',
        });

        const loginReq = {
            sence: encodeURIComponent({
                id: this.data.tplInfo.card_id
            }),
            page: "/pages/tplUserLook/tplUserLook"
        };

        console.log(loginReq);

        api.userShareImgGet({
            method: "POST",
            data: loginReq,
            success: (resLogin) => {
                wx.hideLoading();
                if (resLogin.data.data) {
                    let pic_url = resLogin.data.data.pic_url;

                    that.saveImgToFile(pic_url);
                  

                }
            }
        });


    },
    
    saveImgToFile(pic_url){
        wx.getImageInfo({
            src: pic_url,
            success(res) {
                console.log(res);
                wx.saveImageToPhotosAlbum({
                    filePath:res.path,
                    success(res) {
                        util.toast("保存成功");
                    },
                    fail(res) {
                        util.toast("保存失败");
                    }
                })
            }
        })
    },
    addPic() {
        this.setData({
            isShowImgCut: true
        });

        return;
        const self = this;
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                self.setData({
                    shareImg: tempFilePaths
                });

                const req = {};
                req.url = "";
                req.path = tempFilePaths;
                req.name = "";
                req.success = function () {

                };
                req.fail = function () {

                };
                // wx.wxUpload(req);
            }
        })
    },
    // 分享图片生成
    shareImgGen(shareImgUrl) {
        wx.showLoading({
            title: '正在生成图片...',
            mask: true
        });

        const that = this;
        wx.getImageInfo({
            src: shareImgUrl,
            success: function (res) {
                // console.log(res);
                const path = res.path;

                that.shareImgGenSave(path);
            },
            fail: function (res) {
                wx.hideLoading();
                //失败回调
                // console.log(res);
            }
        });
    },
    // 分享图片保存
    shareImgGenSave(path) {
        wx.saveImageToPhotosAlbum({
            filePath: path,
            success(res) {
                // console.log(res);
                util.toast('保存成功');

            },
            fail(res) {
                // console.log(res);
                util.toast('保存失败');
            },
            complete(res) {
                wx.hideLoading();
            }
        })
    },

    // 分享配置
    onShareAppMessage: function (res) {

        // console.log(res);
        if (res.from === 'button') {
            // 来自页面内转发按钮
            // console.log(res.target)
        }


        // shareImg: 'https://dummyimage.com/200x300&text=hello',

        let imageUrl = '';

        if (this.data.shareImg !== this.data.shareImgOri) {
            imageUrl = this.data.shareImg;
        }
        let shareObj = {
            title: ` ${this.data.tplInfo.invitationInfo.nameGentleman}&${this.data.tplInfo.invitationInfo.nameLady}的婚礼邀请`,
            path: '/pages/tplUserLook/tplUserLook?id=' + this.data.tplInfo.card_id
        };


        if (imageUrl) {
            shareObj.imageUrl = imageUrl;
        }
        // console.log(shareObj);

        return shareObj;
    }
});
