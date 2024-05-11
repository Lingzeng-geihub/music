// components/searchlist/searchlist.js
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from "../../utils/store/store";
Component({
  properties:{
    show:Boolean
  },
  data:{
    playlist:[],
    songindex:0
  },
  methods:{
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
      this.triggerEvent('songlistclick',params)
    }
  },
  attached:function name(params) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['storeplaylist','indexq',],
      actions: ['setstoreplaylist',"findindex"],
    })
  
    this.setData({
      playlist:store.storeplaylist,
    })
   
  }
})