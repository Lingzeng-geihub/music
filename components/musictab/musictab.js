// components/musictab/musictab.js
import { Lrequest } from '../../utils/NetworkRequests/netrequest'
import {getplaylist} from '../../utils/NetworkRequests/getmassage'
Component({
  options:{
    styleIsolation: 'isolated'
  },
  /**
   * 页面的初始数据
   */
  properties:{
    request:{
      type:String,
      value:''
    },
    arg:{
      type:String,
      value:10
    }
  },
  options:{
    styleIsolation: 'isolated' 
  },
  data: {
    playlist:[1],
  },
  attached: function() {
    Lrequest.prototype.get({
      url:this.properties.request,
      data:{
        type:this.properties.arg
      }
    }).then(res =>{
      this.setData({playlist:res.playlists})
    })
    // 在组件实例进入页面节点树时执行
  },
methods:{
  // scroll (e) {
    
  //   console.log(e);
  // },
},
  
  pageLifetimes:{
    show: function () {
     
   
      
     },
  }
  
})