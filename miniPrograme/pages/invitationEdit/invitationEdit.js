const app = getApp();
const util = require('../../utils/util.js');
const tplConfig = require('../../utils/tplConfig.js');

/* 
 * 长按 取消 列表的滚动。移动复制的副本  
 * 停止移动，根据列表的滑动距离，确定要换的位置 
 * 
 * */

/*
 *
 * todo  实时保存呢？请求接口呢？
 * todo 还是有一个保存按钮呢？
 * todo 还是存缓存，等发送再保存？ 还是下面叫保存按钮！！
 * 
 * 
 * 
 * 返回要记得保存
 * 
 *
 *
 *
 模板上换图片  ，（跳到裁剪页）选择图片，裁剪。保存。，
 模板上换文字。本页。编辑框
 添加页面。  （跳到添加新页）   单图 ，多图，双图。文字
 页面排序。 删除页面。长按排序
 设置。  （跳到设置页面）  基本信息 ，音乐 ，弹幕 ，复制请帖，删除请帖
 预览  （跳到预览页面）  发送按钮
 发送 （跳到发送页面），设置封面图
 * */
Page({
    data: {
        // 编辑元素数组
        editEleImage: [],
        editEleText: [],
        pages: new Array(10).fill({}),
        curShowPage: 0,
        isShowSort: false,
        isShowPageAdd: false,
        isShowPageSet: false,
        isShowPageSort: false,
        isShowInvitationInfo: false,
        isShowMusicChoose: false,
        isShowImgCut: false,
        isShowWordChange: false,
        curCutImageInfo: {},
        curWordChangeInfo: {},
        pageReady: false,
        handle: "",
        // 背景音乐
        bgMusic: "",
        // 是否有弹幕
        barrageHas: "",
        // 是否有致宾客页面
        toGuestsHas: "",
        invitationInfo: {},
        id: 0,
        maxPageSize: 10,
        // 已编辑过的模板
        tplInfo: {},
        mock: {
            isAddPage: false
        }
    },

    onLoad: function (options) {
        // console.log("onload", options);


        // console.log(getApp().systemInfo);
        // console.log(util.rpx2px(225));


        this.pageFix();
        this.pageDelHandle();

        this.setData({
            pageReady: true
        });

        if (util.isDev() || getApp().globalData.isMock) {
            // if (true) {
            // 显示排序
            // this.showSort();
            // 显示新增页面
            // this.showPageAdd();
            // 设置页面设置
            // this.showPageSet();
            // 设置页面排序
            // this.showPageSort();
            // 显示图片裁剪
            // this.showImgCut();
            // 显示文字编辑
            // this.showWordChange();

            if (this.data.isShowPageSet) {
                // 请帖信息编辑
                // this.showInvitationInfo();

                // 预留音乐初始化的时间
                setTimeout(() => {
                    // 音乐选择
                    // this.showMusicChoose();
                }, 1000)
            }

        }


    },
    pageMove(e) {
        // console.log(e);
        this.setData({
            editEleImage: [],
            editEleText: [],
            curShowPage: e.detail.index
        });
        //  延时显示一下编辑
        setTimeout(() => {
            if (e.detail) {
                this.setData({
                    editEleImage: e.detail.editInfo.image,
                    editEleText: e.detail.editInfo.text
                });
            }
        }, 300)
    },

    // 保存到缓存里面去
    saveTplInfo(call) {
        try {

            let tplInfo = wx.getStorageSync('tplInfo');

            util.extend(true, tplInfo.pages, this.data.pages);
            util.extend(true, tplInfo.invitationInfo, this.data.invitationInfo);
            util.extend(true, tplInfo.toGuestsPage, this.data.toGuestsPage);
            util.extend(true, tplInfo.bgMusic, this.data.bgMusic);


            tplInfo.barrageHas = this.data.barrageHas;
            tplInfo.toGuestsHas = this.data.toGuestsHas;

            if (tplInfo.toGuestsHas) {
                tplInfo.pages = tplInfo.pages.slice(0, tplInfo.pages.length - 1)
            }


            wx.setStorageSync('tplInfo', tplInfo);

            util.tplALL.updateOne(tplInfo, () => {
                call && call();
            });


        } catch (e) {
            // Do something when catch error
        }
    },
    // 添加页面名称
    pageFix() {
        const that = this;

        let tplInfo = {};
        try {
            tplInfo = wx.getStorageSync('tplInfo');
            // console.log(JSON.stringify(tplInfo));
            // if (util.isDev() && !tplInfo) {
            if (!tplInfo || util.isDev()) {
                // tplInfo = tplConfig.mockTpl;
                tplInfo = tplConfig.tpls[getApp().globalData.devTpl - 1];
            }
            this.setData({
                tplInfo: tplInfo
            });


            // console.log(tplInfo);
            let pages = [];
            let invitationInfo = {};
            let toGuestsPage = {};
            let bgMusic = {};

            util.extend(true, pages, tplInfo.pages);
            util.extend(true, invitationInfo, tplInfo.invitationInfo);
            util.extend(true, toGuestsPage, tplInfo.toGuestsPage);
            util.extend(true, bgMusic, tplInfo.bgMusic);

            pages.forEach(function (v, k) {
                v.zh = that.pageName(k, v);
            });
            // // console.log(pages);
            this.setData({
                pages: pages
            });

            try {
                wx.setStorageSync('toGuestsHas', this.data.toGuestsHas)
            } catch (e) {
            }


            this.setData({
                id: tplInfo.id,
                storageId: tplInfo.storageId,
                pages: pages,
                bgMusic: bgMusic,
                invitationInfo: invitationInfo,
                toGuestsPage: toGuestsPage,
                toGuestsHas: tplInfo.toGuestsHas,
                barrageHas: tplInfo.barrageHas
            });
            // 处理致宾客页面
            this.updateToGuestsHasHandle();


        } catch (e) {
            // Do something when catch error
        }


    },
    submitInvitationInfo() {
        this.hideInvitationInfo();
        this.updateInvitationInfo();

        // 保存到模板里面
        this.saveTplInfo();

    },
    updateInvitationInfo() {
        // 更新请帖信息到 page
        // 新建就移除上一次存储的，也可以不移除
        try {
            var tplInfo = wx.getStorageSync('tplInfo');

            // console.log("请帖信息", tplInfo.invitationInfo);
            this.setData({
                invitationInfo: tplInfo.invitationInfo
            });
        } catch (e) {
            // Do something when catch error
        }


    },
    updateBarrageHas() {
        // 更新请帖信息到 page
        // 新建就移除上一次存储的，也可以不移除
        try {
            var barrageHasStorage = wx.getStorageSync('barrageHas');
            if (util.isNotUndefined(barrageHasStorage)) {
                this.setData({
                    barrageHas: barrageHasStorage
                });
            }
        } catch (e) {
            // Do something when catch error
        }
    },
    // 是否有弹幕改变
    barrageHasChange() {
        try {
            var barrageHas = wx.getStorageSync('barrageHas');
            this.setData({
                barrageHas: barrageHas
            });
            // 保存到模板里面
            this.saveTplInfo();

        } catch (e) {
            // Do something when catch error
        }
    },
    // 是否有致宾客页面改变
    toGuestsHasChange() {
        this.updateToGuestsHas();

    },
    updateToGuestsHas() {
        // 更新请帖信息到 page
        // 新建就移除上一次存储的，也可以不移除
        try {
            var toGuestsHas = wx.getStorageSync('toGuestsHas');
            if (util.isNotUndefined(toGuestsHas)) {
                this.setData({
                    toGuestsHas: toGuestsHas
                });
                this.updateToGuestsHasHandle();
            }
        } catch (e) {
            // Do something when catch error
        }
    },
    updateToGuestsHasHandle() {
        const pages = this.data.pages;
        if (this.data.toGuestsHas) {
            if (pages[pages.length - 1].type !== "toGuests") {
                pages.push(tplConfig.tplsOb[this.data.id].toGuestsPage);
            }
        } else {
            if (pages[pages.length - 1].type === "toGuests") {
                pages.splice(pages.length - 1, 1);
                // 移除了，去第一个页面
                this.selectComponent("#tpl1").movePage(0);
            }
        }
        this.resetPageName(pages);
        this.setData({
            pages: pages
        });

        // 保存到模板里面
        this.saveTplInfo();

    },
    // 排序完成，重新设置页面下标名称.需要排序后的排列 page
    sortFinish(e) {
        this.resetPageName(e.detail.pages);
        // 显示当前移动的页
        this.selectComponent("#tpl1").movePage(e.detail.needShowIndex);

        // 保存到模板里面
        this.saveTplInfo();

    },
    // 排序完成，重新设置页面下标名称.需要排序后的排列 page
    removePage(e) {
        this.resetPageName(e.detail.pages);
        // 显示当前移动的页
        this.selectComponent("#tpl1").movePage(e.detail.needShowIndex);
    },
    // 设置音乐
    setMusic(e) {
        const chooseMusic = e.detail.chooseMusic;
        this.setData({
            bgMusic: chooseMusic
            // bgMusic: tplConfig.mp3Ob[chooseMusic]
        });
        // // console.log(this.data.bgMusic);
        this.hideMusicChoose();
        this.selectComponent("#tpl1").changMusic();


        // 保存到模板里面
        this.saveTplInfo();


    },
    // 保存图片
    saveImage(e) {

        // console.log(e);
        // console.log(e.detail);
        const curShowPage = e.detail.curShowPage;
        const cutImageInfo = e.detail.cutImageInfo;
        const newImageSrc = e.detail.newImageSrc;
        const pages = this.data.pages;

        // 替换 当前页下的图片 点击下标下的 图片地址
        pages[curShowPage].imageSrc[cutImageInfo.index] = newImageSrc;
        this.setData({
            pages: pages
        });
        this.hideImgCut();
        // console.log(pages);


        // 保存到模板里面
        this.saveTplInfo();


    },
    sortPageClick(e) {
        // // console.log(e.detail);
        const index = e.detail.index;
        this.selectComponent("#tpl1").movePage(index);

    },
    saveWord(e) {
        // // console.log(e.detail);
        const curShowPage = e.detail.curShowPage;
        const curWordChangeInfo = e.detail.curWordChangeInfo;
        const newWord = e.detail.newWord;
        const pages = this.data.pages;

        // 替换 当前页下的文字 点击下标下的 文字
        pages[curShowPage].textSrc[curWordChangeInfo.index] = newWord;
        this.setData({
            pages: pages
        });
        this.hideWordChange();
        // // console.log(pages);

        // 保存到模板里面
        this.saveTplInfo();


    },
    // 选择页面完成
    choosePage(e) {

        this.addPage(e.detail);
        this.hidePageAdd();
        // 添加的新页也可以删除
        this.pageDelHandle();

        // 保存到模板里面
        this.saveTplInfo();
    },
    resetPageName(pages) {
        const that = this;
        pages.forEach(function (v, k) {
            // // console.log(v, k);
            v.zh = that.pageName(k, v);
        });
        // // console.log(pages);
        this.setData({
            pages: pages
        });
    },
    // 设置页面名称
    pageName(index, item) {
        // // console.log("pageName", pagesLength, index);
        const pagesLength = this.data.pages.length;
        const pageName = "一二三四五六七八九十";
        if (index === 0) {
            return "封面";
        }
        // // console.log(pagesLength, index);
        if (item.type === "toGuests") {
            return "致宾客页";
        }

        return "页面" + pageName.split("")[index - 1];
    },
    send() {
        this.goPage("invitationSend");
    },
    preview() {

        // 保存到模板里面
        this.saveTplInfo(() => {
            this.goPage("tplPreview");
        });

    },
    pageDelHandle() {
        const pages = this.data.pages;
        pages.forEach(function (v, k) {
            v.canRemove = 1;
        });
        // // console.log(pages);

        pages[0].canRemove = 0;
        pages[pages.length - 1].canRemove = 0;
        this.setData({
            pages: pages
        });
    },
    // 显示 添加新页
    showPageAdd() {
        const pages = this.data.pages;

        if (pages.length === this.data.maxPageSize) {
            util.toast("最多可以有" + this.data.maxPageSize + "个页面");
            return;
        }
        if (util.isDev()) {
            if (this.data.mock.isAddPage) {


                this.addPage("tool1");

                // movePage
                // // console.log(this.data.pages);
                return;
            }
        }

        this.hideMap();

        this.setData({
            isShowPageAdd: true
        });
        this.setData({
            isShowPageAddAnimate: true,
        });

        this.selectComponent("#pageAdd").show();


    },
    addPage(id) {
        const pages = this.data.pages;
        let needAddPage = {};
        util.extend(true, needAddPage, tplConfig.pagesArrOb[id]);
        // needAddPage.imgSrc = "https://dummyimage.com/200x300&text=" +
        // encodeURI("random" + Math.floor(Math.random() * 1000));

        pages.splice(pages.length - 1, 0, needAddPage);

        this.resetPageName(pages);
        this.setData({
            pages: pages
        });


        // // console.log(this.data.pages.length - 1);
        // 移动至新添加的页面
        this.selectComponent("#tpl1").movePage(this.data.pages.length - 2);


    },
    // 隐藏 添加新页
    hidePageAdd() {

        this.setData({
            isShowPageAdd: false
        });

        this.showMap();


    },
    // 显示 排序
    showPageSort() {
        this.setData({
            isShowPageSort: true
        });
        this.selectComponent("#pageSort").init();
        this.setData({
            isShowPageSortAnimate: true,
        });


    },
    // 隐藏 排序
    hidePageSort() {
        this.setData({
            isShowPageSort: false
        });


    },
    // 显示 页面设置
    showPageSet() {
        this.hideMap();


        this.setData({
            isShowPageSet: true
        });
        this.setData({
            isShowPageSetAnimate: false,
        });
        setTimeout(() => {
            this.setData({
                isShowPageSetAnimate: true,
            });
        }, 30);

    },
    // 隐藏 页面设置
    hidePageSet() {
        this.setData({
            isShowPageSet: false
        });


        this.selectComponent("#tpl1").changMusic();

        this.showMap();

    },
    // 显示 编辑页面
    showInvitationInfo() {
        this.hideMap();
        // 保存到模板里面
        this.saveTplInfo();

        this.setData({
            isShowInvitationInfo: true,
        });

        this.setData({
            isShowInvitationInfoAnimate: true,
        });

    },
    // 隐藏 编辑页面
    hideInvitationInfo() {

        this.setData({
            isShowInvitationInfo: false
        });

        this.showMap();

    },
// 显示 音乐选择
    showMusicChoose() {
        // 显示音乐选择 ，停止播放音乐
        this.selectComponent("#tpl1").playStop();

        this.setData({
            isShowMusicChoose: true,
        });
        this.setData({
            isShowMusicChooseAnimate: true,
        });

    },
// 隐藏 音乐选择
    hideMusicChoose() {
        this.setData({
            isShowMusicChoose: false
        });

    },
// 显示 图片选择
    showImgCut(e) {


        this.hideMap();
        const index = util.data(e, "index");

        // console.log(e);
        // console.log(index);
        // console.log(this.data.editEleImage);
        if (util.isNotUndefined(index)) {
            const curCutImageInfo = this.data.editEleImage[index];
            this.setData({
                curShowPage: this.data.curShowPage,
                curCutImageInfo: curCutImageInfo,
                isShowImgCut: true
            });
        } else {
            this.setData({
                curShowPage: 1,
                curCutImageInfo: {
                    width: "300px",
                    height: "300px",

                    type: "image",
                    index: 0,
                    top: "50vh",
                    left: "375rpx"
                },
                isShowImgCut: true
            });
        }


        this.selectComponent("#imgCut") && this.selectComponent("#imgCut").init();
        this.setData({
            isShowImgCutAnimate: true,
        });


    },
    // 隐藏 图片选择
    hideImgCut() {
        this.setData({
            isShowImgCut: false
        });
        this.showMap();


    },
    // 显示 音乐选择
    showWordChange(e) {

        const index = util.data(e, "index");

        const curWordChangeInfo = this.data.editEleText[index];
        this.setData({
            curShowPage: this.data.curShowPage,
            curWordChangeInfo: curWordChangeInfo,
            isShowWordChange: true
        });


        this.setData({
            isShowWordChangeAnimate: true,
        });


    },
    // 隐藏 音乐选择
    hideWordChange() {
        this.setData({
            isShowWordChange: false
        });

    },
    // 在地图页操作的时候。需要隐藏地图
    // 隐藏 地图
    hideMap() {
        setTimeout(() => {
            this.selectComponent("#tpl1") && this.selectComponent("#tpl1").hideMap();
        }, 10)
    },
    // 显示 地图
    showMap() {
        setTimeout(() => {
            this.selectComponent("#tpl1") && this.selectComponent("#tpl1").showMap();
        }, 10)
    },
    onHide() {
        this.selectComponent("#tpl1") && this.selectComponent("#tpl1").playStop();
    },
    onShow() {
        // 显示要播放音乐
        this.selectComponent("#tpl1") && this.selectComponent("#tpl1").playStart();
    },
    catchScroll() {


    },
    onUnload() {
        this.selectComponent("#tpl1") &&  this.selectComponent("#tpl1").playStop();
    },

    goPage: util.goPage

});
