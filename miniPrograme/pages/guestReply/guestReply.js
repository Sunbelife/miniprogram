
const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    activeType: 1,
    type: [
      {
        name: "宾客祝福(0)",
        number: 1
      },
      {
        name: "赴宴(0)",
        number: 2
      }
    ]
  },

  onLoad: function () {

  },
  chooseType: function (e) {
    const type = util.data(e, "type");
    this.setData({
      activeType: type
    });
  }
});
