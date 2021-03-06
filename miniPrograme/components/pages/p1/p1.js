const tplName = "1";
const pageName = "1";

const app = getApp();
const util = require('../../../utils/util.js');
const tplConfig = require('../../../utils/tplConfig.js');

Component({
    behaviors: [],
    properties: {
        invitationInfo: null, // 简化的定义方式
        page: null, // 简化的定义方式
        type: null, // 简化的定义方式
    },
    data: {
        tplName: tplName,
        pageName: pageName,
        imgPath: getApp().globalData.imgPre,
        animatedStep: new Array(1).fill(false)
    },
    ready() {
        console.log(this.properties.type);

        this.setData({
            "invitationInfo.dateFormat": util.dateChina(this.properties.invitationInfo),
        });
        // 后缀可能不一样，拷贝吧
        this.setData({
            img_bg: `${this.data.imgPath}/tpl_${this.data.tplName}/bg.jpg`,
            // 需要写的页面
            img_write_1: `${this.data.imgPath}/tpl_${this.data.tplName}/p${this.data.pageName}_1.png`,
        });

        console.log(this.data.img_write_1);
    },
    methods: {
        openLocation() {
            console.log("openLocation");
            console.log(this.properties.type === 'invitationEdit');
            if(this.properties.type === 'invitationEdit'){
                this.showInvitationInfo();
            }else{
                util.openLocation(this.properties.invitationInfo);
            }
        },
        showInvitationInfo() {
            console.log("showInvitationInfo");
            this.triggerEvent('showInvitationInfo');
        },
        show() {
            util.setTimeOutFlagNew(this);
        },
        hide() {
            util.setTimeOutFlagHideNew(this);
        },
        imageLoad() {
            console.log("image load ");
            this.triggerEvent('imageLoad');
        },
        editInfo() {

            const editInfo = {
                image: [],
                text: []
            };

            editInfo.image.push(util.genImg({
                width: 569,
                height: 884,
                top: 56,
                left: 67,
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