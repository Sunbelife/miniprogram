const tplName = "2";
const pageName = "1";

const app = getApp();
const util = require('../../../utils/util.js');
const tplConfig = require('../../../utils/tplConfig.js');

Component({
    properties: {
        invitationInfo: null,
        page: null,
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
            img_bg: `${this.data.imgPath}/tpl_${this.data.tplName}/bg_p${this.data.pageName}.jpg`,
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
                width: 593,
                height: 769,
                top: 50,
                left: 67,
            }, editInfo));


            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});