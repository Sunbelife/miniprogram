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
        animatedStep0: false,
        animatedStep1: false,
    },
    ready() {

    },
    methods: {
        showInvitationInfo() {
            this.triggerEvent('showInvitationInfo');
        },
        showBanquetInfo(e) {
            console.log("showBanquetInfo trigger");
            this.triggerEvent('showBanquetInfo');

        },
        hideBanquetInfo3() {
            setTimeout(()=>{
                this.setData({
                    isShowMap: true,
                });
                console.log(this.data.isShowMap);
            },10)

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

            editInfo.image.push({
                width: util.rpx2px(225),
                height: util.rpx2px(362),

                type: "image",
                index: editInfo.image.length,
                top: "5vh",
                left: "50vw"
            });

            // editInfo.image.push({
            //     type: "image",
            //     index: editInfo.image.length,
            //     bottom: "25vh",
            //     right: "25vw"
            // });

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});