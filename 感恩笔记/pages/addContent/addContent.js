Page({
  data:{},
  onLoad(e){
    this.setData({
      id:Date.now()
    })
  },
  change(e){
    let val = e.detail.value;
    this.setData({
      content:val
    })
  },
  cancel(){
    wx.navigateBack();
  },
  sure(){
    var re = /^\s*$/g;
    if (!this.data.content || re.test(this.data.content)){
      return;
    }
    this.setData({
      time:Date.now()
    })
    setValue(this);
    wx.navigateBack();
  }
})


function setValue(page){
  var arr = wx.getStorageSync('txt')||[];
  arr.push(page.data)
  wx.setStorageSync('txt', arr)
}