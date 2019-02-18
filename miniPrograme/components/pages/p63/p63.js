const tplName = "9";
const pageName = "7";

const util = require('../../../utils/util.js');

Component({
    behaviors: [],
    properties: {
        isShowMap: null,
        invitationInfo: null, // 简化的定义方式
        showBanquetInfoBtn: null, // 简化的定义方式
        type: null, // 简化的定义方式
        page: null, // 简化的定义方式
    },
    data: {
        tplName: tplName,
        pageName: pageName,
        imgPath: getApp().globalData.imgPre,
        animatedStep: new Array(1).fill(false)
    },
    ready() {

        console.log(this.properties.page);

        this.setData({
            "invitationInfo.dateFormat": util.dateChina(this.properties.invitationInfo),
        });
        // 后缀可能不一样，拷贝吧
        this.setData({
            img_bg: `${this.data.imgPath}/tpl_${this.data.tplName}/bg_p7.jpg`,
            // 需要写的页面
            img_write_1: `${this.data.imgPath}/tpl_${this.data.tplName}/p${this.data.pageName}_1.png`,
            img_write_2: `${this.data.imgPath}/tpl_${this.data.tplName}/p${this.data.pageName}_2.png`,
        });

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
            this.triggerEvent('showInvitationInfo');
        },
        showBanquetInfo(e) {
            this.triggerEvent('showBanquetInfo');
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
                width: 651,
                height: 920,
                top: 158,
                right: 49,
            }, editInfo));


            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            return editInfo;
        }
    }

});