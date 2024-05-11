// components/songlist/songlist.js
import { geiranking } from "../../utils/NetworkRequests/getmassage"
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from "../../utils/store/store";
const app = getApp()
let tracks = []
Component({
  /**
   * 页面的初始数据
   */
  data: {
    active: 3,
    playlist:{},
    track: [],
    id:[3779629,2884035,19723756,3778678],
    width:app.globalData.screenWidth
  },
  methods:{
    getmassage:function name(params) {
      let id =this.data.id[this.data.active]
        geiranking(id).then((res)=>{
            this.setData({
              playlist: res.playlist,
              track:res.playlist.tracks.slice(0,8)
            }) 
           store.setstoreplaylist(this.data.track)
     
         })
     
      } ,
    onChange: function(res){
    this.data.active=res.detail.index
    this.getmassage(this.id)
    },
    song:function (res) {
       console.log(store.storeplaylist);
      let item =res.currentTarget.dataset.item
      wx.navigateTo({
        url: '../../components/song/song',
        success:function (res) {
          res.eventChannel.emit("songlistdata",item)
        },
          fail:function (data) {
            console.log("失败",data);
        }
      })
    }
  },
  attached:function name(params) {
    this.getmassage()
      // 绑定 MobX store
      this.storeBindings = createStoreBindings(this, {
        store,
        fields: ['storeplaylist'],
        actions: ['setstoreplaylist'],
      })
   }
})
