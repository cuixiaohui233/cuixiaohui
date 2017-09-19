const timeFn = require('../../utils/util.js');
Page({
  data:{
    lists: [
      {
        content: "今天fasfasf天气很好！",
        time: Date.now(),
        id: 1
      },
      {
        content: "今天合适的话发货后是否好！",
        time: Date.now(),
        id: 2
      }
    ]
  },
  onLoad() {
    initData(this)
  },
  onShow(){
    initData(this)
  },
  addInfo(){
    wx.navigateTo({
      url: '../addContent/addContent'
    })
  }
})
function initData(page) {
  var arr = wx.getStorageSync('txt');
  if (arr.length) {
    arr.forEach((e, i) => {
      var t = new Date(Number(e.time));
      e.time = timeFn.formatTime(t);
    })
    page.setData({
      lists: arr
    })
  }
}