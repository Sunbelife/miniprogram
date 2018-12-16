const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Component({
    behaviors: [],
    properties: {
        cutImageInfo: null, // 简化的定义方式
        curShowPage: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        chooseImgPath: "",
        movableAreaRectangle: {
            width: "10",
            height: "10",
        },
        movableViewRectangle: {
            width: "500",
            height: "500",
        },
        isLoading: false,
        x: 0,
        y: 0,
        uploadSuccessImg: "",
        imgSrc: "/images/logo.jpeg",
        // 默认缩放一半
        // TODO  需要的图片大小和用户都要缩放
        // scale: .5
        scaleMin: 0.01,
        scale: 1,
        showImgScale: 1,
    },
    ready() {

        const cutImageInfo = this.properties.cutImageInfo;


        console.log(cutImageInfo);
        if (!cutImageInfo.width) {
            console.error("未设置编辑图片的大小");
        } else {
            console.log(cutImageInfo.width, getApp().systemInfo.windowWidth * 0.8);
            console.log(cutImageInfo.height, getApp().systemInfo.windowHeight * 0.8);
            console.log(cutImageInfo.width > getApp().systemInfo.windowWidth * 0.8);
            console.log(cutImageInfo.height > getApp().systemInfo.windowHeight * 0.8);

            if (cutImageInfo.width > getApp().systemInfo.windowWidth * 0.7
                || cutImageInfo.height > getApp().systemInfo.windowHeight * 0.7
            ) {

                this.setData({
                    scale: .7,
                    showImgScale: .7,
                });

            }

            this.setData({
                movableAreaRectangle: {
                    width: this.cssHandle(cutImageInfo.width, this.data.scale),
                    height: this.cssHandle(cutImageInfo.height, this.data.scale)
                }
            });
        }

        console.log("图片设置", this.properties.curShowPage);

        this.scaleRecord = {
            scale: 1
        };
    },
    methods: {
        cssHandle(css, scale) {
            //     css  300px   300 * scale  + px
            return (css * scale);
        },
        hidePage() {
            this.triggerEvent('hidePage');
        },
        saveImage() {
            // this.hidePage();

            console.log(this.data.x, this.data.y, this.data.scale);

            console.log(this.properties.cutImageInfo);

            this.triggerEvent('saveImage', {
                curShowPage: this.properties.curShowPage,
                cutImageInfo: this.properties.cutImageInfo,
                newImageSrc: this.data.uploadSuccessImg
                // newImageSrc: "https://dummyimage.com/200x300&text=random" + Math.floor(Math.random() * 1000)
            });

            // this.hidePage();
        },
        drawImg() {
            const that = this;

            wx.getImageInfo({
                src: this.data.imgSrc,
                success: function (res) {
                    console.log(res);

                    that.setData({
                        movableViewRectangle: {
                            width: res.width,
                            height: res.height
                        }
                    });
                    that.setData({
                        imgPath: res.path
                    });

                    setTimeout(() => {
                        that.drawSharePic(res);
                    }, 300)
                },
                fail: function (res) {
                    //失败回调
                    console.log(res);
                }
            });
        },


        onChange(e) {
            // {x: 0, y: 0, source: "touch"}
            // console.log(e.detail);
            this.setData({
                x: e.detail.x,
                y: e.detail.y
            });
        },
        scaleRecord: {
            scale: 1
        },
        onScale(e) {
            // {scale: 0.6, x: -18.3, y: -18.3}
            // console.log(e.detail);
            this.scaleRecord = {
                scale: e.detail.scale,
                x: e.detail.x,
                y: e.detail.y
            };
        },
        chooseImg() {
            const that = this;
            // wx.showLoading({
            //     title: '选择图片',
            // });
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths;
                    // wx.showLoading({
                    //     title: '身份证识别中...',
                    // });


                    that.setData({
                        chooseImgPath: ""
                    });


                    console.log(tempFilePaths);


                    wx.getImageInfo({
                        src: tempFilePaths[0],
                        success: function (res) {
                            console.log(res);


                            // 原图比需要的大的情况。原图比大图小的情况。改变 scale ，改变最小scale
                            console.log("最小缩放", that.data.movableAreaRectangle, res);

                            let widthBili = res.width / that.data.movableAreaRectangle.width;
                            let heightBili = res.height / that.data.movableAreaRectangle.height;

                            let scaleMin = 1;

                            if (widthBili > 1 || heightBili > 1) {
                                scaleMin = 1 / Math.min(widthBili, heightBili);
                            } else {
                                scaleMin = 1 / Math.min(widthBili, heightBili);
                            }

                            console.log("最小缩放", widthBili, heightBili);
                            console.log("最小缩放", scaleMin);

                            that.setData({
                                scaleMin: scaleMin,
                                scale: scaleMin,
                                movableViewRectangle: {
                                    width: res.width,
                                    height: res.height
                                }
                            });
                           setTimeout(()=>{
                               that.setData({
                                   chooseImgPath: tempFilePaths[0]
                               });
                           },300);

                            wx.hideLoading();

                            console.log("最小缩放", that.data.movableViewRectangle,that.data.movableAreaRectangle);

                        },
                        fail: function (res) {
                            //失败回调
                            console.log(res);
                            wx.hideLoading();
                        }
                    });
                    wx.hideLoading();
                }
            })
        },
        uploadImg() {

            // TODO  加载标示
            wx.showLoading({
                title: '上传中',
            });
            const that = this;

            console.log(this.data.chooseImgPath,
                `${api.apiUrl}${api.urls.updateImgCut}`, {
                    'p_show_img_scale': that.data.showImgScale,
                    'p_x': that.data.x,
                    'p_y': that.data.y,
                    'p_width': that.data.movableAreaRectangle.width,
                    'p_height': that.data.movableAreaRectangle.height,
                    'p_scale': that.scaleRecord.scale
                });
            wx.uploadFile({
                url: `${api.apiUrl}${api.urls.updateImgCut}`, //仅为示例，非真实的接口地址
                filePath: that.data.chooseImgPath,
                name: 'image',
                formData: {
                    'p_show_img_scale': that.data.showImgScale,
                    'p_x': that.data.x,
                    'p_y': that.data.y,
                    'p_width': that.data.movableAreaRectangle.width,
                    'p_height': that.data.movableAreaRectangle.height,
                    'p_scale': that.scaleRecord.scale
                },
                success: function (res) {
                    console.log(res);
                    let data = JSON.parse(res.data);
                    let imgUrl = data.data;

                    if (!imgUrl.startsWith("http")) {
                        imgUrl = 'https://' + imgUrl;
                    }

                    wx.hideLoading();
                    that.setData({
                        uploadSuccessImg: imgUrl
                    });

                    that.saveImage();
                },
                complete() {
                    wx.hideLoading();
                }
            })
        }
    }

});