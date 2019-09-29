// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:"",//存用户输入评论
    score:0,//评分
    movieid:25779217,//电影id
    detail:{},//js对象保存当前电影信息-
    images:[]
  },
// 图片上传 // 功能：选中图片并且实现预览图片
  uploadFile:function(){
    // 在data中声明属性images保存预览图片

    // 选中最多9张图片
    // 图片类型 原图 压缩图
    // 图片来源 相册 相机
    // 选中成功
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {//选中成功
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        // 获取选中图片路径
        var list =res.tempFilePaths;//临时路径
        this.setData({
          // 保存data中images属性
          images:list
        });
      },
    })
    // 在模板中显示选中图片列表
      },
  /*用户输入内容触发事件*/
  onContentChange: function (event){
    // event.detail 为当前输入的值
    this.setData({
      // 获取当前用户评论
      value1:event.detail
    })
  },
  /*分数*/
  onChangeScore:function(event){
    //获取当前用户评论分数
    this.setData({
      score:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取参数
  onLoad: function (options) {
    // 获取id并保存
    this.setData({
      movieid:options.id
    })
    //组建创建成功后调用云函数获得详情
    this.loadMore()
  },
  // 调用云函数获取指定id的电影详情
  loadMore:function(){
    // 获取用户选中电影id
    var id=this.data.movieid
    // 显示数据加载提示框
    wx.showLoading({
      title: '正在加载中...',
    })
    // 调用云函数
    wx.cloud.callFunction({
      name:"findDetail",//云函数
      data:{id:id}//参数
    })
    // 获取返回数据
    .then(res=>{console.log(res)
// 对数据进行转换
      console.log(`res.result${res.result}`)
    var obj=JSON.parse(res.result);
      // 保存
      console.log(`obj${obj}`)
      this.setData({
        // 到js数组对象
        detail: obj
      })
      console.log('数据'+this.data. detail)
      // 隐藏加载提示框
      wx.hideLoading();
    })
    .catch(err=>{console.log(err)})
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})