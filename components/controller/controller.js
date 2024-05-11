// components/controller/controller.js
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import {songdetail} from '../../utils/NetworkRequests/getmassage'
import { store } from "../../utils/store/store";
Component({

  /**
   * 页面的初始数据
   */
  data: {
   name:store.storeplaylist.name,
   id:store.storeplaylist.id,
   show:true,
   detail:{
     name:"音乐",
     al:{
      picUrl:"https://ts1.cn.mm.bing.net/th/id/R-C.ee0749fc519ccc19a9848730603d6bdf?rik=3vASoE2ipOM7Tg&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2020%2f03-26%2f75810%2fwater_75810_698_698_.png&ehk=SAh2j%2bTynb9AdGGHGtM%2fMyW4j21Ke6HLFAHpvpL8fww%3d&risl=&pid=ImgRaw&r=0"
     }
   },
   playshow:false,
   listshow:false

  },
  methods:{
    setlistshow:function name(params) {
      console.log(1);
      this.setData({
        listshow:true
      })
    },
    songlistclick:function name(params) {
      let id = params.detail.currentTarget.id
      console.log(params.detail.currentTarget.id);
      this.setData({
        id:params.target.id,
        listshow:false
      })
      this.songurl(id)
      this.getSongIndex()
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  lifetimes:{
    attached(options) {
      this.storeBindings = createStoreBindings(this, {
        store,
        fields: ['storeplaylist'],
        actions: ['setstoreplaylist'],
      })
    },
  },
  pageLifetimes:{
    show(){
      songdetail(store.id).then(res =>{
       this.setData({
        detail:res.songs[0]
       })
        console.log(this.data.detail);
      })
    }
  }
  


})