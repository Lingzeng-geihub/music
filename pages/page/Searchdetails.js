// pages/page/Searchdetails.js
import {search,songdetail} from '../../utils/NetworkRequests/getmassage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    songlist:[]
  },
  songclick:function name(a) {
    songdetail(a.target.id).then(res =>{
      console.log(res.songs);
      let item =res.songs[0]
      wx.navigateTo({
        url: '../../components/song/song',
        success:function name(res) {
          res.eventChannel.emit("songlistdata",item)
        }
      })
    })
  
  },

  onClickLeft:function name(params) {
    console.log(1);
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();//取到事件对象
    eventChannel.on("searchkeyworld",value =>{
     this.setData({
       value:value
     })
      console.log(this);
      search(value).then(res=>{
        this.setData({
          songlist:res.result
        })
        console.log(res.result);
      })
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})