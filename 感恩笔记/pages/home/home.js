const time = require('./time.js');
const timeFn = require('../../utils/util.js');
console.log(time)
Page({
  data: {
    img:"img/images/home_02.gif",
    node:"img/images/node_05.gif",
    home_time: time.formatTime[0] + '月' + time.formatTime[1],
    imgUrls:[
      'img/images/swiper1_03.gif',
      'img/images/swiper2_03.gif',
      'img/images/swiper3_03.gif'
    ],
    lists:[
      {
        content:"今天天气很好！",
        time:Date.now(),
        id:1
      }, 
      {
        content: "fdgdsg",
        time: Date.now(),
        id: 1
      }
    ]
  },
  onLoad(){
    initData(this)
  },
  //添加新笔记
  add_list(){
  // console.log(111)
    wx.navigateTo({
      url: '../add/add',
    })
  },
  //改变已有的笔记
  changeInfo(e){
    var id = e.currentTarget.dataset.id;
    var info = e.currentTarget.dataset.info;
    console.log(info);
    wx.navigateTo({
      url: '../logs/logs?id='+id+'&info='+info
    })
  },
  //轮播图点击
  swiper(){
    console.log(2222)
  }
})
function initData(page){
  var arr = wx.getStorageSync('txt');
  if(arr.length){
    arr.forEach((e,i)=>{
      var t = new Date(Number(e.time));
      e.time = timeFn.formatTime(t);
    })
    page.setData({
      lists:arr
    })
  }
}