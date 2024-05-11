// components/song/song.js
import {songdetail,lyc} from '../../utils/NetworkRequests/getmassage'
import {msToMinutes,parseLyric} from '../../utils/util';
import { throttle, debounce } from 'throttle-debounce';
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from "../../utils/store/store";
import { audioCtx } from "../../utils/store/audioCtx";

let app =getApp()
let arry = []
console.log(audioCtx);
// var audioCtx=wx.createInnerAudioContext({
//   useWebAudioImplement: true
// })

Page({
  /**
   * 页面的初始数据
   */
  data: {
    songs: arry,
    songtime:"00:00",
    id:0,
    totaltime:0,
    play:false,
    pause:true,
    slidertime:0,
    max: 0,
    single:true,
    Shuffle:false,
    list:false,
    ishowlic:false,
    lic:[],
    licindex:0,
    screenHeight:app.globalData.screenHeight,
    screenWidth:app.globalData.screenWidth,
    scrlllist:"",
    playlist:[],
    songindex:0,
    show:false,
   
  },
  onClickLeft:function name(params) {
   wx.navigateBack()
  },
  sliderchange:function name(event) {
  let time = event.detail.value
    this.setData({
      slidertime:time
    })
    audioCtx.seek(this.data.slidertime)
  },
  cyclecliack:function name(res) {
    if (res.target.dataset.pattern == "single") {
      this.setData({
        single:false,
        Shuffle:true,
        list:false
      })
    } else if(res.target.dataset.pattern == "Shuffle") {
      this.setData({
        single:false,
        Shuffle:false,
        list:true
      })
    }else if(res.target.dataset.pattern == "list"){
      this.setData({
        single:true,
        Shuffle:false,
        list:false
      })
    }
  },
  play:function adiio(params) {
    if (audioCtx.paused) {
      audioCtx.play()
    }
    
  this.setData({
    play:false,
    pause:true
  })
  },
  pause:function name(params) {
    audioCtx.pause()
    this.setData({
      pause:false,
      play:true
    })
  },
  isshowlic:function name(params) {
    this.setData({
      ishowlic:!this.data.ishowlic
    })
  },
  songurl:function name(id) {
    audioCtx.src =`https://music.163.com/song/media/outer/url?id=${id}.mp3`
  },
  onClose:function name(params) {
    this.setData({
      show:false
    })
  },
  onshow:function name(params) {
    this.setData({
      show:true
    })
  },
  songlistclick:function name(params) {
    let id = params.detail.currentTarget.id
    console.log(params.detail.currentTarget.id);
    this.setData({
      id:params.target.id,
      show:false
    })
    this.songurl(id)
    this.lyc(id)
    this.getSongIndex()
  },
  //上一首
  last:function name(res) {
     let lastid=this.data.playlist[this.data.songindex-1].id
     this.setData({
       id:lastid
     })
     this.lyc(lastid)
     this.getSongIndex()
     this.songurl(lastid)
  },
  next:function name(res) {
    console.log(this.data.playlist);
    let nextid=this.data.playlist[this.data.songindex+1].id
    this.setData({
      id:nextid
    })
    this.lyc(nextid)
    this.getSongIndex()
    this.songurl(nextid)
 },
  //歌曲时间格式化
  time:throttle(1000,function name(a) {
    let time = audioCtx.currentTime /audioCtx.duration
    a.setData({
      songtime:msToMinutes(audioCtx.currentTime *1000),
      slidertime:audioCtx.currentTime
    })
  }),
  //歌词匹配
  lic: function lic(a) {
    let index = -1
    for (let i = 0; i < a.data.lic.length; i++) {
      const info = a.data.lic[i];
      if (info.time > audioCtx.currentTime*1000) {
        index = i-1
        break
      }
    }
    a.setData({
      scrlllist:index*35,
      licindex:index
    })
    return index
  },
  //获取歌词和歌曲详情
  lyc:function name(id) {
    lyc(id).then(res =>{
      let lrc = parseLyric(res.lrc.lyric)
      this.setData({
        lic:lrc
      })
    })
    songdetail(id).then(res =>{
      this.setData({
        songs:res.songs
      })
    })
  },
   //获取单曲歌曲所在列表位置
  getSongIndex:function name() {
   let songindex= store.findindex(this.data.id)
      this.setData({
        songindex:songindex
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        // 绑定 MobX store
        this.storeBindings = createStoreBindings(this, {
          store,
          fields: ['storeplaylist','index'],
          actions: ['setstoreplaylist','findindex',"setidvalue"],
        })
        this.setData({
          playlist:store.storeplaylist
        }) 
    const eventChannel = this.getOpenerEventChannel();//取到事件对象
    eventChannel.on("songlistdata",item=>{
      this.setData({
        id:item.id,
        totaltime: msToMinutes(item.dt),
        max:item.dt/1000
      })
      
     this.getSongIndex()
      // audioCtx.src =`https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
      audioCtx.autoplay=true
      this.songurl(this.data.id)
      //获取歌词
       this.lyc(this.data.id)
    //获取歌曲详情
    
    })
    
    this.time(this)
  //  监听歌曲时间更新
    audioCtx.onTimeUpdate((res)=>{
    this.time(this)
    this.lic(this)
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    audioCtx.onError((res)=>{
      console.log(res);
    })

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
    store.setidvalue(this.data.id)
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