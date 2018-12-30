const pageName = "2";
const app = getApp();
const util = require('../../../utils/util.js');
const tplConfig = require('../../../utils/tplConfig.js');
// 写评论
const api = require('../../../utils/api.js');
/*
*  self.triggerEvent('writeover');
* */
Component({
    behaviors: [],
    properties: {
        page: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        imgPath: getApp().globalData.imgPre,
        isLoading: false,
    },
    ready() {
    },
    methods: {
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
                width: 635,
                height: 875,
                top: 60,
                left: 57,
            }, editInfo));

            // editInfo.image.push({
            //
            //     width: util.rpx2px(225 * 2),
            //     height: util.rpx2px(362 * 2),
            //     type: "image",
            //     index: editInfo.image.length,
            //     bottom: "25vh",
            //     right: "25vw"
            // });

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            // console.log(editInfo);
            return editInfo;
        }
    }

});