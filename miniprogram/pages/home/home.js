// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pno:0,//页数(码)
    list:[]//存放电影列表
  },
  // 获取当前电影Id
  jumpComment:function(event){
    //target事件委托
    var id=event.target.dataset.id;
    // 跳转组件
    wx.navigateTo({
      url: '/pages/comment/comment?id='+id
    });
  },
  //此函数处理页面电影的加载
  loadMore:function(){
    // 下一页 （数目+1）
    var pno =this.data.pno+1;
    //修改页数(将值赋到页码)
    this.setData({
      pno:pno
    });
    //偏移量
    var offset=(pno-1)*4
    // 调用云函数完成数据加载
    wx.cloud.callFunction({
      name:"movielist05",
      // 参数放在data里面
      data:{
        start:offset,//页数
        count:4//行数
      }
      }).then((res)=>{
        // 得到返回的字符串
        var rows = res.result;
        // 把字符串解析成数组对象
        rows=JSON.parse(rows)
// 页数并接
        var lists= this.data.list.concat(rows.subjects);
// 把数组数据赋值到数组list里
        this.setData({
          list:lists
        })
      })
      .catch((err)=>{
        console.log(err)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 调用函数
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
// 加载下一页的数据
    // 调用函数
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})