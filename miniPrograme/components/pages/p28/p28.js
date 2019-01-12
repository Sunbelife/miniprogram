const tplName = "4";
const pageName = "7";
const app = getApp();

const util = require('../../../utils/util.js');

Component({
    behaviors: [],
    properties: {
        isShowMap: null,
        type: null, // 简化的定义方式
        invitationInfo: null, // 简化的定义方式
        showBanquetInfoBtn: null, // 简化的定义方式
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
            // 需要写的页面
            img_write_1: `${this.data.imgPath}/tpl_${this.data.tplName}/p${this.data.pageName}_1.png`,
            img_write_2: `${this.data.imgPath}/tpl_${this.data.tplName}/p${this.data.pageName}_2.png`,
        });

    },
    methods: {
        showInvitationInfo() {
            this.triggerEvent('showInvitationInfo');
        },
        showBanquetInfo(e) {
            this.triggerEvent('showBanquetInfo');
        },
        openLocation() {
            console.log("openLocation");
            console.log(this.properties.type === 'invitationEdit');
            if(this.properties.type === 'invitationEdit'){
                this.showInvitationInfo();
            }else{
                util.openLocation(this.properties.invitationInfo);
            }
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
                width: app.systemInfo.windowWidth * 2,
                height: app.systemInfo.windowHeight * 2,
                top: 0,
                right: 0,
            }, editInfo));
            editInfo.image[0].top = '150px';

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            return editInfo;
        }
    }

});