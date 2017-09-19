Page({
  data:{
    defaultSize:"default",
    content:'ssss'
  },
  onLoad(e){
    var id = e.id;
    var info = e.info;
    if(id){
      this.setData({
        id: Date.now(),
        content: info
      })
    }
  }
})
function getData(id){
  var local = wx.getStorageSync('txt');
  if(local.length){
    local.forEach((e,i)=>{
      if(e.id === id){
        page.setDate({
          id:e.id,
          content:e.content
        })
      }
    })
  }
}