const tplName = "3";
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

            editInfo.image.push(util.genImg({
                width: 615,
                height: 765,
                top: 137,
                left: 65,
            }, editInfo));

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