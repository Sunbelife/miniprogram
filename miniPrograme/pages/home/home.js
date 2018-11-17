
const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    activeType: 1,
    type: [
      {
        name: "单图",
        number: 1
      },
      {
        name: "双图",
        number: 2
      },
      {
        name: "多图",
        number: 3
      },
      {
        name: "纯文字",
        number: 4
      }
    ],
    tpl: new Array(10).fill(0),
    // 需要顶部固定吗？
    scrollTopPage: 0,
    isNeedFixed: false,
    // px
    tabOffsetTop: 90
  },

  onLoad: function () {

  },
  chooseType: function (e) {
    const type = util.data(e, "type");
    this.setData({
      activeType: type
    });
  },
  loadMore(){

  },
  // 页面滚动回调
  pageScroll(e) {
    const px = util.rpx2px(this.data.tabOffsetTop);
    const scrollTop = e.detail.scrollTop;
    let isNeedFixed = false;

    if (scrollTop >= px) {
      isNeedFixed = true;
    }
    this.setData({
      isNeedFixed: isNeedFixed,
    });

    console.log(px);
    //
    console.log(e);
  },
});
