const app = getApp();
const util = require('../../../utils/util.js');
// 写评论
const api = require('../../../utils/api.js');
const tplConfig = require('../../../utils/tplConfig.js');
/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        isShowMap: null,
        invitationInfo: null, // 简化的定义方式
        showBanquetInfoBtn: null, // 简化的定义方式
        page: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        imgPath: getApp().globalData.imgPre,
        animatedStep0: false,
        animatedStep1: false,
    },
    ready() {

       let date =  util.toDate(
            `${this.properties.invitationInfo.date} ${this.properties.invitationInfo.time}`,
            'yyyy-MM-dd hh:mm')
        this.setData({
           "invitationInfo.dateFormat": util.dateFormat(date,'yyyy年MM月dd日 hh时mm分'),
        });

    },
    methods: {
        showInvitationInfo() {
            this.triggerEvent('showInvitationInfo');
        },
        showBanquetInfo(e) {
            // console.log("showBanquetInfo trigger");
            this.triggerEvent('showBanquetInfo');

        },
        hideBanquetInfo3() {
            setTimeout(() => {
                this.setData({
                    isShowMap: true,
                });
                // console.log(this.data.isShowMap);
            }, 10)

        },
        show() {
            util.setTimeOutFlag(this, 2, 0);
        },
        hide() {
            util.setTimeOutFlagHide(this, 2);
        },
        editInfo() {

            const editInfo = {
                image: [],
                text: []
            };

            editInfo.image.push(util.genImg({
                width: 612,
                height: 907,
                top: 234,
                right: 69,
            }, editInfo));


            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            // console.log(editInfo);
            return editInfo;
        }
    }

});