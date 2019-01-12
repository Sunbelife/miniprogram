const tplName = "4";
const pageName = "1";

const app = getApp();
const util = require('../../../utils/util.js');
const tplConfig = require('../../../utils/tplConfig.js');

Component({
    behaviors: [],
    properties: {
        invitationInfo: null, // 简化的定义方式
        page: null, // 简化的定义方式
    },
    data: {
        tplName: tplName,
        pageName: pageName,
        imgPath: getApp().globalData.imgPre,
        animatedStep: new Array(1).fill(false)
    },
    ready() {

        this.setData({
            "invitationInfo.dateFormat": util.dateChina(this.properties.invitationInfo),
        });
        // 后缀可能不一样，拷贝吧
        this.setData({
            // 需要写的页面
            img_write_1: `${this.data.imgPath}/tpl_${this.data.tplName}/p${this.data.pageName}_1.png`,
        });

        console.log(this.data.img_write_1);
    },
    methods: {

        showInvitationInfo() {
            this.triggerEvent('showInvitationInfo');
        },
        show() {
            util.setTimeOutFlagNew(this);
        },
        hide() {
            util.setTimeOutFlagHideNew(this);
        },
        editInfo() {

            const editInfo = {
                image: [],
                text: []
            };

            console.log(app.systemInfo);
            editInfo.image.push(util.genImg({
                width: app.systemInfo.windowWidth * 2,
                height: app.systemInfo.windowHeight * 2,
                top: 0,
                left: 0,
            }, editInfo));

            editInfo.image[0].top = '250px';

            // editInfo.text.push({
            //     type: "text",
            //     text: this.data.page.textSrc[0],
            //     index: editInfo.text.length,
            //     bottom: "350rpx",
            //     left: "175rpx"
            // });

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});